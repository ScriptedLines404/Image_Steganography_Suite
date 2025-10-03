from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import base64
from io import BytesIO
from PIL import Image
import traceback
import sys
import os

print(f"🔍 Current directory: {os.path.dirname(os.path.abspath(__file__))}")
print("📁 Directory contents:")
for file in os.listdir('.'):
    print(f"   - {file}")

# Import your steganography modules directly (they're in root)
try:
    from aes_steganography import AESSteganography
    from lsb_steganography import LSBSteganography
    from xor_steganography import XORSteganography
    print("✅ Steganography modules imported successfully")
except ImportError as e:
    print(f"❌ Error importing steganography modules: {e}")
    traceback.print_exc()
    # Create fallback classes to prevent crashes
    class AESSteganography:
        def hide_data(self, *args, **kwargs): raise Exception("AES module not loaded")
        def extract_data(self, *args, **kwargs): raise Exception("AES module not loaded")
    class LSBSteganography:
        def hide_data(self, *args, **kwargs): raise Exception("LSB module not loaded")
        def extract_data(self, *args, **kwargs): raise Exception("LSB module not loaded")
    class XORSteganography:
        def hide_data(self, *args, **kwargs): raise Exception("XOR module not loaded")
        def extract_data(self, *args, **kwargs): raise Exception("XOR module not loaded")

app = Flask(__name__)

# Configure CORS properly for all origins (simpler for deployment)
CORS(app)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

def base64_to_image(base64_string):
    """Convert base64 string to numpy image array using Pillow only"""
    try:
        # Handle both data URL and plain base64
        if 'base64,' in base64_string:
            base64_string = base64_string.split('base64,')[1]
        
        image_data = base64.b64decode(base64_string)
        image = Image.open(BytesIO(image_data))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        # Convert to numpy array
        return np.array(image)
    except Exception as e:
        print(f"Error converting base64 to image: {e}")
        raise

def image_to_base64(image_array):
    """Convert numpy image array to base64 string using Pillow only"""
    try:
        # Convert numpy array to PIL Image
        image = Image.fromarray(image_array.astype('uint8'))
        
        # Convert to bytes
        buffered = BytesIO()
        image.save(buffered, format="PNG", optimize=True)
        
        return base64.b64encode(buffered.getvalue()).decode('utf-8')
    except Exception as e:
        print(f"Error converting image to base64: {e}")
        raise

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy", 
        "message": "Steganography API is running",
        "version": "1.0.0",
        "python_version": sys.version
    })

@app.route('/api/hide', methods=['POST'])
def hide_data():
    """
    Hide secret data in an image using selected technique
    """
    try:
        print("📨 Received hide request")
        
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        technique = data.get('technique', 'lsb').lower()
        image_base64 = data.get('image')
        secret_text = data.get('secret_text', '')
        encryption_key = data.get('encryption_key', '')
        
        print(f"🔧 Technique: {technique}, Text length: {len(secret_text)}")
        
        # Validate inputs
        if not image_base64:
            return jsonify({"error": "No image provided"}), 400
        
        if not secret_text:
            return jsonify({"error": "No secret text provided"}), 400
        
        if technique != 'lsb' and not encryption_key:
            return jsonify({"error": "Encryption key required for this technique"}), 400
        
        # Convert base64 to image
        try:
            image_array = base64_to_image(image_base64)
            print(f"🖼️ Image loaded: {image_array.shape}")
        except Exception as e:
            print(f"❌ Error loading image: {e}")
            return jsonify({"error": f"Invalid image data: {str(e)}"}), 400
        
        # Process based on technique
        try:
            if technique == 'lsb':
                stego = LSBSteganography()
                result_image = stego.hide_data(image_array, secret_text)
            
            elif technique == 'xor':
                stego = XORSteganography()
                result_image = stego.hide_data(image_array, secret_text, encryption_key)
            
            elif technique == 'aes':
                stego = AESSteganography()
                result_image = stego.hide_data(image_array, secret_text, encryption_key)
            
            else:
                return jsonify({"error": "Invalid technique specified"}), 400
            
            print("✅ Data hidden successfully")
            
        except Exception as e:
            print(f"❌ Error during steganography: {e}")
            traceback.print_exc()
            return jsonify({"error": f"Steganography failed: {str(e)}"}), 500
        
        # Convert result to base64
        try:
            result_base64 = image_to_base64(result_image)
            print("✅ Image converted to base64")
        except Exception as e:
            print(f"❌ Error converting result image: {e}")
            return jsonify({"error": f"Result conversion failed: {str(e)}"}), 500
        
        return jsonify({
            "success": True,
            "message": "Data hidden successfully",
            "stego_image": result_base64,
            "technique": technique,
            "image_size": f"{result_image.shape[1]}x{result_image.shape[0]}"
        })
        
    except Exception as e:
        print(f"❌ Unexpected error in hide_data: {e}")
        traceback.print_exc()
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

@app.route('/api/extract', methods=['POST'])
def extract_data():
    """
    Extract hidden data from an image
    """
    try:
        print("📨 Received extract request")
        
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        technique = data.get('technique', 'lsb').lower()
        image_base64 = data.get('image')
        encryption_key = data.get('encryption_key', '')
        
        print(f"🔧 Technique: {technique}")
        
        # Validate inputs
        if not image_base64:
            return jsonify({"error": "No image provided"}), 400
        
        if technique != 'lsb' and not encryption_key:
            return jsonify({"error": "Encryption key required for this technique"}), 400
        
        # Convert base64 to image
        try:
            image_array = base64_to_image(image_base64)
            print(f"🖼️ Image loaded: {image_array.shape}")
        except Exception as e:
            print(f"❌ Error loading image: {e}")
            return jsonify({"error": f"Invalid image data: {str(e)}"}), 400
        
        # Extract based on technique
        try:
            if technique == 'lsb':
                stego = LSBSteganography()
                extracted_text = stego.extract_data(image_array)
            
            elif technique == 'xor':
                stego = XORSteganography()
                extracted_text = stego.extract_data(image_array, encryption_key)
            
            elif technique == 'aes':
                stego = AESSteganography()
                extracted_text = stego.extract_data(image_array, encryption_key)
            
            else:
                return jsonify({"error": "Invalid technique specified"}), 400
            
            print(f"✅ Data extracted successfully: {len(extracted_text)} characters")
            
        except Exception as e:
            print(f"❌ Error during extraction: {e}")
            traceback.print_exc()
            return jsonify({"error": f"Extraction failed: {str(e)}"}), 500
        
        return jsonify({
            "success": True,
            "message": "Data extracted successfully",
            "extracted_text": extracted_text,
            "technique": technique,
            "text_length": len(extracted_text)
        })
        
    except Exception as e:
        print(f"❌ Unexpected error in extract_data: {e}")
        traceback.print_exc()
        return jsonify({"error": f"Extraction failed: {str(e)}"}), 500

# Single main block
if __name__ == '__main__':
    print("🚀 Starting Steganography API Server...")
    print(f"🐍 Python version: {sys.version}")
    print("📊 Available endpoints:")
    print("   GET  /api/health")
    print("   POST /api/hide")
    print("   POST /api/extract")
    
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
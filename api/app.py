from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import cv2
import numpy as np
import tempfile
import os
from werkzeug.utils import secure_filename
import base64
from io import BytesIO
from PIL import Image

# Import your steganography modules
from steganography.aes_steganography import AESSteganography
from steganography.lsb_steganography import LSBSteganography
from steganography.xor_steganography import XORSteganography

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['UPLOAD_FOLDER'] = tempfile.gettempdir()
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp', 'tiff'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def image_to_base64(image_array):
    """Convert numpy image array to base64 string"""
    image = Image.fromarray(image_array)
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

def base64_to_image(base64_string):
    """Convert base64 string to numpy image array"""
    image_data = base64.b64decode(base64_string)
    image = Image.open(BytesIO(image_data))
    return np.array(image)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Steganography API is running"})

@app.route('/api/hide', methods=['POST'])
def hide_data():
    """
    Hide secret data in an image using selected technique
    Expected JSON payload:
    {
        "technique": "lsb|xor|aes",
        "image": "base64_encoded_image",
        "secret_text": "message to hide",
        "encryption_key": "key"  # optional for LSB
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        technique = data.get('technique', 'lsb').lower()
        image_base64 = data.get('image')
        secret_text = data.get('secret_text', '')
        encryption_key = data.get('encryption_key', '')
        
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
        except Exception as e:
            return jsonify({"error": f"Invalid image data: {str(e)}"}), 400
        
        # Process based on technique
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
        
        # Convert result to base64
        result_base64 = image_to_base64(result_image)
        
        return jsonify({
            "success": True,
            "message": "Data hidden successfully",
            "stego_image": result_base64,
            "technique": technique
        })
        
    except Exception as e:
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

@app.route('/api/extract', methods=['POST'])
def extract_data():
    """
    Extract hidden data from an image
    Expected JSON payload:
    {
        "technique": "lsb|xor|aes",
        "image": "base64_encoded_image",
        "encryption_key": "key"  # optional for LSB
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        technique = data.get('technique', 'lsb').lower()
        image_base64 = data.get('image')
        encryption_key = data.get('encryption_key', '')
        
        # Validate inputs
        if not image_base64:
            return jsonify({"error": "No image provided"}), 400
        
        if technique != 'lsb' and not encryption_key:
            return jsonify({"error": "Encryption key required for this technique"}), 400
        
        # Convert base64 to image
        try:
            image_array = base64_to_image(image_base64)
        except Exception as e:
            return jsonify({"error": f"Invalid image data: {str(e)}"}), 400
        
        # Extract based on technique
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
        
        return jsonify({
            "success": True,
            "message": "Data extracted successfully",
            "extracted_text": extracted_text,
            "technique": technique
        })
        
    except Exception as e:
        return jsonify({"error": f"Extraction failed: {str(e)}"}), 500

@app.route('/api/capacity', methods=['POST'])
def check_capacity():
    """
    Check maximum data capacity for an image with given technique
    """
    try:
        data = request.get_json()
        image_base64 = data.get('image')
        technique = data.get('technique', 'lsb').lower()
        
        if not image_base64:
            return jsonify({"error": "No image provided"}), 400
        
        image_array = base64_to_image(image_base64)
        height, width, channels = image_array.shape
        
        # Calculate capacity based on technique
        if technique == 'lsb':
            capacity = (height * width * channels) // 8  # 1 bit per channel
        elif technique in ['xor', 'aes']:
            capacity = (height * width * channels) // 8  # Similar capacity
        else:
            return jsonify({"error": "Invalid technique"}), 400
        
        return jsonify({
            "capacity_bytes": capacity,
            "capacity_chars": capacity,  # Approximate character count
            "image_size": f"{width}x{height}",
            "technique": technique
        })
        
    except Exception as e:
        return jsonify({"error": f"Capacity check failed: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
# run_backend.py
import os
import sys

# Add the current directory to Python path
sys.path.append(os.path.dirname(__file__))

# Set environment variable for Flask
os.environ['FLASK_ENV'] = 'development'

from app import app

if __name__ == '__main__':
    print("🚀 Starting Steganography API Server...")
    print("📍 Server will run at: http://localhost:5000")
    print("📚 API Documentation:")
    print("   GET  /api/health - Health check")
    print("   POST /api/hide - Hide data in image")
    print("   POST /api/extract - Extract data from image")
    print("   POST /api/capacity - Check image capacity")
    print("\n⚡ Starting server...")
    
    app.run(debug=True, host='0.0.0.0', port=5000, use_reloader=True)
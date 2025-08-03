# Image Steganography Suite

A collection of secure steganography tools that hide secret messages in images using different encryption methods. This project demonstrates three approaches to embedding encrypted data in images while preserving visual quality.

🔐 **Supported Techniques**:
1. **Basic XOR Steganography** - Simple LSB embedding with XOR cipher
2. **Enhanced XOR Steganography** - Improved pixel traversal pattern
3. **AES-Encrypted Steganography** - Military-grade encryption before embedding

***

## 🚀 Project Features

### Core Capabilities
- **Data Hiding**: Conceal messages in image pixels using LSB techniques
- **Multiple Encryption Options**:
  - XOR cipher (basic and enhanced versions)
  - AES-256 with SHA-256 key derivation (most secure)
- **Image Support**: Works with common formats (JPEG, PNG)
- **Visual Preservation**: Maintains original image appearance
- **Key Protection**: Requires secret key for decryption

***

### Technical Specifications
1. **Basic XOR Version**:
   - Simple character-wise XOR encryption
   - Sequential pixel embedding
   - Supports custom or random images

2. **Enhanced XOR Version**:
   - Improved 3D pixel traversal (row→column→channel)
   - Better resistance to basic detection
   - Visual comparison of original/encoded images

3. **AES Version**:
   - AES-256 in CBC mode with random IV
   - SHA-256 key derivation
   - PKCS#7 padding
   - Full encryption before embedding

***

## 🛠️ Usage Instructions

### Basic Requirements
- Python 3.8+
- Required packages:
  ```bash
  pip install opencv-python numpy matplotlib pycryptodome

## 🛡 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and share this project with proper attribution.

## 🌟 About Me  

Hi, there!. I am Vladimir Illich Arunan, an engineering student with a deep passion for understanding the inner workings of the digital world. My goal is to master the systems that power modern technology—not just to build and innovate, but also to test their limits through cybersecurity.

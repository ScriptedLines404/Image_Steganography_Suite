# In aes_steganography.py - Improved implementation:

import numpy as np
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
import os
import hashlib

class AESSteganography:
    def __init__(self):
        # Remove unnecessary dictionary mappings
        pass
    
    def derive_key(self, userkey):
        """Derive a consistent 16-byte key from user input"""
        return hashlib.sha256(userkey.encode()).digest()[:16]
    
    def encrypt_message(self, msg, userkey):
        """Encrypt message with proper error handling"""
        try:
            key = self.derive_key(userkey)
            iv = os.urandom(16)
            
            # Pad the message properly
            padder = padding.PKCS7(128).padder()
            padded_data = padder.update(msg.encode('utf-8')) + padder.finalize()
            
            # Encrypt
            cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
            encryptor = cipher.encryptor()
            ct = encryptor.update(padded_data) + encryptor.finalize()
            
            return iv + ct
        except Exception as e:
            print(f"Encryption error: {e}")
            raise
    
    def decrypt_message(self, cipher_bytes, userkey):
        """Decrypt message with proper error handling"""
        try:
            if len(cipher_bytes) < 32:  # Minimum size for IV + at least one block
                return "Invalid encrypted data"
                
            key = self.derive_key(userkey)
            iv = cipher_bytes[:16]
            ct = cipher_bytes[16:]
            
            cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
            decryptor = cipher.decryptor()
            padded_data = decryptor.update(ct) + decryptor.finalize()
            
            # Unpad
            unpadder = padding.PKCS7(128).unpadder()
            data = unpadder.update(padded_data) + unpadder.finalize()
            
            return data.decode('utf-8')
        except Exception as e:
            print(f"Decryption error: {e}")
            return f"Extraction failed: {str(e)}"
    
    def hide_data(self, image_array, secret_text, encryption_key):
        """Hide encrypted data in image"""
        try:
            x = np.array(image_array, copy=True).astype(np.uint8)
            encrypted_bytes = self.encrypt_message(secret_text, encryption_key)
            
            height, width, channels = x.shape
            total_pixels = height * width * channels
            
            # Check if image is large enough
            if len(encrypted_bytes) > total_pixels:
                raise ValueError(f"Image too small. Need {len(encrypted_bytes)} bytes, have {total_pixels}")
            
            # Flatten image for easier manipulation
            flat_image = x.reshape(-1)
            
            # Embed data length first (4 bytes)
            data_len = len(encrypted_bytes)
            len_bytes = data_len.to_bytes(4, byteorder='big')
            
            # Combine length and data
            all_data = len_bytes + encrypted_bytes
            
            # Embed data using LSB technique for robustness
            for i, byte in enumerate(all_data):
                if i * 8 >= len(flat_image):
                    break
                
                # Embed each bit in LSB of consecutive pixels
                for bit_pos in range(8):
                    pixel_idx = i * 8 + bit_pos
                    if pixel_idx < len(flat_image):
                        # Clear LSB and set to current bit
                        flat_image[pixel_idx] = (flat_image[pixel_idx] & 0xFE) | ((byte >> (7 - bit_pos)) & 1)
            
            return flat_image.reshape(x.shape)
            
        except Exception as e:
            print(f"Hide data error: {e}")
            raise
    
    def extract_data(self, image_array, encryption_key):
        """Extract and decrypt data from image"""
        try:
            x = np.array(image_array, copy=True).astype(np.uint8)
            flat_image = x.reshape(-1)
            
            # Extract data length first (4 bytes = 32 bits)
            data_len = 0
            for i in range(4):
                byte = 0
                for bit_pos in range(8):
                    pixel_idx = i * 8 + bit_pos
                    if pixel_idx < len(flat_image):
                        bit = flat_image[pixel_idx] & 1
                        byte = (byte << 1) | bit
                data_len = (data_len << 8) | byte
            
            # Extract the encrypted data
            encrypted_data = bytearray()
            total_bits_needed = data_len * 8
            
            for i in range(4, 4 + data_len):
                if (i * 8) + 8 > len(flat_image):
                    break
                    
                byte = 0
                for bit_pos in range(8):
                    pixel_idx = i * 8 + bit_pos
                    if pixel_idx < len(flat_image):
                        bit = flat_image[pixel_idx] & 1
                        byte = (byte << 1) | bit
                encrypted_data.append(byte)
            
            return self.decrypt_message(bytes(encrypted_data), encryption_key)
            
        except Exception as e:
            print(f"Extract data error: {e}")
            return f"Extraction failed: {str(e)}"
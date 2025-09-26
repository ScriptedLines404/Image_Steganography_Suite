import numpy as np
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
import os
import hashlib

class AESSteganography:
    def __init__(self):
        self.d = {chr(i): i for i in range(256)}
        self.c = {i: chr(i) for i in range(256)}
    
    def derive_key(self, userkey):
        return hashlib.sha256(userkey.encode()).digest()[:16]
    
    def encrypt_message(self, msg, userkey):
        key = self.derive_key(userkey)
        iv = os.urandom(16)
        
        # Pad the message
        padder = padding.PKCS7(128).padder()
        padded_data = padder.update(msg.encode()) + padder.finalize()
        
        # Encrypt
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        encryptor = cipher.encryptor()
        ct = encryptor.update(padded_data) + encryptor.finalize()
        
        return iv + ct
    
    def decrypt_message(self, cipher_bytes, userkey):
        key = self.derive_key(userkey)
        iv = cipher_bytes[:16]
        ct = cipher_bytes[16:]
        
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()
        padded_data = decryptor.update(ct) + decryptor.finalize()
        
        # Unpad
        unpadder = padding.PKCS7(128).unpadder()
        data = unpadder.update(padded_data) + unpadder.finalize()
        
        return data.decode()
    
    def hide_data(self, image_array, secret_text, encryption_key):
        x = np.array(image_array, copy=True)
        encrypted_bytes = self.encrypt_message(secret_text, encryption_key)
        
        n, m, z = 0, 0, 0
        k1 = 0
        height, width, channels = x.shape
        
        for i in range(len(encrypted_bytes)):
            if n >= height:
                raise ValueError("Image too small for the encrypted data")
            
            x[n, m, z] = encrypted_bytes[i] ^ self.d[encryption_key[k1]]
            n += 1
            if n >= height:
                n = 0
                m += 1
                if m >= width:
                    m = 0
                    z = (z + 1) % 3
            
            k1 = (k1 + 1) % len(encryption_key)
        
        return x
    
    def extract_data(self, image_array, encryption_key):
        x = image_array
        n, m, z = 0, 0, 0
        k1 = 0
        height, width, channels = x.shape
        
        # Estimate maximum possible hidden data length
        max_bytes = min(height * width * channels, 10000)
        encrypted_back = bytearray()
        
        for _ in range(max_bytes):
            if n >= height:
                break
                
            try:
                encrypted_back.append(x[n, m, z] ^ self.d[encryption_key[k1]])
                n += 1
                if n >= height:
                    n = 0
                    m += 1
                    if m >= width:
                        m = 0
                        z = (z + 1) % 3
                
                k1 = (k1 + 1) % len(encryption_key)
            except:
                break
        
        try:
            decrypted = self.decrypt_message(bytes(encrypted_back), encryption_key)
            return decrypted
        except:
            return "Extraction failed - possible wrong key or corrupted data"
# steganography/aes_steganography.py
import cv2
import numpy as np
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
import hashlib

class AESSteganography:
    def __init__(self):
        self.d = {chr(i): i for i in range(256)}
        self.c = {i: chr(i) for i in range(256)}
    
    def derive_key(self, userkey):
        return hashlib.sha256(userkey.encode()).digest()[:16]
    
    def encrypt_message(self, msg, userkey):
        key = self.derive_key(userkey)
        cipher = AES.new(key, AES.MODE_CBC)
        ct = cipher.encrypt(pad(msg.encode(), AES.block_size))
        return cipher.iv + ct
    
    def decrypt_message(self, cipher_bytes, userkey):
        key = self.derive_key(userkey)
        iv = cipher_bytes[:16]
        ct = cipher_bytes[16:]
        cipher = AES.new(key, AES.MODE_CBC, iv)
        return unpad(cipher.decrypt(ct), AES.block_size).decode()
    
    def hide_data(self, image_array, secret_text, encryption_key):
        x = image_array.copy()
        encrypted_bytes = self.encrypt_message(secret_text, encryption_key)
        
        n = m = z = 0
        k1 = 0
        
        for i in range(len(encrypted_bytes)):
            x[n, m, z] = encrypted_bytes[i] ^ self.d[encryption_key[k1]]
            n += 1
            m = (m + 1) % 3
            z = (z + 1) % 3
            k1 = (k1 + 1) % len(encryption_key)
        
        return x
    
    def extract_data(self, image_array, encryption_key):
        x = image_array
        n = m = z = 0
        k1 = 0
        
        # Estimate maximum possible hidden data length
        max_bytes = (x.shape[0] * x.shape[1] * 3) // 1
        encrypted_back = bytearray()
        
        for _ in range(min(max_bytes, 10000)):  # Reasonable limit
            try:
                encrypted_back.append(x[n, m, z] ^ self.d[encryption_key[k1]])
                n += 1
                m = (m + 1) % 3
                z = (z + 1) % 3
                k1 = (k1 + 1) % len(encryption_key)
            except:
                break
        
        try:
            decrypted = self.decrypt_message(bytes(encrypted_back), encryption_key)
            return decrypted
        except:
            return "Extraction failed - possible wrong key or corrupted data"
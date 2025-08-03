"""
SECURE IMAGE STEGANOGRAPHY WITH AES ENCRYPTION
---------------------------------------------
Combines steganography with strong AES-128 encryption to:
- Encrypt messages using AES-CBC with SHA-256 key derivation
- Hide encrypted data in image pixels using LSB techniques
- Extract and decrypt hidden messages with proper key

"""

import cv2
import string
import os
from Crypto.Cipher import AES  # AES cipher
from Crypto.Util.Padding import pad, unpad  # ensure input text fits AES Block size
from Crypto.Random import get_random_bytes
import hashlib

# ========== CRYPTO FUNCTIONS ==========
def derive_key(userkey):
    """Derive 128-bit AES key from user input using SHA-256"""
    return hashlib.sha256(userkey.encode()).digest()[:16]  # Truncate to 16 bytes (AES-128)

def encrypt_message(msg, userkey):
    """Encrypt message using AES-CBC with random IV"""
    key = derive_key(userkey)
    cipher = AES.new(key, AES.MODE_CBC)  # Auto-generates IV
    ct = cipher.encrypt(pad(msg.encode(), AES.block_size))  # Pad and encrypt
    return cipher.iv + ct  # Return IV + ciphertext

def decrypt_message(cipher_bytes, userkey):
    """Decrypt message using AES-CBC"""
    key = derive_key(userkey)
    iv = cipher_bytes[:16]  # Extract IV (first 16 bytes)
    ct = cipher_bytes[16:]  # Remaining is ciphertext
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(ct), AES.block_size).decode()

# ========== CHARACTER MAPPINGS ==========
d = {}  # Character → ASCII
c = {}  # ASCII → Character
for i in range(256):
    d[chr(i)] = i  # 'A' → 65
    c[i] = chr(i)  # 65 → 'A'

# ========== MAIN EXECUTION ==========
# Load carrier image
x = cv2.imread(r"E:\python\Screenshot (4).png")  

# Encryption parameters
key = "123"  
text = "THIS IS A SECRET MESSAGE"  

# Encrypt the message
encrypted_bytes = encrypt_message(text, key)  
print(f"Encrypted message length: {len(encrypted_bytes)} bytes")

# ========== STEGANOGRAPHY EMBEDDING ==========
n = m = z = 0  # Pixel position trackers (row, column, channel)
k1 = 0          # Key index

# Embed each encrypted byte in image
for i in range(len(encrypted_bytes)):
    # XOR byte with key character and store in pixel
    x[n, m, z] = encrypted_bytes[i] ^ d[key[k1]]
    
    # Move to next pixel channel
    n += 1
    m = (m + 1) % 3  # Cycle through RGB channels
    z = (z + 1) % 3
    k1 = (k1 + 1) % len(key)  # Cycle through key

# Save stego-image
cv2.imwrite("encrypted.jpg", x)
os.startfile("encrypted.jpg")
print("Message embedded successfully!")

# ========== STEGANOGRAPHY EXTRACTION ==========
n = m = z = 0  # Reset position trackers
k1 = 0          # Reset key index
key1 = input("Enter decryption key: ")

if key == key1:
    encrypted_back = bytearray()  # Store extracted bytes
    
    # Extract each hidden byte
    for _ in range(len(encrypted_bytes)):
        encrypted_back.append(x[n, m, z] ^ d[key[k1]])
        n += 1
        m = (m + 1) % 3
        z = (z + 1) % 3
        k1 = (k1 + 1) % len(key)
    
    # Attempt decryption
    try:
        decrypted = decrypt_message(bytes(encrypted_back), key)
        print("Decrypted message:", decrypted)
    except ValueError as e:
        print("Decryption failed - possible corruption:", e)
else:
    print("ERROR: Incorrect key")

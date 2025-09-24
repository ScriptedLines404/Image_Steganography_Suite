"""
Image Steganography with XOR Encryption
---------------------------------------
- Hides text in image pixels using XOR encryption
- Encrypts/decrypts messages using a secret key
- Preserves image appearance while hiding data
- Works with common image formats (JPEG, PNG)
"""

import cv2
import numpy as np
import matplotlib.pyplot as plt

# ========== CHARACTER CONVERSION DICTIONARIES ==========
# Create mappings between characters and their ASCII values
d = {chr(i): i for i in range(255)}  # Character to ASCII value
c = {i: chr(i) for i in range(255)}  # ASCII value to character

# ========== IMAGE LOADING AND DISPLAY ==========
image_path = "/content/New Project.jpg"  # Load original image from file path
x = cv2.imread(image_path)  # Read image in BGR format
xrgb = cv2.cvtColor(x, cv2.COLOR_BGR2RGB)  # Convert to RGB for proper matplotlib display

# Display original image
plt.imshow(xrgb)
plt.axis('off')  # Hide axis ticks
plt.show()

# ========== ENCRYPTION SETUP ==========
key = '257'  # Encryption key
text = 'THIS IS A SECRET MESSAGE'

# Convert text and key to their ASCII representations
text_ascii = [d[ch] for ch in text]  # List of ASCII values for each character in text
key_ascii = [d[ch] for ch in key]    # List of ASCII values for each character in key
print("Text ASCII:", text_ascii)
print("Key ASCII:", key_ascii)

# ========== IMAGE ENCRYPTION PROCESS ==========
x_enc = x.copy()  # Create a working copy of the original image

# Initialize position trackers:
n = 0  # Row index
m = 0  # Column index
z = 0  # Color channel index (0:B, 1:G, 2:R)
l = len(text)  # Length of secret message
kl = 0  # Key index counter

for i in range(l):
    # Perform XOR operation between text character and key character
    new_value = d[text[i]] ^ d[key[kl]]
    
    # Store the result in the current pixel channel
    x_enc[n, m, z] = new_value
    
    # Update position trackers:
    n += 1  # Move to next row
    m += 1  # Move to next column
    z = (z + 1) % 3  # Cycle through color channels (Blue → Green → Red)
    m = (m + 1) % 3  # Additional column movement pattern
    kl = (kl + 1) % len(key)  # Cycle through key characters

# ========== SAVE AND DISPLAY ENCRYPTED IMAGE ==========
cv2.imwrite("encrypted.jpg", x_enc)  # Save encrypted image to file

# Display encrypted image (converted to RGB for proper visualization)
plt.imshow(cv2.cvtColor(x_enc, cv2.COLOR_BGR2RGB))
plt.title("Encrypted Image")
plt.axis('off')
plt.show()

# ========== DECRYPTION PROCESS ==========
# Reset position trackers to start from beginning
n, m, z = 0, 0, 0
kl = 0  # Reset key index
decrypt = ""  # Initialize decrypted message string

for i in range(l):
    # Extract encrypted value from current pixel channel
    val = x_enc[n, m, z]
    
    # Perform XOR operation with key to retrieve original character
    orig_char = c[val ^ d[key[kl]]]
    decrypt += orig_char  # Append decrypted character to result
    
    # Update position trackers (must match encryption pattern exactly)
    n += 1
    m += 1
    z = (z + 1) % 3
    m = (m + 1) % 3
    kl = (kl + 1) % len(key)

# ========== OUTPUT DECRYPTED MESSAGE ==========
print("Decrypted Text:", decrypt)

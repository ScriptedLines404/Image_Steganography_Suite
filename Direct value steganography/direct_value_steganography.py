"""
Byte-Level Hiding: Replaces entire pixel values with encrypted data

Existing Image Support: Works with user-provided image files

Simple Implementation: Easier to understand but less secure

Basic Visualization: Shows original and modified images
"""
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create dictionaries for ASCII character conversion
d = {chr(i): i for i in range(255)}  # Character to ASCII
c = {i: chr(i) for i in range(255)}  # ASCII to character

# Load and display original image
image_path = "/content/New Project.jpg"
x = cv2.imread(image_path)
xrgb = cv2.cvtColor(x, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB for proper display

plt.imshow(xrgb)
plt.axis('off')
plt.show()

# Encryption setup
key = '257'
text = 'THIS IS A SECRET MESSAGE MEANT ONLY FOR STUDENTS OF CYBERSECURITY WORKSHOP CONDUCTED BY EDUNET IN COLLABORATION WITH IBM SKILLBUILD'

# Convert text and key to ASCII values
text_ascii = [d[ch] for ch in text]
key_ascii = [d[ch] for ch in key]
print("Text ASCII:", text_ascii)
print("Key ASCII:", key_ascii)

# Encrypt the image by hiding the text
x_enc = x.copy()  # Create a copy of original image
n, m, z = 0, 0, 0  # Initialize pixel position counters
l = len(text)      # Length of text to encrypt
kl = 0             # Key index counter

for i in range(l):
    # XOR text character with key character and store in image pixel
    new_value = d[text[i]] ^ d[key[kl]]
    x_enc[n, m, z] = new_value
    
    # Update position counters (moving through pixels and color channels)
    n += 1
    m += 1
    z = (z + 1) % 3  # Cycle through color channels (0:Blue, 1:Green, 2:Red)
    m = (m + 1) % 3   # Additional movement in column position
    kl = (kl + 1) % len(key)  # Cycle through key characters

# Save and display encrypted image
cv2.imwrite("encrypted.jpg", x_enc)
plt.imshow(cv2.cvtColor(x_enc, cv2.COLOR_BGR2RGB))
plt.title("Encrypted Image")
plt.axis('off')
plt.show()

# Decryption process
n, m, z = 0, 0, 0  # Reset position counters
kl = 0             # Reset key index
decrypt = ""       # Initialize decrypted string

for i in range(l):
    # Extract value from encrypted image
    val = x_enc[n, m, z]
    # XOR with key to get original character
    orig_char = c[val ^ d[key[kl]]]
    decrypt += orig_char
    
    # Update position counters (same as encryption)
    n += 1
    m += 1
    z = (z + 1) % 3
    m = (m + 1) % 3
    kl = (kl + 1) % len(key)

print("Decrypted Text:", decrypt)

"""
Hides secret messages in images using LSB steganography with XOR encryption
-----------------------------------------------------------------------------
- Encrypts text using XOR cipher with a key
- Embeds message in image pixels' least significant bits
- Extracts hidden messages while preserving image quality
- Supports custom images (JPEG/PNG) or generates random test images

"""

import numpy as np
import matplotlib.pyplot as plt
import cv2

# ASCII conversion dictionaries
d = {chr(i): i for i in range(255)}  # Character → ASCII
c = {i: chr(i) for i in range(255)}  # ASCII → Character

# User Configuration ===================================
image_path = "/content/New Project.jpg"  # Set to None for random image or path like "my_image.jpg"
key = '257'
text = 'THIS IS A SECRET MESSAGE'

# Image Loading ========================================
if image_path:
    try:
        x = cv2.imread(image_path)
        if x is None:
            raise FileNotFoundError
        x = cv2.cvtColor(x, cv2.COLOR_BGR2RGB)
        print(f"Loaded: {image_path} ({x.shape[1]}x{x.shape[0]})")
    except Exception as e:
        print(f"Error loading {image_path}: {e}. Using random image instead.")
        image_path = None

if not image_path:
    # Create random image if none provided
    required_pixels = len(text) * 8 // 3 + 1
    image_size = int(np.ceil(np.sqrt(required_pixels)))
    x = np.random.randint(0, 255, (image_size, image_size, 3), dtype=np.uint8)
    print(f"Generated random {image_size}x{image_size} image")

x_enc = x.copy()  # Create a copy for encryption

# ========== VISUALIZE ORIGINAL IMAGE ==========
plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.imshow(x)
plt.title('Original Image')
plt.axis('off')

# Initialize position trackers
n = 0  # Row index
m = 0  # Column index
z = 0  # Color channel index (0:R, 1:G, 2:B)
kl = 0  # Key index

# ========== ENCRYPTION PROCESS ==========
for i in range(len(text)):  # Encrypt all characters
    # XOR character with key for basic encryption
    char_val = d[text[i]] ^ d[key[kl]]
    
    # Embed each bit of the encrypted character in LSB of pixels
    for bit_pos in range(8):
        # Extract current bit (MSB first)
        bit = (char_val >> (7 - bit_pos)) & 1
        
        # Modify LSB of current pixel channel
        x_enc[n, m, z] = np.uint8((x_enc[n, m, z] & 0xFE) | bit)
        
        # Move to next channel/pixel
        z = (z + 1) % 3
        if z == 0:  # When all channels used, move to next pixel
            m += 1
            if m == x_enc.shape[1]:  # When row complete, move to next row
                m = 0
                n += 1
    
    # Cycle through key characters
    kl = (kl + 1) % len(key)

# ========== VISUALIZE ENCRYPTED IMAGE ==========
plt.subplot(1, 2, 2)
plt.imshow(x_enc)
plt.title('Encrypted Image (LSB Modified)')
plt.axis('off')
plt.tight_layout()
plt.show()

# ========== DECRYPTION PROCESS ==========
n, m, z = 0, 0, 0  # Reset position trackers
k1 = 0  # Key index
decrypt = ""

for i in range(len(text)):  # Decrypt all characters
    val = 0  # Initialize reconstructed byte
    
    # Extract 8 bits from LSBs of consecutive pixels
    for bit_pos in range(8):
        bit = x_enc[n, m, z] & 1  # Get LSB
        val = (val << 1) | bit     # Reconstruct byte
        
        # Move to next channel/pixel (must match encryption pattern exactly)
        z = (z + 1) % 3
        if z == 0:
            m += 1
            if m == x_enc.shape[1]:
                m = 0
                n += 1
    
    # XOR with key to decrypt character
    orig_char = c[val ^ d[key[k1]]]
    decrypt += orig_char
    
    # Cycle through key characters
    k1 = (k1 + 1) % len(key)

print("Decrypted text:", decrypt)

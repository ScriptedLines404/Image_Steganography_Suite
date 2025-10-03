import numpy as np

class LSBSteganography:
    def __init__(self):
        self.d = {chr(i): i for i in range(256)}
        self.c = {i: chr(i) for i in range(256)}
    
    def hide_data(self, image_array, secret_text):
        # Ensure image_array is writable
        x = np.array(image_array, copy=True)
        text_length = len(secret_text)
        
        # Encode text length in first 32 pixels (4 bytes)
        length_bytes = text_length.to_bytes(4, byteorder='big')
        
        n, m, z = 0, 0, 0
        height, width, channels = x.shape
        
        # Hide length first
        for byte in length_bytes:
            for bit_pos in range(8):
                if n >= height:
                    raise ValueError("Image too small for the secret text")
                
                bit = (byte >> (7 - bit_pos)) & 1
                x[n, m, z] = (x[n, m, z] & 0xFE) | bit
                z = (z + 1) % 3
                if z == 0:
                    m += 1
                    if m >= width:
                        m = 0
                        n += 1
        
        # Hide secret text
        for char in secret_text:
            char_val = self.d[char]
            for bit_pos in range(8):
                if n >= height:
                    raise ValueError("Image too small for the secret text")
                
                bit = (char_val >> (7 - bit_pos)) & 1
                x[n, m, z] = (x[n, m, z] & 0xFE) | bit
                z = (z + 1) % 3
                if z == 0:
                    m += 1
                    if m >= width:
                        m = 0
                        n += 1
        
        return x
    
    def extract_data(self, image_array):
        x = image_array
        n, m, z = 0, 0, 0
        height, width, channels = x.shape
        
        # Extract length first
        length_bytes = bytearray()
        for _ in range(4):
            byte_val = 0
            for bit_pos in range(8):
                if n >= height:
                    return ""  # No data found
                
                bit = x[n, m, z] & 1
                byte_val = (byte_val << 1) | bit
                z = (z + 1) % 3
                if z == 0:
                    m += 1
                    if m >= width:
                        m = 0
                        n += 1
            length_bytes.append(byte_val)
        
        text_length = int.from_bytes(length_bytes, byteorder='big')
        
        # Extract secret text
        extracted_text = ""
        for _ in range(text_length):
            if n >= height:
                break  # Reached end of image
                
            char_val = 0
            for bit_pos in range(8):
                if n >= height:
                    break
                    
                bit = x[n, m, z] & 1
                char_val = (char_val << 1) | bit
                z = (z + 1) % 3
                if z == 0:
                    m += 1
                    if m >= width:
                        m = 0
                        n += 1
            extracted_text += self.c[char_val]
        
        return extracted_text
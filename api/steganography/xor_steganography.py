import numpy as np

class XORSteganography:
    def __init__(self):
        self.d = {chr(i): i for i in range(256)}
        self.c = {i: chr(i) for i in range(256)}
    
    def hide_data(self, image_array, secret_text, encryption_key):
        x = np.array(image_array, copy=True)
        n, m, z = 0, 0, 0
        kl = 0
        height, width, channels = x.shape
        
        # Hide length first
        length_bytes = len(secret_text).to_bytes(4, byteorder='big')
        for byte in length_bytes:
            encrypted_byte = byte ^ self.d[encryption_key[kl]]
            for bit_pos in range(8):
                if n >= height:
                    raise ValueError("Image too small for the secret text")
                
                bit = (encrypted_byte >> (7 - bit_pos)) & 1
                x[n, m, z] = (x[n, m, z] & 0xFE) | bit
                z = (z + 1) % 3
                if z == 0:
                    m += 1
                    if m >= width:
                        m = 0
                        n += 1
            kl = (kl + 1) % len(encryption_key)
        
        # Hide encrypted text
        for char in secret_text:
            encrypted_char = self.d[char] ^ self.d[encryption_key[kl]]
            for bit_pos in range(8):
                if n >= height:
                    raise ValueError("Image too small for the secret text")
                
                bit = (encrypted_char >> (7 - bit_pos)) & 1
                x[n, m, z] = (x[n, m, z] & 0xFE) | bit
                z = (z + 1) % 3
                if z == 0:
                    m += 1
                    if m >= width:
                        m = 0
                        n += 1
            kl = (kl + 1) % len(encryption_key)
        
        return x
    
    def extract_data(self, image_array, encryption_key):
        x = image_array
        n, m, z = 0, 0, 0
        kl = 0
        height, width, channels = x.shape
        
        # Extract length
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
            decrypted_byte = byte_val ^ self.d[encryption_key[kl]]
            length_bytes.append(decrypted_byte)
            kl = (kl + 1) % len(encryption_key)
        
        text_length = int.from_bytes(length_bytes, byteorder='big')
        
        # Extract and decrypt text
        extracted_text = ""
        for _ in range(text_length):
            if n >= height:
                break
                
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
            decrypted_char = self.c[char_val ^ self.d[encryption_key[kl]]]
            extracted_text += decrypted_char
            kl = (kl + 1) % len(encryption_key)
        
        return extracted_text
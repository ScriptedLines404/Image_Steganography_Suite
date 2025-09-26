# test_api.py
import numpy as np
from PIL import Image
import sys
print("Python version:", sys.version)
print("NumPy version:", np.__version__)

# Test basic functionality
arr = np.array([[1, 2, 3], [4, 5, 6]])
print("NumPy array test:", arr.shape)

img = Image.new('RGB', (100, 100), color='red')
print("PIL test: Image created successfully")

print("✅ All basic dependencies working!")
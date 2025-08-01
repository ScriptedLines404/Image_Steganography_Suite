import cv2
import numpy as np
import string
import os
import matplotlib.pyplot as plt
d={chr(i): i for i in range (255)}
c={i: chr(i) for i in range (255)}
image_path = "/content/New Project.jpg"
x = cv2.imread(image_path)
xrgb = cv2.cvtColor(x,cv2.COLOR_BGR2RGB)
plt.imshow(xrgb)
plt.axis('off')
plt.show()
key='257'
text='THIS IS A SECRET MESSAGE MEANT ONLY FOR STUDENTS OF CYBERSECURITY WORKSHOP CONDUCTED BY EDUNET IN COLLABORATION WITH IBM SKILLBUILD'
text_ascii=[d[ch] for ch in text]
key_ascii=[d[ch] for ch in key]
print(text_ascii)
print(key_ascii)
x_enc=x.copy()
n=0
m=0
z=0
l=len(text)
kl=0
for i in range (l):
  orgi_value=x_enc[n,m,z]
  new_value= d[text[i]]^d[key[kl]]
  x_enc[n,m,z]=new_value
  n+=1
  m+=1
  z=(z+1)%3
  m=(m+1)%3
  kl=(kl+1)%len(key)
cv2.imwrite("encrypted.jpg", x_enc)
plt.imshow(cv2.cvtColor(x_enc, cv2.COLOR_BGR2RGB))
plt.title("Encrypted Image")
plt.axis('off')
plt.show()
n,m,z=0,0,0
kl=0
decrypt=""
for i in range (l):
  val=x_enc[n,m,z]
  orig_char= c[val^d[key[kl]]]
  decrypt+=orig_char
  n+=1
  m+=1
  z=(z+1)%3
  m=(m+1)%3
  kl=(kl+1)%len(key)
print(decrypt)

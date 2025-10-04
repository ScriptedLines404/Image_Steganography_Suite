# 🖼️🔐 Image Steganography Suite

<p align="center">
  <a href= "LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/Python-3.8%252B-blue" alt="Python" />
  <img src="https://img.shields.io/badge/React-18%252B-blue" alt="React" />
  <img src="https://img.shields.io/badge/Flask-2.0%252B-green" alt="Flask" />
  <img src="https://img.shields.io/badge/OpenCV-4.5%252B-orange" alt="OpenCV" />
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status" />
  <img src="https://img.shields.io/badge/contributions-welcome-blueviolet" alt="Contributions Welcome" />
</p>

A collection of secure **steganography tools** that hide secret messages in images using different encryption methods. This project demonstrates three approaches to embedding encrypted data in images while preserving visual quality.

🌐 Live Demo: [Image Steganography Suite](https://image-steganography-suite.onrender.com)

---

## 🔐 Supported Techniques

* 🧩 **Basic XOR Steganography** – Simple LSB embedding with XOR cipher.
* 🔄 **Enhanced XOR Steganography** – Improved pixel traversal pattern.
* 🛡️ **AES-Encrypted Steganography** – Military-grade AES encryption before embedding.

---

## ✨ Features

* 🌐 **Web-based interface** built with React for easy interaction.
* ⚙️ **Flask API backend** for handling image processing and encryption.
* 🔧 Support for multiple steganography methods (XOR, Enhanced XOR, AES).
* 💻 Cross-platform compatibility (runs on Windows, macOS, and Linux).
* 🖼️ Uses **OpenCV** and **Pillow** for image manipulation.
* 🔑 Secure encryption powered by **PyCryptodome**.

---

## 📁 Repository Structure
```
Image_Steganography_Suite/
│
│
├── 📁 api/                          # ⚙️ Backend test and helper scripts  
│   │
│   └── 🧪 test_api.py               # API testing script  
│
│
├── 📁 src/                          # 💻 Frontend (React)  
│   │
│   ├── 🧩 App.jsx                   # Main React app component
│   │
│   ├── 📁 components                #  Reusable UI components (Navbar, UploadForm, etc.)
│   │
│   ├── 📁 services                  #  API communication layer (handles backend requests) 
│   │
│   ├── 🚀 index.js                  # Entry point for React rendering  
│   │
│   └── 🎨 index.css                 # Global styles  
│
│
├── 📁 public/                       # 🗂️ Static frontend assets  
│   │
│   └── 🧱 index.html                # Root HTML file for the React app  
│
│
├── 🔐 aes_steganography.py          # AES encryption-based image steganography  
│
├── 🖼️ lsb_steganography.py          # LSB (Least Significant Bit) image steganography  
│
├── ⚡ xor_steganography.py           # XOR-based steganography algorithm  
│
│
├── 🧠 app.py                        # Flask backend main routes  
│
├── ▶️ run_backend.py                # Entry point to start Flask server  
│
├── 🌐 wsgi.py                       # WSGI entry point for deployment  
│
│
├── 📦 requirements.txt              # Backend Python dependencies  
│
├── 📦 package.json                  # Frontend dependencies  
│
├── 🔒 package-lock.json             # Dependency lock file  
│
├── 🎨 tailwind.config.js            # Tailwind CSS configuration  
│
├── ⚙️ postcss.config.js             # PostCSS configuration  
│
├── 🗄️ static.json                  # Render deployment config (static)  
│
├── ☁️ backend-render.yaml           # Render deployment config (backend)  
│
├── ⚙️ render.yaml                   # Combined Render deployment configuration  
│
│
├── 📘 README.md                     # Project documentation  
│
└── 📄 LICENSE                       # MIT License  
```
---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ScriptedLines404/Image_Steganography_Suite.git
cd Image_Steganography_Suite
```

### 2️⃣ Backend Setup (Flask API)

```bash
cd api
python -m venv venv
venv\Scripts\activate   # On Mac: source venv/bin/activate
pip install -r requirements.txt
```

Start the backend server:

```bash
python run_backend.py
```

📍 The API will be available at `http://127.0.0.1:5000`.

### 3️⃣ Frontend Setup (React)

```bash
cd ..
npm install
npm start
```

📍 The frontend will run at `http://localhost:3000`.

---

## 🖥️ Usage

1. 🚀 Launch both **backend** and **frontend** servers.
2. 🌍 Open the frontend in your browser at `http://localhost:3000`.
3. 🛠️ Choose a steganography method:

   * 📷 Upload a **cover image**.
   * 📝 Enter or upload your **secret message**.
   * 🔐 Select an encryption method (XOR / Enhanced XOR / AES).
   * 💾 Download the generated **stego-image**.
4. 🔍 To extract a hidden message:

   * Upload the **stego-image**.
   * Provide the **decryption key** (if applicable).

---

## 🤝 Contributing

We welcome contributions! 🙌

1. 🍴 Fork the repository.
2. 🌿 Create a new branch for your feature or bugfix.
3. 🖊️ Write clear commit messages and include tests where possible.
4. 📬 Submit a pull request with a detailed description.

**Guidelines:**

* 🧹 Follow Python and JavaScript best practices.
* 📚 Keep code clean and well-documented.
* 📝 Update relevant documentation when making changes.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and share this project with proper attribution.

## 🌟 About Me  

Hi, there!. I am Vladimir Illich Arunan, an engineering student with a deep passion for understanding the inner workings of the digital world. My goal is to master the systems that power modern technology—not just to build and innovate, but also to test their limits through cybersecurity.

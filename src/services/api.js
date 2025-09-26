// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class SteganographyAPI {
    static async imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Remove the data URL prefix
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
        });
    }

    static async base64ToImageUrl(base64String) {
        return `data:image/png;base64,${base64String}`;
    }

    static async hideData(technique, imageFile, secretText, encryptionKey = '') {
        try {
            const imageBase64 = await this.imageToBase64(imageFile);
            
            const payload = {
                technique: technique,
                image: imageBase64,
                secret_text: secretText,
                encryption_key: encryptionKey
            };

            const response = await fetch(`${API_BASE_URL}/api/hide`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Convert base64 result back to image URL
            if (result.stego_image) {
                result.stego_image_url = await this.base64ToImageUrl(result.stego_image);
            }
            
            return result;
        } catch (error) {
            console.error('Hide data error:', error);
            throw error;
        }
    }

    static async extractData(technique, imageFile, encryptionKey = '') {
        try {
            const imageBase64 = await this.imageToBase64(imageFile);
            
            const payload = {
                technique: technique,
                image: imageBase64,
                encryption_key: encryptionKey
            };

            const response = await fetch(`${API_BASE_URL}/api/extract`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Extract data error:', error);
            throw error;
        }
    }

    static async checkCapacity(technique, imageFile) {
        try {
            const imageBase64 = await this.imageToBase64(imageFile);
            
            const payload = {
                technique: technique,
                image: imageBase64
            };

            const response = await fetch(`${API_BASE_URL}/api/capacity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Capacity check error:', error);
            throw error;
        }
    }

    static async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/health`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Health check error:', error);
            throw error;
        }
    }
}

export default SteganographyAPI;
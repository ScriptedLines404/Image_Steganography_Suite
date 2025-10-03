const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://steganography-backend-32br.onrender.com';

class SteganographyAPI {
    static async imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                // Remove the data URL prefix
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    static async base64ToImageUrl(base64String) {
        return `data:image/png;base64,${base64String}`;
    }

    static async makeApiCall(endpoint, payload) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    // If response is not JSON, use status text
                    errorMessage = response.statusText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            return await response.json();
        } catch (error) {
            console.error(`API call error for ${endpoint}:`, error);
            
            // Enhanced error messages
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Cannot connect to server. Please make sure the backend is running on port 5000.');
            }
            
            throw error;
        }
    }

    static async hideData(technique, imageFile, secretText, encryptionKey = '') {
        const imageBase64 = await this.imageToBase64(imageFile);
        
        const payload = {
            technique: technique,
            image: imageBase64,
            secret_text: secretText,
            encryption_key: encryptionKey
        };

        const result = await this.makeApiCall('/api/hide', payload);
        
        // Convert base64 result back to image URL
        if (result.stego_image) {
            result.stego_image_url = await this.base64ToImageUrl(result.stego_image);
        }
        
        return result;
    }

    static async extractData(technique, imageFile, encryptionKey = '') {
        const imageBase64 = await this.imageToBase64(imageFile);
        
        const payload = {
            technique: technique,
            image: imageBase64,
            encryption_key: encryptionKey
        };

        return await this.makeApiCall('/api/extract', payload);
    }

    static async checkCapacity(technique, imageFile) {
        const imageBase64 = await this.imageToBase64(imageFile);
        
        const payload = {
            technique: technique,
            image: imageBase64
        };

        return await this.makeApiCall('/api/capacity', payload);
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
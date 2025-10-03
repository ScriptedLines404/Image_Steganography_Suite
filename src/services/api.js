const API_BASE_URL = 'https://steganography-backend-32br.onrender.com';

class SteganographyAPI {
    static async imageToBase64(file) {
        console.log('Converting file to base64:', file.name, file.type, file.size);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const base64 = reader.result.split(',')[1];
                    console.log('Base64 conversion successful, length:', base64.length);
                    resolve(base64);
                } catch (error) {
                    reject(new Error('Failed to process image data'));
                }
            };
            reader.onerror = error => {
                console.error('FileReader error:', error);
                reject(new Error('Failed to read image file'));
            };
            reader.readAsDataURL(file);
        });
    }

    static async base64ToImageUrl(base64String) {
        return `data:image/png;base64,${base64String}`;
    }

    static async makeApiCall(endpoint, payload) {
        console.log('Making API call to:', endpoint, 'Payload size:', JSON.stringify(payload).length);
        
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
                    errorMessage = response.statusText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            console.log('API call successful:', result.success);
            return result;
            
        } catch (error) {
            console.error(`API call error for ${endpoint}:`, error);
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Cannot connect to backend server. Please check if the server is running.');
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
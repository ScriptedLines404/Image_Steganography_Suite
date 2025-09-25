const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class SteganographyAPI {
    static async hideData(technique, imageFile, secretText, encryptionKey = '') {
        const formData = new FormData();
        formData.append('technique', technique);
        formData.append('image', imageFile);
        formData.append('secret_text', secretText);
        if (encryptionKey) {
            formData.append('encryption_key', encryptionKey);
        }

        const response = await fetch(`${API_BASE_URL}/api/hide`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    static async extractData(technique, imageFile, encryptionKey = '') {
        const formData = new FormData();
        formData.append('technique', technique);
        formData.append('image', imageFile);
        if (encryptionKey) {
            formData.append('encryption_key', encryptionKey);
        }

        const response = await fetch(`${API_BASE_URL}/api/extract`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    static async checkCapacity(technique, imageFile) {
        const formData = new FormData();
        formData.append('technique', technique);
        formData.append('image', imageFile);

        const response = await fetch(`${API_BASE_URL}/api/capacity`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    static async healthCheck() {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        return response.json();
    }
}

export default SteganographyAPI;
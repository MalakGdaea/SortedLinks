const API_BASE_URL = 'http://localhost:3012';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    setToken(token) {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    getHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    async register(email, password, name) {
        const response = await fetch(`${this.baseURL}/auth/register`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email, password, name }),
        });
        return this._handleResponse(response);
    }

    async login(email, password) {
        const response = await fetch(`${this.baseURL}/auth/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email, password }),
        });
        const data = await this._handleResponse(response);
        if (data.token) {
            this.setToken(data.token);
        }
        return data;
    }

    async logout() {
        this.setToken(null);
    }


    // Links API
    async getLinks() {
        const response = await fetch(`${this.baseURL}/bookmarks`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async createLink(linkData) {
        const response = await fetch(`${this.baseURL}/bookmarks`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(linkData),
        });
        return this._handleResponse(response);
    }

    async deleteLink(id) {
        const response = await fetch(`${this.baseURL}/bookmarks/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }


    // Space API
    async getSpaces() {
        const response = await fetch(`${this.baseURL}/tabs`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async createSpace(name) {
        const response = await fetch(`${this.baseURL}/tabs/${name}`, {
            method: 'POST',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async deleteSpace(name) {
        const response = await fetch(`${this.baseURL}/tabs/${name}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }


    // Collection API
    async getCollections() {
        const response = await fetch(`${this.baseURL}/categories`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        return this._handleResponse(response);
    }

    async createCollection(spaceId, collectionName) {
        const response = await fetch(`${this.baseURL}/categories/${spaceId}/${collectionName}`, {
            method: 'POST',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async deleteCollection(collectionId) {
        const response = await fetch(`${this.baseURL}/categories/${collectionId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async updateCollection(collectionId, newName) {
        const response = await fetch(`${this.baseURL}/categories/${collectionId}`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify({ name: newName })
        })
        return this._handleResponse(response);
    }

    async _handleResponse(response) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || `HTTP Error: ${response.status}`);
        }
        return data;
    }
}

export default new ApiService();

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

    // Bookmarks
    async getBookmarks() {
        const response = await fetch(`${this.baseURL}/bookmarks`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async createBookmark(title, URL, category, tags, note) {
        const response = await fetch(`${this.baseURL}/bookmarks`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ title, URL, category, tags, note }),
        });
        return this._handleResponse(response);
    }

    async deleteBookmark(id) {
        const response = await fetch(`${this.baseURL}/bookmarks/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    // Tabs
    async getTabs() {
        const response = await fetch(`${this.baseURL}/tabs`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async createTab(name) {
        const response = await fetch(`${this.baseURL}/tabs/${name}`, {
            method: 'POST',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async deleteTab(name) {
        const response = await fetch(`${this.baseURL}/tabs/${name}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    // Categories
    async getCategoriesByTab(tabID) {
        const response = await fetch(`${this.baseURL}/categories/${tabID}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async createCategory(tabID, categoryName) {
        const response = await fetch(`${this.baseURL}/categories/${tabID}/${categoryName}`, {
            method: 'POST',
            headers: this.getHeaders(),
        });
        return this._handleResponse(response);
    }

    async deleteCategory(categoryID) {
        const response = await fetch(`${this.baseURL}/categories/${categoryID}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
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

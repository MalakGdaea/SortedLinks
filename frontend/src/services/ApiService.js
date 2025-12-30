import { SERVER_ROUTE } from "../config";

class ApiService {

    constructor() {
        this.baseURL = SERVER_ROUTE;
        this.isRefreshing = false;
        this.failedQueue = [];
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

    async _request(url, options = {}) {
        const response = await fetch(`${this.baseURL}${url}`, {
            ...options,
            headers: this.getHeaders(),
            credentials: "include",
        });

        // ONLY attempt refresh if it's NOT a login/register attempt
        const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/register');

        if (response.status === 401 && !isAuthRoute) {
            return this._handle401(url, options);
        }

        return this._handleResponse(response);
    }

    async _handle401(url, options) {
        if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
                this.failedQueue.push({ resolve, reject });
            }).then(() => this._request(url, options));
        }

        this.isRefreshing = true;

        try {
            const data = await this.refresh();
            this.setToken(data.accessToken);
            this._processQueue(null);

            return this._request(url, options);
        } catch (err) {
            this._processQueue(err);
            this.clearLocalSession();
            throw err;
        } finally {
            this.isRefreshing = false;
        }
    }

    _processQueue(error) {
        this.failedQueue.forEach((p) =>
            error ? p.reject(error) : p.resolve()
        );
        this.failedQueue = [];
    }

    async refresh() {
        const response = await fetch(`${this.baseURL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        const data = await this._handleResponse(response);
        return data; // { user, accessToken }
    }

    async register(email, password, name) {
        return this._request("/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password, name }),
        });
    }

    async login(email, password) {
        const data = await this._request("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        if (data.accessToken) {
            this.setToken(data.accessToken);
        }

        return data;
    }

    async clearLocalSession() {
        localStorage.clear();
    }

    // Links API
    async getLinks() {
        return this._request("/bookmarks", {
            method: 'GET'
        });
    }

    async createLink(linkData) {
        return this._request("/bookmarks", {
            method: 'POST',
            body: JSON.stringify(linkData),
        });
    }

    async deleteLink(id) {
        return this._request(`/bookmarks/${id}`, {
            method: 'DELETE',
        });
    }

    async updateLink(id, data) {
        return this._request(`/bookmarks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Space API
    async getSpaces() {
        return this._request("/tabs", {
            method: 'GET'
        });
    }

    async createSpace(name) {
        return this._request(`/tabs/${name}`, {
            method: 'POST',
        });
    }

    async deleteSpace(name) {
        return this._request(`/tabs/${name}`, {
            method: 'DELETE',
        });
    }

    async updateSpace(spaceId, newName) {
        return this._request(`/tabs/${spaceId}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: newName })
        });
    }

    // Collection API
    async getCollections() {
        return this._request("/categories", {
            method: 'GET'
        });
    }

    async createCollection(spaceId, collectionName) {
        return this._request(`/categories/${spaceId}/${collectionName}`, {
            method: 'POST',
        });
    }

    async deleteCollection(collectionId) {
        return this._request(`/categories/${collectionId}`, {
            method: 'DELETE',
        });
    }

    async updateCollection(collectionId, newName) {
        return this._request(`/categories/${collectionId}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: newName })
        });
    }

    async _handleResponse(response) {

        const data = await response.json();
        if (!response.ok) {
            const serverMsg = data.message || data.error || data.msg;
            throw new Error(serverMsg || `HTTP Error: ${response.status}`);
        }
        return data;
    }
}

export default new ApiService();

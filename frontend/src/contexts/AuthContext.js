import React, { createContext, useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if token exists on mount
    useEffect(() => {
        const token = ApiService.getToken();
        if (token) {
            setUser({ token });
        }
        setIsLoading(false);
    }, []);

    const register = async (email, password, name) => {
        try {
            setError(null);
            const response = await ApiService.register(email, password, name);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await ApiService.login(email, password);
            setUser({ email, name: response.user?.name });
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await ApiService.logout();
            setUser(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const value = {
        user,
        isLoading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

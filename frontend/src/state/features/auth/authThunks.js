import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../../services/ApiService";

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const response = await ApiService.register(email, password, name);
            return response; // { user, accessToken } 
        } catch (error) {
            return rejectWithValue(error.message || "Registration failed");
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await ApiService.login(email, password);
            return response; // { user, accessToken }
        } catch (error) {
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ApiService.refresh();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
import { createSlice } from "@reduxjs/toolkit";
import { register, initializeAuth, login } from "./authThunks";
import ApiService from "../../../services/ApiService";


const initialState = {
    user: null,
    token: null,
    isLoading: true,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            ApiService.clearLocalSession();
        }
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // LOGIN
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(initializeAuth.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
            })
            .addCase(initializeAuth.rejected, (state, action) => {
                state.user = null;
                state.token = null;
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
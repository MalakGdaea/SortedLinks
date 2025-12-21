import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../../services/ApiService";

export const fetchSpaces = createAsyncThunk(
    'spaces/fetchSpaces',
    async (_, { rejectWithValue }) => {
        try {
            const spaces = await ApiService.getSpaces();
            return spaces;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const createSpace = createAsyncThunk(
    'spaces/createSpaces',
    async (name, { rejectWithValue }) => {
        try {
            const newSpace = await ApiService.createSpace(name);
            return newSpace;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteSpace = createAsyncThunk(
    'spaces/deleteSpace',
    async (spaceId, { rejectWithValue }) => {
        try {
            const response = await ApiService.deleteSpace(spaceId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateSpace = createAsyncThunk(
    'spaces/updateSpace',
    async ({ spaceId, newName }, { rejectWithValue }) => {
        try {
            const response = await ApiService.updateSpace(spaceId, newName);
            return response;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
)
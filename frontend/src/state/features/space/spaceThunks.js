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
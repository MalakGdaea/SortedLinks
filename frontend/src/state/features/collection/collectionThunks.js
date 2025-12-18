import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../../services/ApiService";

export const fetchCollections = createAsyncThunk(
    'collections/fetchCollections',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ApiService.getCollections();
            return response;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
)

export const createCollection = createAsyncThunk(
    'collections/createCollection',
    async ({ spaceId, collectionName }, { rejectWithValue }) => {
        try {
            const response = await ApiService.createCollection(spaceId, collectionName);
            return response;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
)
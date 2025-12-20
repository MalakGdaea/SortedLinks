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

export const updateCollection = createAsyncThunk(
    'collections/updateCollection',
    async ({ collectionId, newName }, { rejectWithValue }) => {
        try {
            const response = await ApiService.updateCollection(collectionId, newName);
            return response;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
)

export const deleteCollection = createAsyncThunk(
    'collections/deleteCollection',
    async ({ collectionId }, { rejectWithValue }) => {
        try {
            const response = await ApiService.deleteCollection(collectionId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
)
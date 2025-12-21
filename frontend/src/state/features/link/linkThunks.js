import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../../services/ApiService";

export const fetchLinks = createAsyncThunk(
    'links/fetchLinks',
    async (_, { rejectWithValue }) => {
        try {
            const links = await ApiService.getLinks();
            return links;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createLink = createAsyncThunk(
    'links/createLink',
    async (linkData, { rejectWithValue }) => {
        try {
            const link = await ApiService.createLink(linkData);
            return link;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateLink = createAsyncThunk(
    'links/updateLink',
    async (updatedDate, { rejectWithValue }) => {
        try {
            const link = await ApiService.updateLink(updatedDate);
            return link;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteLink = createAsyncThunk(
    'links/deleteLink',
    async (linkId, { rejectWithValue }) => {
        try {
            const response = await ApiService.deleteLink(linkId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
)
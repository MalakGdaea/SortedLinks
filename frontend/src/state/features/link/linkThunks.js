import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../../services/ApiService";

export const fetchLinks = createAsyncThunk(
    'link/fetchLinks',
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
    'link/createLink',
    async (linkData, { rejectWithValue }) => {
        try {
            const link = await ApiService.createLink(linkData);
            return link;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
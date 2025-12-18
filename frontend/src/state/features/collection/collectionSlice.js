import { createSlice } from '@reduxjs/toolkit';
import { fetchCollections, createCollection } from './collectionThunks';

const initialState = {
    collections: [],
    currentCollection: null,
    isLoading: false,
    error: null,
};

const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        setCurrentCollection(state, action) {
            state.currentCollection = action.payload;
        }
    }, extraReducers: (builder) => {
        builder
            // fetchCollections
            .addCase(fetchCollections.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCollections.fulfilled, (state, action) => {
                state.isLoading = false;
                state.collections = action.payload;
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // createCollection
            .addCase(createCollection.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCollection.fulfilled, (state, action) => {
                state.isLoading = false;
                state.collections.push(action.payload);
            })
            .addCase(createCollection.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setCurrentCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
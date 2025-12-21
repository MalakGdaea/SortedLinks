import { createSlice } from '@reduxjs/toolkit';
import { fetchCollections, createCollection, updateCollection, deleteCollection } from './collectionThunks';

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
                state.collections.push(action.payload.doc);
            })
            .addCase(createCollection.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // updateCollection
            .addCase(updateCollection.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateCollection.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedCollection = action.payload.doc;
                state.collections = state.collections.map((col) =>
                    col._id === updatedCollection._id ? updatedCollection : col
                );
            })
            .addCase(updateCollection.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            //delete collection
            .addCase(deleteCollection.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCollection.fulfilled, (state, action) => {
                const deletedCollection = action.payload.doc;
                state.isLoading = false;
                state.error = null;
                state.collections = state.collections.filter(
                    (collection) => collection._id !== deletedCollection._id
                );
            })
            .addCase(deleteCollection.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { setCurrentCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
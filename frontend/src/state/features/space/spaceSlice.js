import { createSlice } from '@reduxjs/toolkit';
import { fetchSpaces, createSpace, deleteSpace, updateSpace } from './spaceThunks';

const initialState = {
    currentSpace: null,
    spaces: [],
    isLoading: false,
    error: null,
}

const spaceSlice = createSlice({
    name: 'spaces',
    initialState,
    reducers: {
        setCurrentSpace(state, action) {
            state.currentSpace = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchSpaces
            .addCase(fetchSpaces.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSpaces.fulfilled, (state, action) => {
                state.isLoading = false;
                state.spaces = action.payload;
                state.currentSpace = action.payload.length > 0 ? action.payload[0] : null;
            })
            .addCase(fetchSpaces.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // createSpace
            .addCase(createSpace.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createSpace.fulfilled, (state, action) => {
                state.isLoading = false;
                state.spaces.push(action.payload.doc);
            })
            .addCase(createSpace.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // delete space
            .addCase(deleteSpace.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteSpace.fulfilled, (state, action) => {
                const deletedSpace = action.payload.doc;
                state.isLoading = false;
                state.error = null;
                state.spaces = state.spaces.filter(
                    (space) => space._id !== deletedSpace._id
                );
            })

            //update space
            .addCase(updateSpace.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateSpace.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedSpace = action.payload.doc;
                state.spaces = state.spaces.map((space) =>
                    space._id === updatedSpace._id ? updatedSpace : space
                );
            })
            .addCase(updateSpace.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export const { setCurrentSpace } = spaceSlice.actions;
export default spaceSlice.reducer; 
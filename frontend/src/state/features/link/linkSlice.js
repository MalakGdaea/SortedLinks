import { createSlice } from '@reduxjs/toolkit';
import { fetchLinks, createLink, updateLink, deleteLink } from './linkThunks';

const initialState = {
    links: [],
    loading: false,
    error: null,
}

const linkSlice = createSlice({
    name: 'links',
    initialState,
    extraReducers: (builder) => {
        builder
            // fetchLinks   
            .addCase(fetchLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(fetchLinks.fulfilled, (state, action) => {
                state.loading = false;
                state.links = action.payload;
            })
            .addCase(fetchLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // createLink
            .addCase(createLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLink.fulfilled, (state, action) => {
                state.loading = false;
                state.links.push(action.payload.doc);
            })
            .addCase(createLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // update link
            .addCase(updateLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLink.fulfilled, (state, action) => {
                state.loading = false;
                const updatedLink = action.payload.doc;
                state.links = state.links.map((link) =>
                    link._id === updatedLink._id ? updatedLink : link
                );
            })
            .addCase(updateLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //delete link
            .addCase(deleteLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLink.fulfilled, (state, action) => {
                const deletedLink = action.payload.doc;
                state.loading = false;
                state.error = null;
                state.links = state.links.filter(
                    (link) => link._id !== deletedLink._id
                );
            })
            .addCase(deleteLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default linkSlice.reducer;
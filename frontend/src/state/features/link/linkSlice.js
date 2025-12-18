import { createSlice } from '@reduxjs/toolkit';
import { fetchLinks, createLink } from './linkThunks';

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
            });
    },
});

export default linkSlice.reducer;
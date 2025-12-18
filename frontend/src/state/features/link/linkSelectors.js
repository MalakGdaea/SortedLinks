import { createSelector } from '@reduxjs/toolkit';

export const selectLinks = (state) => state.links.links;

export const selectLinksLoading = (state) => state.links.loading;

export const selectLinksError = (state) => state.links.error;

export const selectLinksByCollectionId = createSelector(
    [selectLinks, (state, collectionId) => collectionId],
    (links, collectionId) => {
        // This output selector only runs if 'links' or 'collectionId' actually change
        return links.filter(link => link.category === collectionId);
    }
);

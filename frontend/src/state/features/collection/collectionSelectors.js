import { createSelector } from 'reselect';

export const selectCollections = state => state.collections.collections;

const selectCurrentSpaceId = state => state.spaces.currentSpace?._id;

export const selectCurrentCollection = (state) => state.collections.currentCollection;

export const selectIsLoading = (state) => state.collections.isLoading;

export const selectError = (state) => state.collections.error;


export const selectCollectionsByCurrentSpace = createSelector(
    [selectCollections, selectCurrentSpaceId],
    (collections, currentSpaceId) => {
        if (!currentSpaceId) return [];
        return collections.filter(
            collection => collection.tab === currentSpaceId
        );
    }
);





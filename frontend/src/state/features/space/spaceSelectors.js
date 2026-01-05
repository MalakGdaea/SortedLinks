export const selectSpaces = (state) => state.spaces.spaces;

export const selectCurrentSpace = (state) => state.spaces.currentSpace;

export const selectIsLoading = (state) => state.spaces.isLoading;

export const selectError = (state) => state.spaces.error;

export const selectSpacesCount = (state) => state.spaces.spaces.length;

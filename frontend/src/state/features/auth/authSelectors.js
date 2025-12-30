
export const isAuthenticated = state => !!state.auth.user && !!state.auth.token
export const isLoading = state => state.auth.isLoading;
export const userSelector = state => state.auth.user;
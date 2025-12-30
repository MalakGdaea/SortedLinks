import { configureStore } from "@reduxjs/toolkit";
import spaceReducer from "./features/space/spaceSlice";
import collectionReducer from "./features/collection/collectionSlice";
import linkReducer from "./features/link/linkSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
    reducer: {
        spaces: spaceReducer,
        collections: collectionReducer,
        links: linkReducer,
        auth: authReducer,
    }
});

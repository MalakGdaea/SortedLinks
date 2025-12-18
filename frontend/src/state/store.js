import { configureStore } from "@reduxjs/toolkit";
import spaceReducer from "./features/space/spaceSlice";
import collectionReducer from "./features/collection/collectionSlice";
import linkReducer from "./features/link/linkSlice";

export const store = configureStore({
    reducer: {
        spaces: spaceReducer,
        collections: collectionReducer,
        links: linkReducer,
    }
});

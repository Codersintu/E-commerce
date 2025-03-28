import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./AuthSlice.js"

export default configureStore({
    reducer: {
        auth: authSliceReducer,
    },
});
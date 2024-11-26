import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartRedux';
import  UserReducer  from "./UserRedux";

export default configureStore({
    reducer: {
        cart: cartReducer,
        user:UserReducer,
    },
});
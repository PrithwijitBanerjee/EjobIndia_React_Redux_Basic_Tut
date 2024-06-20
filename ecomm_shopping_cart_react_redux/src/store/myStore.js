import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../reducers/productsSlice";
import cartReducer from "../reducers/cartSlice";
import registrationReducer from "../reducers/registrationSlice";
import loginReducer from "../reducers/loginSlice";

export const myStore = configureStore({
    reducer: {
        products: productsReducer,
        carts: cartReducer,
        signUp: registrationReducer,
        signIn: loginReducer
    }
});
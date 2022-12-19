import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart-slice";
import productsReducer from "./feature/product-slice";
import CategoriesReducer from "./feature/categories-slice";
import checkoutReducer from "./feature/checkout-slice";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        categories: CategoriesReducer,
        checkout: checkoutReducer

    }
});
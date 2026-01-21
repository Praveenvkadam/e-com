import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import productsReducer from "./slices/productsSlice"; 
import cartReducer from "./slices/cartSlice";
import paymentReducer from "./slices/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    products: productsReducer, 
    cart: cartReducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

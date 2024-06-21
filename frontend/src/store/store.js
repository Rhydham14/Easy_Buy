import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../slice/authSlice";
import cartReducers from "../slice/cartSlice";
const store = configureStore({
  reducer: { 
    auth: authReducers,
    cart: cartReducers
  },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../slice/authSlice";
import cartReducers from "../slice/cartSlice";
import orderReducers from "../slice/orderSlice";
const store = configureStore({
  reducer: { 
    auth: authReducers,
    cart: cartReducers,
    order: orderReducers
  },
});

export default store;
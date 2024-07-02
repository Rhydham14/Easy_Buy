import { createSlice } from "@reduxjs/toolkit";
import {
  SET_PRODUCT,
  GET_PRODUCT,
  REMOVE_PRODUCT,
  EMPTY_PRODUCT,
} from "../service/service";
const initialState = {
  items: Array.isArray(GET_PRODUCT)
    ? GET_PRODUCT.map((item) => ({ ...item, quantity: 1 }))
    : [],
  increment: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const { _id, title, price, images } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ _id, title, price, images, quantity: 1 });
      }
      state.increment = state.items.length;
      SET_PRODUCT(state.items);
    },

    removeFromCart: (state, action) => {
      const _id = action.payload;
      state.items = state.items.filter((item) => item._id !== _id);
      REMOVE_PRODUCT(_id);
    },

    incrementItemQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.items.find((item) => item._id === itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity = (itemToUpdate.quantity || 1) + 1;
      }
    },

    decrementItemQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.items.find((item) => item._id === itemId);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;  
        
      }
    },
    emitCart: () => {
      EMPTY_PRODUCT();
    },

    buyProduct: (state, action) => {
      const status = action.payload;
      console.log("redus status", status);
      if (status === "succeeded") {
        EMPTY_PRODUCT();
      }
    },
  },
});

export const {
  addCart,
  removeFromCart,
  decrementItemQuantity,
  incrementItemQuantity,
  buyProduct,
} = cartSlice.actions;
export default cartSlice.reducer;

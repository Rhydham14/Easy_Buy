import { createSlice } from "@reduxjs/toolkit";
import {
  GET_IS_LOGIN,
  GET_IS_USER,
  SET_IS_LOGIN,
  SET_IS_USER,
  REMOVE_IS_LOGIN,
  REMOVE_IS_USER,
} from "../service/service";
const initialState = {
  isLogin: GET_IS_LOGIN ? GET_IS_LOGIN : false,
  user: GET_IS_USER ? GET_IS_USER : null,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
      state.error = true;
      SET_IS_USER(action.payload);
      SET_IS_LOGIN(true);
    },
    loginFailure: (state, action) => {
      state.isLogin = false;
      state.error = action.payload;
      state.user = null;
      SET_IS_LOGIN(false);
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = null;
      state.error = null;
      REMOVE_IS_USER();
      REMOVE_IS_LOGIN();
    },
    updateProfile: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
      SET_IS_USER(action.payload);
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  decrementItemQuantity,
  incrementItemQuantity,
  updateProfile,
} = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    buystatus : null
}
const order = createSlice({
    name: "order",
    initialState,
    reducers:{

    buyStatus:(state, action) => {
       state.buystatus = action.payload; 
       console.log("buystatus",state.buystatus);
    }
    }
})
export const {
    buyStatus
} = order.actions;
export default order.reducer;
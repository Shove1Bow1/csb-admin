import { createSlice } from "@reduxjs/toolkit";

export const unbanSlice = createSlice({
  name: "notification",
  initialState: {
    value: [],
  },
  reducers: {
    setData: (state, actions) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(actions.payload);
      state.value = actions.payload.reverse();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData } = unbanSlice.actions;
const unbanReducer = unbanSlice.reducer;
export default unbanReducer;

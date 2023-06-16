import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    contact: [],
  },
  reducers: {
    setNotification: (state, actions) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.contact = actions.payload.reverse();
    },
    hide: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotification } = notificationSlice.actions;
const notificationReducer = notificationSlice.reducer;
export default notificationReducer;

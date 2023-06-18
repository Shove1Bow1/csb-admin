import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notification";
import unbanReducer from "./unbanSlice";

export default configureStore({
  reducer: {
    notification: notificationReducer,
    unban: unbanReducer,
  },
});

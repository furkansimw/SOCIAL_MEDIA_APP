import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import postsSlice from "./postsSlice";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    posts: postsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

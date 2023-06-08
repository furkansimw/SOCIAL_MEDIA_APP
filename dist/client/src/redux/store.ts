import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer";
import postsReducer from "./postsReducer";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

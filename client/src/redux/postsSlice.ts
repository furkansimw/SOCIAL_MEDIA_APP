import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPostsSliceInitialState } from "../interfaces/ISlices";

const initialState: IPostsSliceInitialState = {
  posts: [],
  profiles: [],
  back: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;

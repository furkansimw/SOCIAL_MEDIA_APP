import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPost, IPostsSliceInitialState } from "../interfaces/ISlices";
import { posts } from "../api/posts";

const initialState: IPostsSliceInitialState = {
  posts: [],
  profiles: [],
  back: null,
  hasmore: { home: true, explore: true },
  loading: { home: true, explore: true },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(posts.fulfilled, (state, action) => {
      const { explore } = action.meta.arg;
      let newPosts = action.payload as IPost[];
      const { posts } = state;
      newPosts = newPosts.map((newPost) => {
        return { ...newPost, page: explore ? "explore" : "home" };
      });

      let result = [...posts, ...newPosts];
      result = result.sort((a, b) => parseInt(a.created) - parseInt(b.created));

      state.posts = result;
    });
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import type {PayloadAction} from "@reduxjs/toolkit";
import {
  IPost,
  IPostsSliceInitialState,
  IProfile,
} from "../interfaces/ISlices";
import { getImages, getPosts } from "../api/posts.ts";
import { RootState } from "./store.ts";
import { dateR, postsU } from "./functions.ts";

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
  reducers: {
    setBack: (state, action: PayloadAction<string | null>) => {
      state.back = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        const { explore } = action.meta.arg;
        state.loading[explore ? "explore" : "home"] = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const { explore } = action.meta.arg;
        const pageC = (post: IPost) => ({
          ...post,
          page: explore ? "explore" : "home",
        });

        const newPosts = action.payload;
        const { posts } = state;

        const updatedPosts = newPosts.map(pageC);

        const result = posts
          .concat(updatedPosts)
          .sort((a, b) => dateR(b.created) - dateR(a.created));

        state.posts = result;
        state.loading[explore ? "explore" : "home"] = false;
        state.hasmore[explore ? "explore" : "home"] = newPosts.length == 12;
      });

    builder.addCase(getImages.fulfilled, (state, action) => {
      const postid = action.meta.arg;
      const { posts } = state;
      const images = action.payload;
      const obj = (p: IPost) => ({ ...p, images });
      const updatedPosts = postsU(posts, postid, obj);
      state.posts = updatedPosts;
    });
  },
});

export const { setBack } = profileSlice.actions;

export const selectPostsHome = (state: RootState) =>
  state.posts.posts.filter((post) => post.page == "home");

export const selectPostsProfile = (state: RootState, username: string) =>
  state.posts.posts.filter((post) => post.username == username);

export const selectPostsExplore = (state: RootState) =>
  state.posts.posts.filter((post) => post.page == "explore");

export const selectPostsSaved = (state: RootState) =>
  state.posts.posts.filter((post) => post.page == "saved");

export const selectProfile = (state: RootState, username: string) =>
  state.posts.profiles.find((profile) => profile.username == username);

export const selectHasMore = (state: RootState) => state.posts.hasmore;

export const selectLoading = (state: RootState) => state.posts.loading;

export const selectBack = (state: RootState) => state.posts.back;

export const selectCurrentPost = (state: RootState, id: string) =>
  state.posts.posts.find((post) => post.id == id);

export default profileSlice.reducer;

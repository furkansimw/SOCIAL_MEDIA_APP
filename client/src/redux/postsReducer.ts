import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import type {PayloadAction} from "@reduxjs/toolkit";
import {
  IComment,
  IPost,
  IPostsSliceInitialState,
  IProfile,
} from "../interfaces/ISlices.ts";
import {
  createAction,
  createComment,
  getComments,
  getImages,
  getPosts,
  likeComment,
} from "../api/posts.ts";
import { RootState } from "./store.ts";
import { dateR, isFeed, postsU, profileU } from "./functions.ts";

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
          comments: { loading: false, hasmore: true, sending: false, data: [] },
          page: explore ? "explore" : "home",
          isFollowing: !explore,
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

      const obj = (p: IPost) => ({ ...p, images } as IPost);
      const updatedPosts = postsU(posts, postid, obj);
      state.posts = updatedPosts;
    });

    builder
      .addCase(getComments.pending, (state, action) => {
        const { posts, profiles, back } = state;
        const { postid } = action.meta.arg;

        const obj = (po: IPost) =>
          ({
            ...po,
            comments: { ...po.comments, loading: true },
          } as IPost);

        const obj2 = (pr: IProfile) =>
          ({
            ...pr,
            posts: { ...pr.posts, data: postsU(pr.posts.data, postid, obj) },
          } as IProfile);

        if (isFeed(back)) state.posts = postsU(posts, postid, obj);
        else state.profiles = profileU(profiles, back, obj2);
      })
      .addCase(getComments.fulfilled, (state, action) => {
        const { posts, profiles, back } = state;
        const { postid } = action.meta.arg;
        const data = action.payload;

        const dataobj = { data, hasmore: data.length == 12, loading: false };

        const obj = (po: IPost) =>
          ({
            ...po,
            comments: { ...po.comments, ...dataobj },
          } as IPost);

        const obj2 = (pr: IProfile) =>
          ({
            ...pr,
            posts: { ...pr.posts, data: postsU(pr.posts.data, postid, obj) },
          } as IProfile);

        if (isFeed(back)) state.posts = postsU(posts, postid, obj);
        else state.profiles = profileU(profiles, back, obj2);
      });

    builder
      .addCase(createComment.pending, (state, action) => {
        const { posts, profiles, back } = state;
        const { postid } = action.meta.arg;

        const obj = (po: IPost) =>
          ({
            ...po,
            comments: { ...po.comments, sending: true },
          } as IPost);

        const obj2 = (pr: IProfile) =>
          ({
            ...pr,
            posts: { ...pr.posts, data: postsU(pr.posts.data, postid, obj) },
          } as IProfile);

        if (isFeed(back)) state.posts = postsU(posts, postid, obj);
        else state.profiles = profileU(profiles, back, obj2);
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const { posts, profiles, back } = state;
        const { postid, content, id, pp, username } = action.meta.arg;
        const commentid = action.payload;

        const commentobj = {
          content,
          created: Date.now().toString(),
          id: commentid,
          owner: id,
          username,
          pp,
          isliked: false,
          likecount: 0,
          subcommentcount: 0,
          subcomments: { data: [], hasmore: true, loading: false },
        } as IComment;

        const obj = (po: IPost) =>
          ({
            ...po,
            commentcount: po.commentcount + 1,
            comments: {
              ...po.comments,
              data: [commentobj, ...po.comments.data],
              sending: false,
            },
          } as IPost);

        const obj2 = (pr: IProfile) =>
          ({
            ...pr,
            posts: { ...pr.posts, data: postsU(pr.posts.data, postid, obj) },
          } as IProfile);

        if (isFeed(back)) state.posts = postsU(posts, postid, obj);
        else state.profiles = profileU(profiles, back, obj2);
      });

    builder
      .addCase(createAction.pending, (state, action) => {
        const { a, postid, t } = action.meta.arg;
        const { posts, profiles, back } = state;

        const obj = (po: IPost) =>
          ({
            ...po,
            [`is${t}d`]: a,
            likecount: t == "like" ? po.likecount + (a ? 1 : -1) : po.likecount,
          } as IPost);

        const obj2 = (pr: IProfile) =>
          ({
            ...pr,
            posts: { ...pr.posts, data: postsU(pr.posts.data, postid, obj) },
          } as IProfile);

        if (isFeed(back)) state.posts = postsU(posts, postid, obj);
        else state.profiles = profileU(profiles, back, obj2);
      })
      .addCase(createAction.rejected, (state, action) => {
        const { a, postid, t } = action.meta.arg;
        const { posts, profiles, back } = state;

        const obj = (po: IPost) =>
          ({
            ...po,
            [`is${t}d`]: !a,
            likecount:
              t == "like" ? po.likecount + (!a ? 1 : -1) : po.likecount,
          } as IPost);

        const obj2 = (pr: IProfile) =>
          ({
            ...pr,
            posts: { ...pr.posts, data: postsU(pr.posts.data, postid, obj) },
          } as IProfile);

        if (isFeed(back)) state.posts = postsU(posts, postid, obj);
        else state.profiles = profileU(profiles, back, obj2);
      });

    builder
      .addCase(likeComment.pending, (state, action) => {})
      .addCase(likeComment.rejected, (state, action) => {});
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

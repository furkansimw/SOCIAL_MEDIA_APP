import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import type {PayloadAction} from "@reduxjs/toolkit";
import {
  IComment,
  IPost,
  IPostsSliceInitialState,
  IProfile,
  ISubComment,
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

export const postsSlice = createSlice({
  name: "posts",
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
        const data = action.payload.map((ap) => ({
          ...ap,
          subcomments: { ...ap.subcomments, data: [] },
        })) as IComment[];

        const comments = { data, hasmore: data.length == 12, loading: false };

        const obj = (po: IPost) => ({ ...po, comments } as IPost);

        const obj2 = (pr: IProfile) =>
          ({
            ...pr,
            posts: { ...pr.posts, data: postsU(pr.posts.data, postid, obj) },
          } as IProfile);

        if (isFeed(back)) state.posts = postsU(posts, postid, obj);
        else state.profiles = profileU(profiles, back, obj2);
        console.log(state.posts.find((p) => p.id == postid));
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
        const {
          postid,
          content,
          id: owner,
          pp,
          username,
          commentid,
        } = action.meta.arg;

        const uploadedCommentId = action.payload;
        const created = new Date(Date.now()).toString();

        const commentobj: IComment = {
          content,
          created,
          id: uploadedCommentId,
          owner,
          username,
          pp,
          isliked: false,
          likecount: 0,
          subcommentcount: 0,
          subcomments: { data: [], hasmore: true, loading: false },
        };

        const subCommentObj: ISubComment = {
          content,
          created,
          owner,
          id: uploadedCommentId,
          isliked: false,
          likecount: 0,
          pp,
          username,
        };

        const obj = (po: IPost) =>
          ({
            ...po,
            commentcount: po.commentcount + (commentid ? 0 : 1),
            comments: {
              ...po.comments,
              sending: false,
              data: commentid
                ? po.comments.data.map((sc) => {
                    if (sc.id == commentid)
                      return {
                        ...sc,
                        subcommentcount: sc.subcommentcount + 1,
                        subcomments: {
                          ...sc.subcomments,
                          data: [...sc.subcomments.data, subCommentObj],
                        },
                      };
                    return sc;
                  })
                : [...po.comments.data, commentobj],
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
      .addCase(likeComment.pending, (state, action) => {
        const { a, postid, commentid, subcommentid } = action.meta.arg;
        const { posts, profiles, back } = state;

        const obj3 = (data: IComment[]) =>
          data.map((d) => {
            if (d.id == commentid) {
              if (subcommentid)
                return {
                  ...d,
                  subcomments: {
                    ...d.subcomments,
                    data: d.subcomments.data.map((sc) => ({
                      ...sc,
                      likecount: sc.likecount + (a ? 1 : -1),
                      isliked: a,
                    })),
                  },
                };
              return {
                ...d,
                isliked: a,
                likecount: d.likecount + (a ? 1 : -1),
              };
            }
            return d;
          }) as IComment[];

        const obj = (po: IPost) =>
          ({
            ...po,
            comments: { ...po.comments, data: obj3(po.comments.data) },
          } as IPost);

        const obj2 = (pr: IProfile) =>
          ({
            ...pr,
            posts: { ...pr.posts, data: postsU(pr.posts.data, postid, obj) },
          } as IProfile);

        if (isFeed(back)) state.posts = postsU(posts, postid, obj);
        else state.profiles = profileU(profiles, back, obj2);
      })
      .addCase(likeComment.rejected, (state, action) => {
        const { a, postid, commentid, subcommentid } = action.meta.arg;
        const { posts, profiles, back } = state;

        const obj3 = (data: IComment[]) =>
          data.map((d) => {
            if (d.id == commentid) {
              if (subcommentid)
                return {
                  ...d,
                  subcomments: {
                    ...d.subcomments,
                    data: d.subcomments.data.map((sc) => ({
                      ...sc,
                      likecount: sc.likecount + (!a ? 1 : -1),
                      isliked: !a,
                    })),
                  },
                };
              return {
                ...d,
                isliked: !a,
                likecount: d.likecount + (!a ? 1 : -1),
              };
            }
            return d;
          }) as IComment[];

        const obj = (po: IPost) =>
          ({
            ...po,
            comments: { ...po.comments, data: obj3(po.comments.data) },
          } as IPost);

        const obj2 = (pr: IProfile) =>
          ({
            ...pr,
            posts: { ...pr.posts, data: postsU(pr.posts.data, postid, obj) },
          } as IProfile);

        if (isFeed(back)) state.posts = postsU(posts, postid, obj);
        else state.profiles = profileU(profiles, back, obj2);
      });
  },
});

export const { setBack } = postsSlice.actions;

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

export default postsSlice.reducer;
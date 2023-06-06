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
  removePost,
} from "../api/posts.ts";
import { RootState } from "./store.ts";
import { commentsU, dateR, postsU, profileU } from "./functions.ts";
import {
  blockUser,
  followUser,
  getProfile,
  getProfilePosts,
} from "../api/profile.ts";
import socket from "../api/socket/socket.ts";

const initialState: IPostsSliceInitialState = {
  posts: [],
  profiles: [],
  back: null,
  hasmore: { home: true, explore: true },
  loading: { home: true, explore: true },
  offset: { home: 0, explore: 0 },
  currentId: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setBack: (state, action: PayloadAction<string | null>) => {
      state.back = action.payload;
    },
    toggleSubCommetsT: (
      state,
      action: PayloadAction<{
        postid: string;
        commentid: string;
        t: boolean;
      }>
    ) => {
      const { postid, commentid, t } = action.payload;
      const { posts } = state;

      const obj2 = (comments: IComment[]) => ({
        data: comments.map((c) => {
          if (c.id == commentid)
            return { ...c, subcomments: { ...c.subcomments, t } } as IComment;
          return c;
        }),
      });

      const obj = (post: IPost) =>
        ({
          ...post,
          comments: { ...post.comments, ...obj2(post.comments.data) },
        } as IPost);

      state.posts = postsU(posts, postid, obj);
    },
    setCurrentPostId: (state, action: PayloadAction<string | null>) => {
      state.currentId = action.payload;
    },
    setOffset: (
      state,
      action: PayloadAction<{ offset: number; page: string }>
    ) => {
      const { offset, page } = action.payload;
      const { profiles } = state;
      if (["home", "explore"].includes(page)) {
        state.offset[page == "home" ? "home" : "explore"] = offset;
      } else {
        const obj = (profile: IProfile): IProfile => ({
          ...profile,
          info: profile.info ? { ...profile.info, offset } : undefined,
        });

        state.profiles = profileU(profiles, page, obj);
      }
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
        const { posts } = state;
        const { postid, commentid: ci } = action.meta.arg;

        const obj = (post: IPost): IPost => {
          if (ci) {
            return {
              ...post,
              comments: {
                ...post.comments,
                data: post.comments.data.map((c) => {
                  if (c.id == ci)
                    return {
                      ...c,
                      subcomments: { ...c.subcomments, loading: true },
                    };
                  return c;
                }),
              },
            };
          } else
            return { ...post, comments: { ...post.comments, loading: true } };
        };

        state.posts = postsU(posts, postid, obj);
      })
      .addCase(getComments.fulfilled, (state, action) => {
        const { posts } = state;
        const { postid, commentid: ci } = action.meta.arg;

        const payload: any = action.payload;
        const hasmore = payload.length == 12;
        const loading = false;

        const ddd = (c: ISubComment[]) => {
          const xd = [...c, ...payload]
            .filter((x) => x.s == undefined)
            .sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            );
          const xds = c
            .filter((x) => x.s)
            .sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            );

          return xd.concat(xds);
        };

        const obj = (post: IPost): IPost => {
          if (ci) {
            return {
              ...post,
              comments: {
                ...post.comments,
                data: commentsU(post.comments.data, ci, (c) => ({
                  ...c,
                  subcomments: {
                    ...c.subcomments,
                    loading,
                    t: !(
                      hasmore &&
                      c.subcomments.data.length + payload.length !=
                        c.subcommentcount
                    ),
                    hasmore:
                      hasmore &&
                      c.subcomments.data.length + payload.length !=
                        c.subcommentcount,
                    data: ddd(c.subcomments.data),
                  },
                })),
              },
            };
          } else {
            return {
              ...post,
              comments: {
                ...post.comments,
                loading: false,
                hasmore,
                data: [
                  ...post.comments.data,
                  ...payload.map((p: any) => ({
                    ...p,
                    subcomments: {
                      data: [],
                      hasmore: p.subcommentcount != 0,
                      t: false,
                      loading: false,
                    },
                  })),
                ],
              },
            };
          }
        };

        state.posts = postsU(posts, postid, obj);
      });

    builder
      .addCase(createComment.pending, (state, action) => {
        const { posts } = state;
        const { postid } = action.meta.arg;

        const obj = (po: IPost): IPost => ({
          ...po,
          comments: { ...po.comments, sending: true },
        });
        state.posts = postsU(posts, postid, obj);
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const { posts } = state;
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
          subcomments: {
            data: [],
            hasmore: false,
            loading: false,
            t: false,
          },
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
          s: true,
        };

        const obj = (po: IPost): IPost => ({
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
                        t: true,
                        data: [...sc.subcomments.data, subCommentObj],
                      },
                    };
                  return sc;
                })
              : [commentobj, ...po.comments.data],
          },
        });

        state.posts = postsU(posts, postid, obj);
      });

    builder
      .addCase(createAction.pending, (state, action) => {
        const { a, postid, t } = action.meta.arg;
        const { posts } = state;

        const obj = (po: IPost) =>
          ({
            ...po,
            [`is${t}d`]: a,
            likecount: t == "like" ? po.likecount + (a ? 1 : -1) : po.likecount,
          } as IPost);

        state.posts = postsU(posts, postid, obj);
      })
      .addCase(createAction.rejected, (state, action) => {
        const { a, postid, t } = action.meta.arg;
        const { posts } = state;

        const obj = (po: IPost) =>
          ({
            ...po,
            [`is${t}d`]: !a,
            likecount:
              t == "like" ? po.likecount + (!a ? 1 : -1) : po.likecount,
          } as IPost);

        state.posts = postsU(posts, postid, obj);
      });

    builder
      .addCase(likeComment.pending, (state, action) => {
        const { a, postid, commentid, subcommentid } = action.meta.arg;
        const { posts } = state;

        const obj3 = (data: IComment[]) =>
          data.map((d) => {
            if (d.id == commentid) {
              if (subcommentid)
                return {
                  ...d,
                  subcomments: {
                    ...d.subcomments,
                    data: d.subcomments.data.map((sc) => {
                      if (sc.id == subcommentid)
                        return {
                          ...sc,
                          likecount: sc.likecount + (a ? 1 : -1),
                          isliked: a,
                        };
                      return sc;
                    }),
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

        state.posts = postsU(posts, postid, obj);
      })
      .addCase(likeComment.rejected, (state, action) => {
        const { a, postid, commentid, subcommentid } = action.meta.arg;
        const { posts } = state;

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

        state.posts = postsU(posts, postid, obj);
      });

    builder
      .addCase(getProfile.pending, (state, action) => {
        const username = action.meta.arg;
        const { profiles } = state;
        const obj = { loading: true, username };
        state.profiles = [...profiles, obj];
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const username = action.meta.arg;
        const info: any = action.payload;
        const { profiles } = state;

        const obj = (p: IProfile): IProfile => ({
          ...p,
          loading: false,
          username,
          info,
        });
        state.profiles = profileU(profiles, username, obj);
      })
      .addCase(getProfile.rejected, (state, action) => {
        const username = action.meta.arg;
        const { profiles } = state;

        const obj = (p: IProfile): IProfile => ({
          ...p,
          loading: false,
          exists: false,
        });

        state.profiles = profileU(profiles, username, obj);
      });

    builder
      .addCase(getProfilePosts.pending, (state, action) => {
        const { profiles } = state;
        const { username } = action.meta.arg;
        const postsState = { loading: true, hasmore: true };
        const obj = (p: IProfile): IProfile => ({ ...p, postsState });
        state.profiles = profileU(profiles, username, obj);
      })
      .addCase(getProfilePosts.fulfilled, (state, action) => {
        const { profiles, posts } = state;

        const { username } = action.meta.arg;
        const payload: IPost[] = (action.payload as IPost[]).map(
          (p: IPost) => ({
            ...p,
            page: username,
            comments: {
              data: [],
              hasmore: true,
              loading: false,
              sending: false,
            },
          })
        );

        const postsState = { loading: false, hasmore: payload.length == 12 };

        const obj = (p: IProfile): IProfile => ({ ...p, postsState });
        state.posts = [...posts, ...payload];

        state.profiles = profileU(profiles, username, obj);
      })
      .addCase(getProfilePosts.rejected, (state, action) => {
        const { profiles } = state;
        const { username } = action.meta.arg;
        const postsState = { loading: false, hasmore: false };
        const obj = (p: IProfile): IProfile => ({ ...p, postsState });
        state.profiles = profileU(profiles, username, obj);
      });
    builder.addCase(followUser.pending, (state, action) => {
      const { profiles, posts } = state;
      const { userid, a } = action.meta.arg;
      const ispublic = profiles.find((p) => p.info?.id == userid)?.info
        ?.ispublic!;
      if (!ispublic && !a) state.posts = posts.filter((p) => p.owner != userid);

      state.profiles = profiles.map((p) => {
        if (p.info?.id == userid)
          return {
            ...p,
            info: {
              ...p.info,
              status: a ? (ispublic ? 0 : 1) : null,
              followercount:
                p.info.followercount + (a ? (ispublic ? 1 : 0) : -1),
            },
          };
        else return p;
      });
    });

    builder
      .addCase(blockUser.pending, (state, action) => {
        const { a, userid } = action.meta.arg;
        const { profiles } = state;
        state.profiles = profiles.map((p) => {
          if (p.info?.id == userid)
            return {
              ...p,
              info: p.info ? { ...p.info, status: a ? 2 : null } : undefined,
            };
          return p;
        });
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const { userid, a } = action.meta.arg;
        const { posts, profiles } = state;
        const username = profiles.find((p) => p.info?.id == userid)!.username;
        if (a)
          state.posts = posts.filter(
            (p) => p.page != username || p.owner != userid
          );
      })
      .addCase(blockUser.rejected, (state, action) => {
        const { a, userid } = action.meta.arg;
        const { profiles } = state;
        state.profiles = profiles.map((p) => {
          if (p.info?.id == userid)
            return {
              ...p,
              info: p.info ? { ...p.info, status: !a ? 2 : null } : undefined,
            };
          return p;
        });
      });
    builder.addCase(removePost.fulfilled, (state, action) => {
      const postid = action.meta.arg;
      const { profiles, posts } = state;
      state.currentId = null;
      state.back = null;
      const username = state.posts.find((p) => p.id == postid)!.username;

      state.profiles = profiles.map((p) => {
        if (p.username == username)
          return {
            ...p,
            info: { ...p!.info!, postcount: p!.info!.postcount - 1 },
          };
        return p;
      });

      state.posts = posts.filter((p) => p.id != postid);
    });
  },
});

export const { setBack, toggleSubCommetsT, setCurrentPostId, setOffset } =
  postsSlice.actions;

export const selectPostsHome = (state: RootState) =>
  state.posts.posts.filter((post) => post.page == "home");

export const selectPostsProfile = (state: RootState, username: string) =>
  state.posts.posts.filter((post) => post.page == username);

export const selectPostsExplore = (state: RootState) =>
  state.posts.posts.filter((post) => post.page == "explore");

export const selectPostsSaved = (state: RootState) =>
  state.posts.posts.filter((post) => post.page == "saved");

export const selectProfile = (state: RootState, username: string) =>
  state.posts.profiles.find((profile) => profile.username == username)!;

export const selectBack = (state: RootState) => state.posts.back;

export const selectCurrentPost = (state: RootState) =>
  state.posts.posts.find((post) => post.id == state.posts.currentId)!;

export const selectpostsForBack = (state: RootState) =>
  state.posts.posts.filter((post) => post.page == state.posts.back);

export const selectMetaData = (state: RootState) => ({
  hasmore: state.posts.hasmore,
  loading: state.posts.loading,
  offset: state.posts.offset,
});

export default postsSlice.reducer;

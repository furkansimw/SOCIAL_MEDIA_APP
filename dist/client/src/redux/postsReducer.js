"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectMetaData = exports.selectpostsForBack = exports.selectCurrentPostP = exports.selectCurrentPost = exports.selectBack = exports.selectProfile = exports.selectPostsSaved = exports.selectPostsExplore = exports.selectPostsProfile = exports.selectPostsHome = exports.selectCurrentId = exports.setOffset = exports.setCurrentPostId = exports.toggleSubCommetsT = exports.setBack = exports.postsSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const posts_ts_1 = require("../api/posts.ts");
const functions_ts_1 = require("./functions.ts");
const profile_ts_1 = require("../api/profile.ts");
const initialState = {
    posts: [],
    profiles: [],
    back: null,
    hasmore: { home: true, explore: true },
    loading: { home: true, explore: true },
    offset: { home: 0, explore: 0 },
    currentId: null,
};
exports.postsSlice = (0, toolkit_1.createSlice)({
    name: "posts",
    initialState,
    reducers: {
        setBack: (state, action) => {
            state.back = action.payload;
        },
        toggleSubCommetsT: (state, action) => {
            const { postid, commentid, t } = action.payload;
            const { posts } = state;
            const obj2 = (comments) => ({
                data: comments.map((c) => {
                    if (c.id == commentid)
                        return Object.assign(Object.assign({}, c), { subcomments: Object.assign(Object.assign({}, c.subcomments), { t }) });
                    return c;
                }),
            });
            const obj = (post) => (Object.assign(Object.assign({}, post), { comments: Object.assign(Object.assign({}, post.comments), obj2(post.comments.data)) }));
            state.posts = (0, functions_ts_1.postsU)(posts, postid, obj);
        },
        setCurrentPostId: (state, action) => {
            state.currentId = action.payload;
        },
        setOffset: (state, action) => {
            const { offset, page } = action.payload;
            const { profiles } = state;
            if (["home", "explore"].includes(page)) {
                state.offset[page == "home" ? "home" : "explore"] = offset;
            }
            else {
                const obj = (profile) => (Object.assign(Object.assign({}, profile), { info: profile.info ? Object.assign(Object.assign({}, profile.info), { offset }) : undefined }));
                state.profiles = (0, functions_ts_1.profileU)(profiles, page, obj);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(posts_ts_1.getPosts.pending, (state, action) => {
            const { explore } = action.meta.arg;
            state.loading[explore ? "explore" : "home"] = true;
        })
            .addCase(posts_ts_1.getPosts.fulfilled, (state, action) => {
            const { explore } = action.meta.arg;
            const pageC = (post) => (Object.assign(Object.assign({}, post), { comments: { loading: false, hasmore: true, sending: false, data: [] }, page: explore ? "explore" : "home", isFollowing: !explore }));
            const newPosts = action.payload;
            const { posts } = state;
            const updatedPosts = newPosts.map(pageC);
            const result = posts
                .concat(updatedPosts)
                .sort((a, b) => (0, functions_ts_1.dateR)(b.created) - (0, functions_ts_1.dateR)(a.created));
            state.posts = result;
            state.loading[explore ? "explore" : "home"] = false;
            state.hasmore[explore ? "explore" : "home"] = newPosts.length == 12;
        });
        builder.addCase(posts_ts_1.getImages.fulfilled, (state, action) => {
            const postid = action.meta.arg;
            const { posts } = state;
            const images = action.payload;
            const obj = (p) => (Object.assign(Object.assign({}, p), { images }));
            const updatedPosts = (0, functions_ts_1.postsU)(posts, postid, obj);
            state.posts = updatedPosts;
        });
        builder
            .addCase(posts_ts_1.getComments.pending, (state, action) => {
            const { posts } = state;
            const { postid, commentid: ci } = action.meta.arg;
            const obj = (post) => {
                if (ci) {
                    return Object.assign(Object.assign({}, post), { comments: Object.assign(Object.assign({}, post.comments), { data: post.comments.data.map((c) => {
                                if (c.id == ci)
                                    return Object.assign(Object.assign({}, c), { subcomments: Object.assign(Object.assign({}, c.subcomments), { loading: true }) });
                                return c;
                            }) }) });
                }
                else
                    return Object.assign(Object.assign({}, post), { comments: Object.assign(Object.assign({}, post.comments), { loading: true }) });
            };
            state.posts = (0, functions_ts_1.postsU)(posts, postid, obj);
        })
            .addCase(posts_ts_1.getComments.fulfilled, (state, action) => {
            const { posts } = state;
            const { postid, commentid: ci } = action.meta.arg;
            const payload = action.payload;
            const hasmore = payload.length == 12;
            const loading = false;
            const ddd = (c) => {
                const xd = [...c, ...payload]
                    .filter((x) => x.s == undefined)
                    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
                const xds = c
                    .filter((x) => x.s)
                    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
                return xd.concat(xds);
            };
            const obj = (post) => {
                if (ci) {
                    return Object.assign(Object.assign({}, post), { comments: Object.assign(Object.assign({}, post.comments), { data: (0, functions_ts_1.commentsU)(post.comments.data, ci, (c) => (Object.assign(Object.assign({}, c), { subcomments: Object.assign(Object.assign({}, c.subcomments), { loading, t: !(hasmore &&
                                        c.subcomments.data.length + payload.length !=
                                            c.subcommentcount), hasmore: hasmore &&
                                        c.subcomments.data.length + payload.length !=
                                            c.subcommentcount, data: ddd(c.subcomments.data) }) }))) }) });
                }
                else {
                    return Object.assign(Object.assign({}, post), { comments: Object.assign(Object.assign({}, post.comments), { loading: false, hasmore, data: [
                                ...post.comments.data,
                                ...payload.map((p) => (Object.assign(Object.assign({}, p), { subcomments: {
                                        data: [],
                                        hasmore: p.subcommentcount != 0,
                                        t: false,
                                        loading: false,
                                    } }))),
                            ] }) });
                }
            };
            state.posts = (0, functions_ts_1.postsU)(posts, postid, obj);
        });
        builder
            .addCase(posts_ts_1.createComment.pending, (state, action) => {
            const { posts } = state;
            const { postid } = action.meta.arg;
            const obj = (po) => (Object.assign(Object.assign({}, po), { comments: Object.assign(Object.assign({}, po.comments), { sending: true }) }));
            state.posts = (0, functions_ts_1.postsU)(posts, postid, obj);
        })
            .addCase(posts_ts_1.createComment.fulfilled, (state, action) => {
            const { posts } = state;
            const { postid, content, id: owner, pp, username, commentid, } = action.meta.arg;
            const uploadedCommentId = action.payload;
            const created = new Date(Date.now()).toString();
            const commentobj = {
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
            const subCommentObj = {
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
            const obj = (po) => (Object.assign(Object.assign({}, po), { commentcount: po.commentcount + (commentid ? 0 : 1), comments: Object.assign(Object.assign({}, po.comments), { sending: false, data: commentid
                        ? po.comments.data.map((sc) => {
                            if (sc.id == commentid)
                                return Object.assign(Object.assign({}, sc), { subcommentcount: sc.subcommentcount + 1, subcomments: Object.assign(Object.assign({}, sc.subcomments), { t: true, data: [...sc.subcomments.data, subCommentObj] }) });
                            return sc;
                        })
                        : [commentobj, ...po.comments.data] }) }));
            state.posts = (0, functions_ts_1.postsU)(posts, postid, obj);
        });
        builder
            .addCase(posts_ts_1.createAction.pending, (state, action) => {
            const { a, postid, t } = action.meta.arg;
            const { posts } = state;
            const obj = (po) => (Object.assign(Object.assign({}, po), { [`is${t}d`]: a, likecount: t == "like" ? po.likecount + (a ? 1 : -1) : po.likecount }));
            state.posts = (0, functions_ts_1.postsU)(posts, postid, obj);
        })
            .addCase(posts_ts_1.createAction.rejected, (state, action) => {
            const { a, postid, t } = action.meta.arg;
            const { posts } = state;
            const obj = (po) => (Object.assign(Object.assign({}, po), { [`is${t}d`]: !a, likecount: t == "like" ? po.likecount + (!a ? 1 : -1) : po.likecount }));
            state.posts = (0, functions_ts_1.postsU)(posts, postid, obj);
        });
        builder
            .addCase(posts_ts_1.likeComment.pending, (state, action) => {
            const { a, postid, commentid, subcommentid } = action.meta.arg;
            const { posts } = state;
            const obj3 = (data) => data.map((d) => {
                if (d.id == commentid) {
                    if (subcommentid)
                        return Object.assign(Object.assign({}, d), { subcomments: Object.assign(Object.assign({}, d.subcomments), { data: d.subcomments.data.map((sc) => {
                                    if (sc.id == subcommentid)
                                        return Object.assign(Object.assign({}, sc), { likecount: sc.likecount + (a ? 1 : -1), isliked: a });
                                    return sc;
                                }) }) });
                    return Object.assign(Object.assign({}, d), { isliked: a, likecount: d.likecount + (a ? 1 : -1) });
                }
                return d;
            });
            const obj = (po) => (Object.assign(Object.assign({}, po), { comments: Object.assign(Object.assign({}, po.comments), { data: obj3(po.comments.data) }) }));
            state.posts = (0, functions_ts_1.postsU)(posts, postid, obj);
        })
            .addCase(posts_ts_1.likeComment.rejected, (state, action) => {
            const { a, postid, commentid, subcommentid } = action.meta.arg;
            const { posts } = state;
            const obj3 = (data) => data.map((d) => {
                if (d.id == commentid) {
                    if (subcommentid)
                        return Object.assign(Object.assign({}, d), { subcomments: Object.assign(Object.assign({}, d.subcomments), { data: d.subcomments.data.map((sc) => (Object.assign(Object.assign({}, sc), { likecount: sc.likecount + (!a ? 1 : -1), isliked: !a }))) }) });
                    return Object.assign(Object.assign({}, d), { isliked: !a, likecount: d.likecount + (!a ? 1 : -1) });
                }
                return d;
            });
            const obj = (po) => (Object.assign(Object.assign({}, po), { comments: Object.assign(Object.assign({}, po.comments), { data: obj3(po.comments.data) }) }));
            state.posts = (0, functions_ts_1.postsU)(posts, postid, obj);
        });
        builder
            .addCase(profile_ts_1.getProfile.pending, (state, action) => {
            const username = action.meta.arg;
            const { profiles } = state;
            const obj = { loading: true, username };
            state.profiles = [...profiles, obj];
        })
            .addCase(profile_ts_1.getProfile.fulfilled, (state, action) => {
            const username = action.meta.arg;
            const info = action.payload;
            const { profiles } = state;
            const obj = (p) => (Object.assign(Object.assign({}, p), { loading: false, username,
                info }));
            state.profiles = (0, functions_ts_1.profileU)(profiles, username, obj);
        })
            .addCase(profile_ts_1.getProfile.rejected, (state, action) => {
            const username = action.meta.arg;
            const { profiles } = state;
            const obj = (p) => (Object.assign(Object.assign({}, p), { loading: false, exists: false }));
            state.profiles = (0, functions_ts_1.profileU)(profiles, username, obj);
        });
        builder
            .addCase(profile_ts_1.getProfilePosts.pending, (state, action) => {
            const { profiles } = state;
            const { username } = action.meta.arg;
            const postsState = { loading: true, hasmore: true };
            const obj = (p) => (Object.assign(Object.assign({}, p), { postsState }));
            state.profiles = (0, functions_ts_1.profileU)(profiles, username, obj);
        })
            .addCase(profile_ts_1.getProfilePosts.fulfilled, (state, action) => {
            const { profiles, posts } = state;
            const { username } = action.meta.arg;
            const payload = action.payload.map((p) => (Object.assign(Object.assign({}, p), { page: username, comments: {
                    data: [],
                    hasmore: true,
                    loading: false,
                    sending: false,
                } })));
            const postsState = { loading: false, hasmore: payload.length == 12 };
            const obj = (p) => (Object.assign(Object.assign({}, p), { postsState }));
            state.posts = [...posts, ...payload];
            state.profiles = (0, functions_ts_1.profileU)(profiles, username, obj);
        })
            .addCase(profile_ts_1.getProfilePosts.rejected, (state, action) => {
            const { profiles } = state;
            const { username } = action.meta.arg;
            const postsState = { loading: false, hasmore: false };
            const obj = (p) => (Object.assign(Object.assign({}, p), { postsState }));
            state.profiles = (0, functions_ts_1.profileU)(profiles, username, obj);
        });
        builder.addCase(profile_ts_1.followUser.pending, (state, action) => {
            var _a, _b, _c, _d;
            const { profiles, posts, back } = state;
            const { userid, a } = action.meta.arg;
            const ispublic = (_b = (_a = profiles.find((p) => { var _a; return ((_a = p.info) === null || _a === void 0 ? void 0 : _a.id) == userid; })) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.ispublic;
            if (!ispublic && !a)
                state.posts = posts.filter((p) => p.owner != userid);
            state.profiles = profiles.map((p) => {
                var _a;
                if (((_a = p.info) === null || _a === void 0 ? void 0 : _a.id) == userid)
                    return Object.assign(Object.assign({}, p), { info: Object.assign(Object.assign({}, p.info), { status: a ? (ispublic ? 0 : 1) : null, followercount: p.info.followercount +
                                (a
                                    ? ispublic
                                        ? 1
                                        : 0
                                    : ispublic
                                        ? -1
                                        : p.info.status == 1
                                            ? 0
                                            : ispublic
                                                ? -1
                                                : 0) }) });
                else
                    return p;
            });
            const isfollowing = ((_d = (_c = state.profiles.find((p) => { var _a; return ((_a = p === null || p === void 0 ? void 0 : p.info) === null || _a === void 0 ? void 0 : _a.id) == userid; })) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.status) == 0;
            state.posts = posts.map((p) => {
                if (p.owner == userid)
                    return Object.assign(Object.assign({}, p), { isfollowing });
                return p;
            });
        });
        builder
            .addCase(profile_ts_1.blockUser.pending, (state, action) => {
            const { a, userid } = action.meta.arg;
            const { profiles } = state;
            state.profiles = profiles.map((p) => {
                var _a;
                if (((_a = p.info) === null || _a === void 0 ? void 0 : _a.id) == userid)
                    return Object.assign(Object.assign({}, p), { info: p.info ? Object.assign(Object.assign({}, p.info), { status: a ? 2 : null }) : undefined });
                return p;
            });
        })
            .addCase(profile_ts_1.blockUser.fulfilled, (state, action) => {
            const { userid, a } = action.meta.arg;
            const { posts, profiles } = state;
            const username = profiles.find((p) => { var _a; return ((_a = p.info) === null || _a === void 0 ? void 0 : _a.id) == userid; }).username;
            if (a)
                state.posts = posts.filter((p) => p.page != username || p.owner != userid);
        })
            .addCase(profile_ts_1.blockUser.rejected, (state, action) => {
            const { a, userid } = action.meta.arg;
            const { profiles } = state;
            state.profiles = profiles.map((p) => {
                var _a;
                if (((_a = p.info) === null || _a === void 0 ? void 0 : _a.id) == userid)
                    return Object.assign(Object.assign({}, p), { info: p.info ? Object.assign(Object.assign({}, p.info), { status: !a ? 2 : null }) : undefined });
                return p;
            });
        });
        builder.addCase(posts_ts_1.removePost.fulfilled, (state, action) => {
            const postid = action.meta.arg;
            const { profiles, posts } = state;
            state.currentId = null;
            state.back = null;
            const username = state.posts.find((p) => p.id == postid).username;
            state.profiles = profiles.map((p) => {
                if (p.username == username)
                    return Object.assign(Object.assign({}, p), { info: Object.assign(Object.assign({}, p.info), { postcount: p.info.postcount - 1 }) });
                return p;
            });
            state.posts = posts.filter((p) => p.id != postid);
        });
        builder.addCase(posts_ts_1.deleteComment.pending, (state, action) => {
            const { commentid, postid, subcommentid } = action.meta.arg;
            const { posts } = state;
            const comments = (data) => {
                if (subcommentid) {
                    const a = data.map((xd) => {
                        if (xd.id == commentid) {
                            const data = xd.subcomments.data.filter((_) => _.id != subcommentid);
                            const c = Object.assign(Object.assign({}, xd), { subcommentcount: xd.subcommentcount - 1, subcomments: Object.assign(Object.assign({}, xd.subcomments), { data }) });
                            return c;
                        }
                        return xd;
                    });
                    return a;
                }
                else
                    return data.filter((c) => c.id != commentid);
            };
            state.posts = posts.map((post) => {
                if (post.id == postid)
                    return Object.assign(Object.assign({}, post), { comments: Object.assign(Object.assign({}, post.comments), { data: comments(post.comments.data) }) });
                return post;
            });
        });
        builder
            .addCase(posts_ts_1.getPost.pending, (state, action) => {
            const { posts } = state;
            const id = action.meta.arg;
            const post = {
                isfollowing: false,
                owner: "",
                username: "",
                created: "",
                id,
                pp: null,
                content: null,
                likecount: 0,
                commentcount: 0,
                isliked: false,
                issaved: false,
                page: "page",
                exists: "loading",
                comments: {
                    loading: false,
                    hasmore: false,
                    sending: false,
                    data: [],
                },
            };
            state.posts = [...posts, post];
        })
            .addCase(posts_ts_1.getPost.fulfilled, (state, action) => {
            const { posts } = state;
            const data = action.payload;
            const postid = action.meta.arg;
            console.log(postid);
            state.posts = posts.map((p) => {
                if (p.id == postid) {
                    const obj = Object.assign(Object.assign({}, Object.assign(Object.assign({}, p), { exists: undefined })), data);
                    return obj;
                }
                return p;
            });
        })
            .addCase(posts_ts_1.getPost.rejected, (state, action) => {
            const postid = action.meta.arg;
            const { posts } = state;
            state.posts = posts.map((p) => {
                if (p.id == postid)
                    return Object.assign(Object.assign({}, p), { exists: "not-found" });
                return p;
            });
        });
    },
});
_a = exports.postsSlice.actions, exports.setBack = _a.setBack, exports.toggleSubCommetsT = _a.toggleSubCommetsT, exports.setCurrentPostId = _a.setCurrentPostId, exports.setOffset = _a.setOffset;
const selectCurrentId = (s) => s.posts.currentId;
exports.selectCurrentId = selectCurrentId;
const selectPostsHome = (state) => state.posts.posts.filter((post) => post.page == "home");
exports.selectPostsHome = selectPostsHome;
const selectPostsProfile = (state, username) => state.posts.posts.filter((post) => post.page == username);
exports.selectPostsProfile = selectPostsProfile;
const selectPostsExplore = (state) => state.posts.posts.filter((post) => post.page == "explore");
exports.selectPostsExplore = selectPostsExplore;
const selectPostsSaved = (state) => state.posts.posts.filter((post) => post.page == "saved");
exports.selectPostsSaved = selectPostsSaved;
const selectProfile = (state, username) => state.posts.profiles.find((profile) => profile.username == username);
exports.selectProfile = selectProfile;
const selectBack = (state) => state.posts.back;
exports.selectBack = selectBack;
const selectCurrentPost = (state) => state.posts.posts.find((post) => post.id == state.posts.currentId);
exports.selectCurrentPost = selectCurrentPost;
const selectCurrentPostP = (s, postid) => s.posts.posts.find((p) => p.id == postid);
exports.selectCurrentPostP = selectCurrentPostP;
const selectpostsForBack = (state) => state.posts.posts.filter((post) => post.page == state.posts.back);
exports.selectpostsForBack = selectpostsForBack;
const selectMetaData = (state) => ({
    hasmore: state.posts.hasmore,
    loading: state.posts.loading,
    offset: state.posts.offset,
});
exports.selectMetaData = selectMetaData;
exports.default = exports.postsSlice.reducer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileU = exports.commentsU = exports.postsU = exports.dateR = void 0;
const dateR = (str) => new Date(str).getTime();
exports.dateR = dateR;
const postsU = (posts, id, obj) => posts.map((post) => {
    if (post.id == id)
        return Object.assign(Object.assign({}, post), obj(post));
    return post;
});
exports.postsU = postsU;
const commentsU = (comments, commentid, obj) => comments.map((c) => {
    if (c.id == commentid)
        return obj(c);
    return c;
});
exports.commentsU = commentsU;
const profileU = (profiles, username, obj) => profiles.map((p) => {
    if (p.username == username)
        return obj(p);
    return p;
});
exports.profileU = profileU;

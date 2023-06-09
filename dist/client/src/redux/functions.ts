import { IComment, IPost, IProfile } from "../interfaces/ISlices";

export const dateR = (str: string) => new Date(str).getTime();

export const postsU = (posts: IPost[], id: string, obj: (p: IPost) => IPost) =>
  posts.map((post) => {
    if (post.id == id) return { ...post, ...obj(post) };
    return post;
  });

export const commentsU = (
  comments: IComment[],
  commentid: string,
  obj: (comment: IComment) => IComment
): IComment[] =>
  comments.map((c) => {
    if (c.id == commentid) return obj(c);
    return c;
  });

export const profileU = (
  profiles: IProfile[],
  username: string,
  obj: (profile: IProfile) => IProfile
): IProfile[] =>
  profiles.map((p) => {
    if (p.username == username) return obj(p);
    return p;
  });

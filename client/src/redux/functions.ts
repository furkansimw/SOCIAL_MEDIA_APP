import { IPost } from "../interfaces/ISlices";

export const dateR = (str: string) => new Date(str).getTime();

export const postsU = (posts: IPost[], id: string, obj: (p: IPost) => IPost) =>
  posts.map((post) => {
    if (post.id == id) return { ...post, ...obj(post) };
    return post;
  });

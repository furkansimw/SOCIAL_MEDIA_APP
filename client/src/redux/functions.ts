import { IPost, IProfile } from "../interfaces/ISlices";

export const dateR = (str: string) => new Date(str).getTime();

export const postsU = (posts: IPost[], id: string, obj: (p: IPost) => IPost) =>
  posts.map((post) => {
    if (post.id == id) return { ...post, ...obj(post) };
    return post;
  });

export const profileU = (
  profiles: IProfile[],
  id: string,
  obj: (p: IProfile) => IProfile
) =>
  profiles.map((profile) => {
    if (profile.id == id) return { ...profile, ...obj(profile) };
    return profile;
  });

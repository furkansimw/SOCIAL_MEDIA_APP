export interface IProfileInitialState {
  isloggedin: boolean;
  values: { username: string; pp: string | null; id: string | null };
}

export interface IPostsSliceInitialState {
  posts: IPost[];
  profiles: IProfile[];
  back: null | string;
  currentPost?: IPost;
  hasmore: { home: boolean; explore: boolean };
  loading: { home: boolean; explore: boolean };
}

export interface IPost {
  cover?: string;
  images: string[];
  owner: string;
  username: string;
  created: string;
  pp: string | null;
  content: string;
  likecount: number;
  commentcount: number;
  isliked: boolean;
  saved: boolean;
  page: string;
  comments: {
    loading: true;
    hasmore: true;
    sending: boolean;
    data: IComment[];
  };
}

export interface IComment {
  owner: string;
  username: string;
  pp: string | string;
  content: string;
  created: string;
  isliked: boolean;
  subcommentcount: number;
  likecount: number;
  subcomments: { loading: true; hasmore: true; data: ISubComment[] };
}

export interface ISubComment {
  owner: string;
  username: string;
  pp: string | string;
  content: string;
  created: string;
  isliked: boolean;
  likecount: number;
}

export interface IProfile {
  username: string;
  followingcount: number;
  followercount: number;
  postcount: number;
  id: string;
  pp: string | null;
  ispublic: boolean;
  isfollowingme: boolean;
  status: number | null;
  posts: { loading: boolean; hasmore: boolean; data: IPost[] };
}

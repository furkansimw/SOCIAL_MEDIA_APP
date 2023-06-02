export interface IProfileInitialState {
  isloggedin: boolean;
  loginPopupActive: boolean;
  values: { username: string; pp: string | null; id: string };
}

export interface IPostsSliceInitialState {
  posts: IPost[];
  profiles: IProfile[];
  back: null | string;
  hasmore: { home: boolean; explore: boolean };
  loading: { home: boolean; explore: boolean };
}

export interface IPost {
  cover?: string;
  isfollowing: boolean;
  images?: string[];
  owner: string;
  more?: boolean;
  username: string;
  created: string;
  id: string;
  pp: string | null;
  content: string | null;
  likecount: number;
  commentcount: number;
  isliked: boolean;
  issaved: boolean;
  page: string;
  comments: {
    loading: boolean;
    hasmore: boolean;
    sending: boolean;
    data: IComment[];
  };
}

export interface IComment {
  owner: string;
  username: string;
  id: string;
  pp: string | null;
  content: string;
  created: string;
  isliked: boolean;
  subcommentcount: number;
  likecount: number;
  subcomments: {
    loading: boolean;
    hasmore: boolean;
    data: ISubComment[];
    t: boolean;
  };
}

export interface ISubComment {
  id: string;
  owner: string;
  username: string;
  pp: string | null;
  content: string;
  created: string;
  isliked: boolean;
  likecount: number;
  s?: boolean;
}

export interface IProfile {
  loading: boolean;
  username: string;
  exists?: boolean;
  info?: {
    bio: string | null;
    username: string;
    followingcount: number;
    followercount: number;
    postcount: number;
    id: string;
    fullname: string | null;
    pp: string | null;
    ispublic: boolean;
    isfollowingme: boolean;
    status: 0 | 1 | 2 | null;
  };
  postsState?: { loading: boolean; hasmore: boolean };
}

export interface ILikes {
  id: string;
  username: string;
  status: null | number;
  pp: null | string;
  fullname: null | string;
  created: string;
}

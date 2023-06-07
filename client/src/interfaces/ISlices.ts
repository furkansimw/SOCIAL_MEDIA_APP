export interface IProfileInitialState {
  isloggedin: boolean;
  loginPopupActive: boolean;
  values: {
    username: string;
    pp: string | null;
    id: string;
    reqcount: number;
    unreadmessagescount: number;
    nreqcount: number;
    npostlikescount: number;
    ncreatedcommentcount: number;
  };
}

export interface IPostsSliceInitialState {
  posts: IPost[];
  profiles: IProfile[];
  back: null | string;
  hasmore: { home: boolean; explore: boolean };
  loading: { home: boolean; explore: boolean };
  currentId: string | null;
  offset: { home: number; explore: number };
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
    offset: number;
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

enum INotificationType {
  "following",
  "followrequest",
  "postlike",
  "createdcomment",
}

export interface INotification {
  id: string;
  type: INotificationType;
  username: string;
  pp: string | null;
  created: string;
  owner: string;
  status: null | 0 | 1;
  targeturl: string; // posturl, username
}

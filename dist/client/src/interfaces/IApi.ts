export interface ILast {
  id?: string;
  date?: string;
}

export interface IPosts extends ILast {
  explore?: boolean;
}

export interface IGetComments extends ILast {
  postid: string;
  commentid?: string;
}

export interface ICreateComment {
  postid: string;
  content: string;
  commentid?: string;
  username: string;
  pp: string | null;
  id: string;
  postowner: string;
}

export interface ICreateAction {
  postid: string;
  postowner: string;
  a: boolean;
  t: "like" | "save";
}

export interface ILikeComment {
  a: boolean;
  commentid: string;
  postid: string;
  subcommentid?: string;
}

export interface IGetPostLikes extends ILast {
  postid: string;
}

export interface IGetCommentLikes extends ILast {
  postid: string;
  commentid: string;
}

export interface IGetSubCommentLikes extends IGetCommentLikes {
  subcommentid: string;
}

export interface IGetProfilePosts extends ILast {
  username: string;
}

export interface ISC {
  userid: string;
  a: boolean;
}

export interface IE {
  pp: string | null;
  username: string;
  bio: string | null;
  email: string;
  ispublic: boolean;
  fullname: string | null;
}

export interface IFollowRequests extends ILast {
  l: boolean;
}

export interface IDeleteComment {
  postid: string;
  commentid: string;
  subcommentid?: string;
}

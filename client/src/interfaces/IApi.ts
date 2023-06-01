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
}

export interface ICreateAction {
  postid: string;
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

export interface IPosts {
  explore?: boolean;
  offset?: number;
  sd?: string;
}

export interface IGetComments {
  postid: string;
  offset?: number;
  sd?: string;
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

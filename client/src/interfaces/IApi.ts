export interface IPosts {
  explore?: boolean;
  offset?: number;
  sd?: string;
}

export interface IGetComments {
  postid: string;
  offset?: number;
  sd?: string;
}

export interface ICreateComment {
  postid: string;
  content: string;
  username: string;
  pp: string | null;
  id: string | null;
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

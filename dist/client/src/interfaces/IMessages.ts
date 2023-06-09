export interface IUser {
  username: string;
  pp: string | null;
  fullname: string | null;
  is_online: false;
  uid: string;
  lastonline: string;
}

export interface IRoom extends IUser {
  rid: string;
  mid: string | null;
  mowner: string | null;
  mtype: string | null;
  mcontent: string | null;
  mreply: string | null;
  mcreated: string | null;
  messages: IMessage[];
  useen: string;
  mseen: string;
}
export interface IMessage extends IUser {
  id: string;
  owner: string;
  content: string;
  type: 0 | 1 | 2 | 3; // text image post reply
  reply: string | null; // "repying message id + repying message content";
  created: string;
}

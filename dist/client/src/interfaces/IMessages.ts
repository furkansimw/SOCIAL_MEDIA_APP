export interface IUser {
  username: string;
  pp: string | null;
  fullname: string | null;
  is_online: false;
  uid: string;
  lastonline: string;
}

export interface IRoom extends IUser {
  room_id: string;
  last_message_id: string | null;
  last_message_owner: string | null;
  last_message_type: number | null;
  last_message_content: string | null;
  last_message_created: string | null;
  messages: IMessage[];
  user_seen: string;
  my_seen: string;
  inbox: boolean;
  hasmore: boolean;
  loading: boolean;
}
export interface IMessage extends IUser {
  id: string;
  owner: string;
  content: string;
  type: 0 | 1 | 2 | 3; // text image post reply
  reply: string | null; // "repying message id + repying message content";
  created: string;
  room: string;
}

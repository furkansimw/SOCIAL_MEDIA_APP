export interface IUser {
  username: string;
  pp: string | null;
  fullname: string | null;
  is_online: boolean;
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
  is_active: boolean;
  hasmore: boolean;
  loading: boolean;
}
export interface IMessage {
  postdata?: any;
  id: string;
  owner: string;
  username: string;
  pp: string | null;
  content: string;
  type: 0 | 1 | 2 | 3; // text image post reply
  reply: string | null; // "repying message id + repying message content";
  created: string;
  room: string;
}

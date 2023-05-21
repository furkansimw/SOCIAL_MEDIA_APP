export interface IProfileInitialState {
  isloggedin: boolean;
  values: {
    username: string;
    pp: string | null;
    id: string | null;
  };
}

export interface IPostsSliceInitialState {
  posts: IPost[];
  profiles: IProfile[];
  back: null | string;
  currentPost?: IPost;
}

export interface IPost {}

export interface IProfile {}

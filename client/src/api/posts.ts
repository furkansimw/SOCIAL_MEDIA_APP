import { createAsyncThunk } from "@reduxjs/toolkit";
import req from "./req";
import {
  IPosts,
  IGetComments,
  ICreateComment,
  ICreateAction,
  ILikeComment,
} from "../interfaces/IApi";
import { IComment, IPost } from "../interfaces/ISlices";

export const getPosts = createAsyncThunk(
  "/posts",
  ({ explore, offset, sd }: IPosts) =>
    req(
      `${explore ? `/posts/explore` : `/posts`}?offset=${offset}&sd=${sd}`
    ).then((r) => r as IPost[])
);

export const createPost = (images: string[], content: string | null) =>
  req(`/posts/create`, "POST", { images, content }).then((r) => r as string);

export const getImages = createAsyncThunk(
  "/posts/:postid/images",
  (postid: string) => req(`/posts/${postid}/images`).then((r) => r as string[])
);

export const getComments = createAsyncThunk(
  "/posts/:postid/comments",
  ({ offset, postid, sd }: IGetComments) =>
    req(`/posts/${postid}/comments?offset=${offset}&sd=${sd}`).then(
      (r) => r as IComment[]
    )
);

export const createComment = createAsyncThunk(
  "/posts/:postid/comment~{POST}",
  ({ postid, content }: ICreateComment) =>
    req(`/posts/${postid}/comment`, "POST", { content }).then(
      (r) => r as string
    )
);

export const createAction = createAsyncThunk(
  `/posts/:postid/like~{POST}`,
  ({ a, postid, t }: ICreateAction) =>
    req(`/posts/${postid}/${t}`, a ? "POST" : "DELETE")
);

export const likeComment = createAsyncThunk(
  "/posts/:postid/comments/:commentid/like~{POST}",
  ({ a, commentid, subcommentid, postid }: ILikeComment) =>
    req(
      `/posts/${postid}/comments/${commentid}${
        subcommentid ? `/${subcommentid}` : ""
      }/like`,
      a ? "POST" : "DELETE"
    )
);

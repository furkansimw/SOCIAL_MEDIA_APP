import { createAsyncThunk } from "@reduxjs/toolkit";
import req from "./req";
import {
  IPosts,
  IGetComments,
  ICreateComment,
  ICreateAction,
  ILikeComment,
  IGetPostLikes,
  IGetCommentLikes,
  IGetSubCommentLikes,
  IDeleteComment,
} from "../interfaces/IApi";
import { IComment, IPost, ISubComment, ILikes } from "../interfaces/ISlices";

export const getPosts = createAsyncThunk(
  "/posts",
  ({ explore, date, id }: IPosts) =>
    req(`${explore ? `/posts/explore` : `/posts`}?date=${date}&id=${id}`).then(
      (r) => r as IPost[]
    )
);

export const createPost = (images: string[], content: string | null) =>
  req(`/posts/create`, "POST", { images, content }).then((r) => r as string);

export const getImages = createAsyncThunk(
  "/posts/:postid/images",
  (postid: string) => req(`/posts/${postid}/images`).then((r) => r as string[])
);

export const getComments = createAsyncThunk(
  "/posts/:postid/comments",
  ({ id, postid, date, commentid }: IGetComments) =>
    req(
      `/posts/${postid}/comments/${
        commentid ? `${commentid}/subcomments` : ``
      }?date=${date}&id=${id}`
    ).then((r) => r as (IComment | ISubComment)[])
);

export const createComment = createAsyncThunk(
  "/posts/:postid/comment~{POST}",
  ({ postid, content, commentid }: ICreateComment) =>
    req(
      `/posts/${postid}/${commentid ? `comments/${commentid}` : `comment`}`,
      "POST",
      { content }
    ).then((r) => r as string)
);

export const deleteComment = createAsyncThunk(
  "/posts/:postid/comment~{DELETE}",
  ({ postid, commentid, subcommentid }: IDeleteComment) =>
    req(
      `/posts/${postid}/comments/${commentid}${
        subcommentid ? `/${subcommentid}` : ``
      }`,
      "DELETE"
    )
);

export const createAction = createAsyncThunk(
  `/posts/:postid/like~{POST}`,
  ({ a, postid, t, postowner }: ICreateAction) =>
    req(`/posts/${postid}/${t}`, a ? "POST" : "DELETE", { postowner })
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

export const getPostLikes = ({ id, postid, date }: IGetPostLikes) =>
  req(`/posts/${postid}/likes?date=${date}&id=${id}`).then(
    (r) => r as ILikes[]
  );

export const getCommentLikes = ({
  id,
  date,
  commentid,
  postid,
}: IGetCommentLikes) =>
  req(
    `/posts/${postid}/comments/${commentid}/likes?date=${date}&id=${id}`
  ).then((r) => r as ILikes[]);

export const getSubCommentLikes = ({
  commentid,
  postid,
  subcommentid,
  date,
  id,
}: IGetSubCommentLikes) =>
  req(
    `/posts/${postid}/likes/comments/${commentid}/${subcommentid}/likes?date=${date}&id=${id}`
  ).then((r) => r as ILikes[]);

export const removePost = createAsyncThunk(
  "/posts/:postid~{DELETE}",
  (postid: string) => req(`/posts/${postid}`, "DELETE")
);

export const getPost = createAsyncThunk(
  "/posts/:postid/~{GET}",
  (postid: string) => req(`/posts/${postid}`)
);

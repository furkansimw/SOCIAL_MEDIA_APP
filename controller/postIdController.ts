import { findS, io } from "..";
import db from "../db/db";
import conv from "../functions/converter";
import { asyncErrorWrapper, badRequest, createError } from "../mw/error";
import {
  getCommentsQ,
  getPostImagesQ,
  getPostLikesQ,
  getPostQ,
  postCommentQ,
  postLikeQ,
  postUnlikeQ,
  postSaveQ,
  postUnSaveQ,
} from "../queries/postIdQ";

const getComments = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  const last = conv(req.query);
  // if out of session can only see first 12 comments
  if (guest && last) badRequest();

  const postComments = await getCommentsQ(id, postid, guest, last);
  res.json(postComments);
});

const getPost = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  const post = await getPostQ(id, postid, guest);

  if (post == null) return createError("Post not found", 404);
  res.json(post);
});

const getPostImages = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;

  const images = await getPostImagesQ(id, postid, guest);
  res.json(images);
});

const getPostLikes = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();

  const { postid } = req.params;

  const last = conv(req.query);

  const postLikes = await getPostLikesQ(id, postid, last);
  res.json(postLikes);
});

const postLike = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  const { postowner } = req.body;
  if (guest) badRequest();
  const powner = await postLikeQ(id, postid, postowner);
  if (powner && powner != id) io.to(findS(powner)).emit("notifications", 2);
  res.json({ status: "ok" });
});

const postUnlike = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { postid } = req.params;
  await postUnlikeQ(id, postid);
  res.json({ status: "ok" });
});

const postComment = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();
  const { postid } = req.params;
  let { content, postowner }: { content?: string; postowner?: string } =
    req.body;

  if (!content || content?.trim().length == 0 || !postowner)
    return badRequest();
  content = content.replace(/\s+/g, " ").trim().toString();

  const commentId = await postCommentQ(id, postid, content, postowner);
  if (!commentId) badRequest();
  if (id != postowner)
    io.to(findS(postowner)).emit("notifications", { type: 3, content });
  res.json(commentId);
});

const postSave = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  if (guest) badRequest();
  await postSaveQ(id, postid);
  res.json({ status: "ok" });
});

const postUnSave = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { postid } = req.params;
  await postUnSaveQ(id, postid);
  res.json({ status: "ok" });
});

const deletePost = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();
  const { postid } = req.params;
  await db.query("delete from posts where owner = $1 and id = $2", [
    id,
    postid,
  ]);
  res.json({ status: "ok" });
});

export {
  getComments,
  getPost,
  getPostImages,
  getPostLikes,
  postLike,
  postUnlike,
  postComment,
  postSave,
  postUnSave,
  deletePost,
};

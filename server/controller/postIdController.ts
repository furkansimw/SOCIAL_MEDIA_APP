import conv from "../functions/converter";
import { asyncErrorWrapper, badRequest } from "../mw/error";
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
  if (guest) badRequest();
  await postLikeQ(id, postid);
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
  let { content }: { content?: string } = req.body;

  if (!content || content?.trim().length == 0) return badRequest();
  content = content.replace(/\s+/g, " ").trim().toString();

  const commentId = await postCommentQ(id, postid, content);
  if (!commentId) badRequest();
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
};

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
} from "../queries/postIdQueries";

const getCommentsController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  const { offset, sd } = conv(req.query);
  // if out of session can only see first 12 comments
  if (guest && (offset >= 12 || sd != undefined)) badRequest();

  const postComments = await getCommentsQ(id, postid, guest, offset, sd);
  res.json(postComments);
});

const getPostController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  const post = await getPostQ(id, postid, guest);

  res.json(post);
});

const getPostImagesController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;

  const images = await getPostImagesQ(id, postid, guest);
  res.json(images);
});

const getPostLikesController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();

  const { postid } = req.params;

  const { offset, sd } = conv(req.query);

  const postLikes = await getPostLikesQ(id, postid, offset, sd);
  res.json(postLikes);
});

const postLikeController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  if (guest) badRequest();
  await postLikeQ(id, postid);
  res.json({ status: "ok" });
});

const postUnlikeController = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { postid } = req.params;
  await postUnlikeQ(id, postid);
  res.json({ status: "ok" });
});

const postCommentController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();
  const { postid } = req.params;
  let { content }: { content?: string } = req.body;

  if (!content || content?.trim().length == 0) return badRequest();
  content = content.replace(/\n{2,}/g, "\n");

  const commentId = await postCommentQ(id, postid, content);
  res.json(commentId);
});

const postSaveController = asyncErrorWrapper(async (req, res) => {});
const postUnSaveController = asyncErrorWrapper(async (req, res) => {});

export {
  getCommentsController,
  getPostController,
  getPostImagesController,
  getPostLikesController,
  postLikeController,
  postUnlikeController,
  postCommentController,
  postSaveController,
  postUnSaveController,
};

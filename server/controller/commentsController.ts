import conv from "../functions/converter";
import { asyncErrorWrapper, badRequest } from "../mw/error";
import {
  commentLikeQ,
  commentUnLikeQ,
  deleteCommentQ,
  getCommentLikesQ,
  getSubCommentsQ,
  createSubCommentQ,
} from "../queries/commentsQ";
import { usernamePattern } from "../validators/authControllersValidators";

const deleteComment = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();
  const { commentid, postid } = req.params;
  await deleteCommentQ(id, postid, commentid);
  res.json({ status: "ok" });
});

const getSubComments = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { commentid } = req.params;

  const { offset, sd } = conv(req.query);
  const subcomments = await getSubCommentsQ(guest, id, commentid, offset, sd);
  res.json(subcomments);
});

const commentLike = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { commentid, postid } = req.params;
  await commentLikeQ(id, postid, commentid);
  res.json({ status: "ok" });
});

const commentUnLike = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { postid, commentid } = req.params;
  await commentUnLikeQ(id, postid, commentid);
  res.json({ status: "ok" });
});

const getCommentLikes = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { commentid } = req.params;
  const { offset, sd } = conv(req.query);
  const commentLikes = await getCommentLikesQ(id, commentid, offset, sd);
  res.json(commentLikes);
});

const createSubComment = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  let { content }: { content?: string } = req.body;
  const { commentid } = req.params;

  if (!content || content?.trim().length == 0) return badRequest();
  content = content.replace(/\s+/g, " ").trim().toString();
  const tag = content.split(" ")[0];
  const isdone =
    tag[0] == "@" &&
    new RegExp(usernamePattern).test(tag.slice(1)) &&
    tag.length > 1;
  if (!isdone) badRequest();
  const subCommentId = await createSubCommentQ(id, commentid, content);
  res.json(subCommentId);
});

export {
  deleteComment,
  getSubComments,
  commentLike,
  commentUnLike,
  getCommentLikes,
  createSubComment,
};

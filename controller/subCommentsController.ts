import conv from "../functions/converter";
import { asyncErrorWrapper } from "../mw/error";
import {
  getSubCommentLikesQ,
  subCommentLikeQ,
  subCommentUnLikeQ,
  deleteSubCommentQ,
} from "../queries/subCommentsQ";

const deleteSubComment = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { subcommentid } = req.params;
  await deleteSubCommentQ(id, subcommentid);
  res.json({ status: "ok" });
});
const subCommentLike = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { subcommentid } = req.params;
  await subCommentLikeQ(id, subcommentid);
  res.json({ status: "ok" });
});

const subCommentUnlike = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { subcommentid } = req.params;
  await subCommentUnLikeQ(id, subcommentid);
  res.json({ status: "ok" });
});
const getSubCommentLikes = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { subcommentid } = req.params;
  const last = conv(req.query);

  const sbcl = await getSubCommentLikesQ(id, subcommentid, last);
  res.json(sbcl);
});

export {
  deleteSubComment,
  subCommentLike,
  subCommentUnlike,
  getSubCommentLikes,
};

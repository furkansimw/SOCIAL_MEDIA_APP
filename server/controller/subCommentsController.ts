import conv from "../functions/converter";
import { asyncErrorWrapper } from "../mw/error";
import { getSubCommentLikesQ } from "../queries/subCommentsQ";

const deleteSubComment = asyncErrorWrapper(async (req, res) => {});
const subCommentLike = asyncErrorWrapper(async (req, res) => {});
const subCommentUnlike = asyncErrorWrapper(async (req, res) => {});
const getSubCommentLikes = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { subcommentid } = req.params;
  const { offset, sd } = conv(req.query);

  const sbcl = await getSubCommentLikesQ(id, subcommentid, offset, sd);
  res.json(sbcl);
});

export {
  deleteSubComment,
  subCommentLike,
  subCommentUnlike,
  getSubCommentLikes,
};

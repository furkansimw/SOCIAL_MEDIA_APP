import { asyncErrorWrapper } from "../mw/error";

const deleteSubComment = asyncErrorWrapper(async (req, res) => {});
const subCommentLike = asyncErrorWrapper(async (req, res) => {});
const subCommentUnlike = asyncErrorWrapper(async (req, res) => {});
const getSubCommentLikes = asyncErrorWrapper(async (req, res) => {});

export {
  deleteSubComment,
  subCommentLike,
  subCommentUnlike,
  getSubCommentLikes,
};

import { asyncErrorWrapper } from "../mw/error";

const deleteSubCommentController = asyncErrorWrapper(async (req, res) => {});
const subCommentLikeController = asyncErrorWrapper(async (req, res) => {});
const subCommentUnlikeController = asyncErrorWrapper(async (req, res) => {});
const getSubCommentLikesController = asyncErrorWrapper(async (req, res) => {});

export {
  deleteSubCommentController,
  subCommentLikeController,
  subCommentUnlikeController,
  getSubCommentLikesController,
};

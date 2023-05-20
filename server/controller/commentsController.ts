import { asyncErrorWrapper } from "../mw/error";

const deleteCommentController = asyncErrorWrapper(async (req, res) => {});
const getSubCommentsController = asyncErrorWrapper(async (req, res) => {});
const commentLikeController = asyncErrorWrapper(async (req, res) => {});
const commentUnLikeController = asyncErrorWrapper(async (req, res) => {});
const getCommentLikesController = asyncErrorWrapper(async (req, res) => {});

export {
  deleteCommentController,
  getSubCommentsController,
  commentLikeController,
  commentUnLikeController,
  getCommentLikesController,
};

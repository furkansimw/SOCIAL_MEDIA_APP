import { asyncErrorWrapper } from "../mw/error";

const deleteComment = asyncErrorWrapper(async (req, res) => {});
const getSubComments = asyncErrorWrapper(async (req, res) => {});
const commentLike = asyncErrorWrapper(async (req, res) => {});
const commentUnLike = asyncErrorWrapper(async (req, res) => {});
const getCommentLikes = asyncErrorWrapper(async (req, res) => {});

export {
  deleteComment,
  getSubComments,
  commentLike,
  commentUnLike,
  getCommentLikes,
};

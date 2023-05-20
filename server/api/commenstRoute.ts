import { Router } from "express";
import {
  deleteCommentController,
  getSubCommentsController,
  commentLikeController,
  commentUnLikeController,
  getCommentLikesController,
} from "../controller/commentsController";
import subCommentIdRoute from "./subComments";

// :commentid
const commentIdRoute = Router({ mergeParams: true });

commentIdRoute.route("/").delete(deleteCommentController);
commentIdRoute.route("/subcomments").get(getSubCommentsController);
commentIdRoute
  .route("/like")
  .post(commentLikeController)
  .delete(commentUnLikeController);
commentIdRoute.route("/likes").get(getCommentLikesController);

commentIdRoute.use("/:subcommentid", subCommentIdRoute);

export default commentIdRoute;

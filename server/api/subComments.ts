import { Router } from "express";
import {
  deleteSubCommentController,
  getSubCommentLikesController,
  subCommentLikeController,
  subCommentUnlikeController,
} from "../controller/subCommentsController";

const subCommentIdRoute = Router({ mergeParams: true });

subCommentIdRoute.route("/").delete(deleteSubCommentController);
subCommentIdRoute
  .route("/like")
  .post(subCommentLikeController)
  .delete(subCommentUnlikeController);
subCommentIdRoute.route("/likes").get(getSubCommentLikesController);

export default subCommentIdRoute;

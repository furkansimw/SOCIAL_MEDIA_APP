import { Router } from "express";
import {
  getCommentsController,
  getPostController,
  getPostImagesController,
  getPostLikesController,
  postLikeController,
  postUnlikeController,
  postCommentController,
} from "../controller/postsController";
import commentIdRoute from "./commentIdRoute";

// :postid
const postsIdRoute = Router({ mergeParams: true });

postsIdRoute.route("/").get(getPostController);
postsIdRoute.route("/images").get(getPostImagesController);
postsIdRoute.route("/likes").get(getPostLikesController);
postsIdRoute.route("/comments").get(getCommentsController);
postsIdRoute
  .route("/like")
  .post(postLikeController)
  .delete(postUnlikeController);
postsIdRoute.route("/comment").post(postCommentController);

postsIdRoute.use("/:commentid", commentIdRoute);

export default postsIdRoute;

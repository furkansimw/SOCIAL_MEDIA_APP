import { Router } from "express";

import commentIdRoute from "./commenstRoute";
import {
  getCommentsController,
  getPostController,
  getPostImagesController,
  getPostLikesController,
  postCommentController,
  postLikeController,
  postUnlikeController,
  postSaveController,
  postUnSaveController,
} from "../controller/postIdController";

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

postsIdRoute
  .route("/save")
  .post(postSaveController)
  .delete(postUnSaveController);
postsIdRoute.route("/comment").post(postCommentController);

postsIdRoute.use("/:commentid", commentIdRoute);

export default postsIdRoute;

import express from "express";
import {
  createPostController,
  getPostController,
  getPostLikesController,
} from "../controller/postsController";
const postsRoute = express.Router();

postsRoute.route("/").post(createPostController);
postsRoute.route("/:postid").get(getPostController);
postsRoute.route("/:postid/likes").get(getPostLikesController);

export default postsRoute;

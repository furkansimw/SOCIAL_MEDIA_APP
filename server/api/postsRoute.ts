import express from "express";
import {
  createPostController,
  getPostController,
} from "../controller/postsController";
const postsRoute = express.Router();

postsRoute.route("/").post(createPostController);
postsRoute.route("/:postid").get(getPostController);

export default postsRoute;

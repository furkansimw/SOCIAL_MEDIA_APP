import { Router } from "express";
import {
  getPostsController,
  getExplorePostsController,
  createPostController,
} from "../controller/postsController";
import postsIdRoute from "./postsIdRoute";
const postsRoute = Router();

postsRoute.route("/").get(getPostsController).post(createPostController);
postsRoute.route("/explore").get(getExplorePostsController);
postsRoute.use("/:postid", postsIdRoute);

export default postsRoute;

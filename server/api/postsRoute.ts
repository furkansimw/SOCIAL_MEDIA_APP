import { Router } from "express";
import {
  getPosts,
  createPost,
  getExplorePosts,
} from "../controller/postsController";
import {
  getComments,
  getPost,
  getPostImages,
  getPostLikes,
  postComment,
  postLike,
  postUnlike,
  postSave,
  postUnSave,
} from "../controller/postIdController";
import commentIdRoute from "./commenstRoute";

const postsRoute = Router();
const postsIdRoute = Router({ mergeParams: true });

postsRoute.route("/").get(getPosts).post(createPost);
postsRoute.route("/explore").get(getExplorePosts);

postsRoute.use("/:postid", postsIdRoute);

postsIdRoute.route("/").get(getPost);
postsIdRoute.route("/images").get(getPostImages);
postsIdRoute.route("/likes").get(getPostLikes);
postsIdRoute.route("/comments").get(getComments);
postsIdRoute.route("/like").post(postLike).delete(postUnlike);
postsIdRoute.route("/comment").post(postComment);
postsIdRoute.route("/save").post(postSave).delete(postUnSave);
postsIdRoute.route("/comment").post(postComment);

postsIdRoute.use("/:commentid", commentIdRoute);

export default postsRoute;

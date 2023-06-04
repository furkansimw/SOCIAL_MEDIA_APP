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
  deletePost,
} from "../controller/postIdController";
import commentIdRoute from "./commenstRoute";

const postsRoute = Router();

postsRoute.route("/").get(getPosts).post(createPost);
postsRoute.route("/explore").get(getExplorePosts);
postsRoute.route("/create").post(createPost);

const postsIdRoute = Router({ mergeParams: true });

postsRoute.use("/:postid", postsIdRoute);

postsIdRoute.route("/").get(getPost).delete(deletePost);
postsIdRoute.route("/images").get(getPostImages);
postsIdRoute.route("/likes").get(getPostLikes);
postsIdRoute.route("/comments").get(getComments);
postsIdRoute.route("/like").post(postLike).delete(postUnlike);
postsIdRoute.route("/comment").post(postComment);
postsIdRoute.route("/save").post(postSave).delete(postUnSave);
postsIdRoute.route("/comment").post(postComment);

postsIdRoute.use("/comments/:commentid", commentIdRoute);

export default postsRoute;

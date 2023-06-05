import { Router } from "express";
import {
  deleteComment,
  getSubComments,
  commentLike,
  commentUnLike,
  getCommentLikes,
  createSubComment,
} from "../controller/commentsController";
import subCommentIdRoute from "./subComments";
import mustBeLoggedin from "../mw/mustbeloggedin";

const commentIdRoute = Router({ mergeParams: true });

commentIdRoute.route("/subcomments").get(getSubComments);
commentIdRoute.use(mustBeLoggedin);

commentIdRoute.route("/").delete(deleteComment).post(createSubComment);
commentIdRoute.route("/likes").get(getCommentLikes);
commentIdRoute.route("/like").post(commentLike).delete(commentUnLike);
commentIdRoute.use("/:subcommentid", subCommentIdRoute);

export default commentIdRoute;

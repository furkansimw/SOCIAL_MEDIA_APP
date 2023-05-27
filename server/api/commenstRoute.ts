import { Router } from "express";
import {
  deleteComment,
  getSubComments,
  commentLike,
  commentUnLike,
  getCommentLikes,
} from "../controller/commentsController";
import subCommentIdRoute from "./subComments";
import mustBeLoggedin from "../mw/mustbeloggedin";

const commentIdRoute = Router({ mergeParams: true });

commentIdRoute.route("/subcomments").get(getSubComments);
commentIdRoute.use(mustBeLoggedin);

commentIdRoute.route("/").delete(deleteComment);
commentIdRoute.route("/likes").get(getCommentLikes);
commentIdRoute.route("/like").post(commentLike).delete(commentUnLike);
commentIdRoute.use("/:subcommentid", subCommentIdRoute);

export default commentIdRoute;

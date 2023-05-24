import { Router } from "express";
import {
  deleteComment,
  getSubComments,
  commentLike,
  commentUnLike,
  getCommentLikes,
} from "../controller/commentsController";
import subCommentIdRoute from "./subComments";

const commentIdRoute = Router({ mergeParams: true });

commentIdRoute.route("/").delete(deleteComment);
commentIdRoute.route("/subcomments").get(getSubComments);
commentIdRoute.route("/like").post(commentLike).delete(commentUnLike);
commentIdRoute.route("/likes").get(getCommentLikes);

commentIdRoute.use("/:subcommentid", subCommentIdRoute);

export default commentIdRoute;

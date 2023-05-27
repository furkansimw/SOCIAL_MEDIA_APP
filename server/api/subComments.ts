import { Router } from "express";
import {
  deleteSubComment,
  getSubCommentLikes,
  subCommentLike,
  subCommentUnlike,
} from "../controller/subCommentsController";

const subCommentIdRoute = Router({ mergeParams: true });

subCommentIdRoute.route("/").delete(deleteSubComment);
subCommentIdRoute.route("/like").post(subCommentLike).delete(subCommentUnlike);
subCommentIdRoute.route("/likes").get(getSubCommentLikes);

export default subCommentIdRoute;

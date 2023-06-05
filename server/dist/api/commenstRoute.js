"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentsController_1 = require("../controller/commentsController");
const subComments_1 = __importDefault(require("./subComments"));
const mustbeloggedin_1 = __importDefault(require("../mw/mustbeloggedin"));
const commentIdRoute = (0, express_1.Router)({ mergeParams: true });
commentIdRoute.route("/subcomments").get(commentsController_1.getSubComments);
commentIdRoute.use(mustbeloggedin_1.default);
commentIdRoute.route("/").delete(commentsController_1.deleteComment).post(commentsController_1.createSubComment);
commentIdRoute.route("/likes").get(commentsController_1.getCommentLikes);
commentIdRoute.route("/like").post(commentsController_1.commentLike).delete(commentsController_1.commentUnLike);
commentIdRoute.use("/:subcommentid", subComments_1.default);
exports.default = commentIdRoute;

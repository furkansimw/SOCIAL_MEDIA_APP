"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subCommentsController_1 = require("../controller/subCommentsController");
const subCommentIdRoute = (0, express_1.Router)({ mergeParams: true });
subCommentIdRoute.route("/").delete(subCommentsController_1.deleteSubComment);
subCommentIdRoute.route("/like").post(subCommentsController_1.subCommentLike).delete(subCommentsController_1.subCommentUnlike);
subCommentIdRoute.route("/likes").get(subCommentsController_1.getSubCommentLikes);
exports.default = subCommentIdRoute;

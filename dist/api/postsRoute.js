"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsController_1 = require("../controller/postsController");
const postIdController_1 = require("../controller/postIdController");
const commenstRoute_1 = __importDefault(require("./commenstRoute"));
const postsRoute = (0, express_1.Router)();
postsRoute.route("/").get(postsController_1.getPosts).post(postsController_1.createPost);
postsRoute.route("/explore").get(postsController_1.getExplorePosts);
postsRoute.route("/create").post(postsController_1.createPost);
const postsIdRoute = (0, express_1.Router)({ mergeParams: true });
postsRoute.use("/:postid", postsIdRoute);
postsIdRoute.route("/").get(postIdController_1.getPost).delete(postIdController_1.deletePost);
postsIdRoute.route("/images").get(postIdController_1.getPostImages);
postsIdRoute.route("/likes").get(postIdController_1.getPostLikes);
postsIdRoute.route("/comments").get(postIdController_1.getComments);
postsIdRoute.route("/like").post(postIdController_1.postLike).delete(postIdController_1.postUnlike);
postsIdRoute.route("/comment").post(postIdController_1.postComment);
postsIdRoute.route("/save").post(postIdController_1.postSave).delete(postIdController_1.postUnSave);
postsIdRoute.route("/comment").post(postIdController_1.postComment);
postsIdRoute.use("/comments/:commentid", commenstRoute_1.default);
exports.default = postsRoute;

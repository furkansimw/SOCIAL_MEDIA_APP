"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsController_1 = require("../controller/postsController");
const postsIdRoute_1 = __importDefault(require("./postsIdRoute"));
const postsRoute = (0, express_1.Router)();
postsRoute.route("/").get(postsController_1.getPostsController).post(postsController_1.createPostController);
postsRoute.route("/explore").get(postsController_1.getExplorePostsController);
postsRoute.use("/:postid", postsIdRoute_1.default);
exports.default = postsRoute;

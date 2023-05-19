"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = require("../controller/postsController");
const postsRoute = express_1.default.Router();
postsRoute.route("/").post(postsController_1.createPostController);
postsRoute.route("/:postid").get(postsController_1.getPostController);
exports.default = postsRoute;

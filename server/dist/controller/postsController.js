"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostController = exports.createPostController = void 0;
const cloudinary_1 = require("../db/cloudinary");
const error_1 = require("../mw/error");
const uuid_1 = require("uuid");
const postsQueries_1 = require("../queries/postsQueries");
const createPostController = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guest, id } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const postid = (0, uuid_1.v4)();
    const { images, content } = req.body;
    const urls = yield Promise.all(images.map((img, i) => (0, cloudinary_1.upload)(img, `${postid}-${i}`, "posts")));
    const postId = yield (0, postsQueries_1.createPostQ)(id, urls, content);
    res.status(201).json(postId);
}));
exports.createPostController = createPostController;
const getPostController = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { postid } = req.params;
    const post = yield (0, postsQueries_1.getPostQ)(id, postid, guest);
    res.json(post);
}));
exports.getPostController = getPostController;

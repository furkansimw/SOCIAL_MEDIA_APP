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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.getExplorePosts = exports.getPosts = void 0;
const cloudinary_1 = require("../db/cloudinary");
const error_1 = require("../mw/error");
const uuid_1 = require("uuid");
const postsQ_1 = require("../queries/postsQ");
const converter_1 = __importDefault(require("../functions/converter"));
const getPosts = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guest, id } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const { offset, sd } = (0, converter_1.default)(req.query);
    const posts = yield (0, postsQ_1.getPostsQ)(id, offset, sd);
    res.json(posts);
}));
exports.getPosts = getPosts;
const getExplorePosts = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guest, id } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const { offset, sd } = (0, converter_1.default)(req.query);
    const posts = yield (0, postsQ_1.getExplorePostsQ)(id, offset, sd);
    res.json(posts);
}));
exports.getExplorePosts = getExplorePosts;
const createPost = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { guest, id } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const postid = (0, uuid_1.v4)();
    let { images, content, } = req.body;
    const urls = yield Promise.all(images.map((img, i) => (0, cloudinary_1.upload)(img, `${postid}-${i}`, "posts")));
    content = (_a = content === null || content === void 0 ? void 0 : content.trim()) === null || _a === void 0 ? void 0 : _a.replace(/\n{2,}/g, "\n");
    const postId = yield (0, postsQ_1.createPostQ)(id, urls, content);
    res.status(201).json(postId);
}));
exports.createPost = createPost;

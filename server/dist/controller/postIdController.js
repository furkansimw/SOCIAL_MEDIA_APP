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
exports.deletePost = exports.postUnSave = exports.postSave = exports.postComment = exports.postUnlike = exports.postLike = exports.getPostLikes = exports.getPostImages = exports.getPost = exports.getComments = void 0;
const db_1 = __importDefault(require("../db/db"));
const converter_1 = __importDefault(require("../functions/converter"));
const error_1 = require("../mw/error");
const postIdQ_1 = require("../queries/postIdQ");
const getComments = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { postid } = req.params;
    const last = (0, converter_1.default)(req.query);
    // if out of session can only see first 12 comments
    if (guest && last)
        (0, error_1.badRequest)();
    const postComments = yield (0, postIdQ_1.getCommentsQ)(id, postid, guest, last);
    res.json(postComments);
}));
exports.getComments = getComments;
const getPost = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { postid } = req.params;
    const post = yield (0, postIdQ_1.getPostQ)(id, postid, guest);
    res.json(post);
}));
exports.getPost = getPost;
const getPostImages = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { postid } = req.params;
    const images = yield (0, postIdQ_1.getPostImagesQ)(id, postid, guest);
    res.json(images);
}));
exports.getPostImages = getPostImages;
const getPostLikes = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const { postid } = req.params;
    const last = (0, converter_1.default)(req.query);
    const postLikes = yield (0, postIdQ_1.getPostLikesQ)(id, postid, last);
    res.json(postLikes);
}));
exports.getPostLikes = getPostLikes;
const postLike = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { postid } = req.params;
    if (guest)
        (0, error_1.badRequest)();
    yield (0, postIdQ_1.postLikeQ)(id, postid);
    res.json({ status: "ok" });
}));
exports.postLike = postLike;
const postUnlike = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { postid } = req.params;
    yield (0, postIdQ_1.postUnlikeQ)(id, postid);
    res.json({ status: "ok" });
}));
exports.postUnlike = postUnlike;
const postComment = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const { postid } = req.params;
    let { content } = req.body;
    if (!content || (content === null || content === void 0 ? void 0 : content.trim().length) == 0)
        return (0, error_1.badRequest)();
    content = content.replace(/\s+/g, " ").trim().toString();
    const commentId = yield (0, postIdQ_1.postCommentQ)(id, postid, content);
    if (!commentId)
        (0, error_1.badRequest)();
    res.json(commentId);
}));
exports.postComment = postComment;
const postSave = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { postid } = req.params;
    if (guest)
        (0, error_1.badRequest)();
    yield (0, postIdQ_1.postSaveQ)(id, postid);
    res.json({ status: "ok" });
}));
exports.postSave = postSave;
const postUnSave = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { postid } = req.params;
    yield (0, postIdQ_1.postUnSaveQ)(id, postid);
    res.json({ status: "ok" });
}));
exports.postUnSave = postUnSave;
const deletePost = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const { postid } = req.params;
    yield db_1.default.query("delete from posts where owner = $1 and id = $2", [
        id,
        postid,
    ]);
    res.json({ status: "ok" });
}));
exports.deletePost = deletePost;

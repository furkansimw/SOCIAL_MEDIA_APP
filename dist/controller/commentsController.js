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
exports.createSubComment = exports.getCommentLikes = exports.commentUnLike = exports.commentLike = exports.getSubComments = exports.deleteComment = void 0;
const converter_1 = __importDefault(require("../functions/converter"));
const error_1 = require("../mw/error");
const commentsQ_1 = require("../queries/commentsQ");
const authControllersValidators_1 = require("../validators/authControllersValidators");
const deleteComment = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const { commentid, postid } = req.params;
    yield (0, commentsQ_1.deleteCommentQ)(id, postid, commentid);
    res.json({ status: "ok" });
}));
exports.deleteComment = deleteComment;
const getSubComments = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { commentid } = req.params;
    const last = (0, converter_1.default)(req.query);
    const subcomments = yield (0, commentsQ_1.getSubCommentsQ)(guest, id, commentid, last);
    res.json(subcomments);
}));
exports.getSubComments = getSubComments;
const commentLike = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { commentid, postid } = req.params;
    yield (0, commentsQ_1.commentLikeQ)(id, postid, commentid);
    res.json({ status: "ok" });
}));
exports.commentLike = commentLike;
const commentUnLike = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { postid, commentid } = req.params;
    yield (0, commentsQ_1.commentUnLikeQ)(id, postid, commentid);
    res.json({ status: "ok" });
}));
exports.commentUnLike = commentUnLike;
const getCommentLikes = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { commentid } = req.params;
    const last = (0, converter_1.default)(req.query);
    const commentLikes = yield (0, commentsQ_1.getCommentLikesQ)(id, commentid, last);
    res.json(commentLikes);
}));
exports.getCommentLikes = getCommentLikes;
const createSubComment = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    let { content } = req.body;
    const { commentid } = req.params;
    if (!content || (content === null || content === void 0 ? void 0 : content.trim().length) == 0)
        return (0, error_1.badRequest)();
    content = content.replace(/\s+/g, " ").trim().toString();
    const tag = content.split(" ")[0];
    const isdone = tag[0] == "@" &&
        new RegExp(authControllersValidators_1.usernamePattern).test(tag.slice(1)) &&
        tag.length > 1;
    if (!isdone)
        (0, error_1.badRequest)();
    const subCommentId = yield (0, commentsQ_1.createSubCommentQ)(id, commentid, content);
    res.json(subCommentId);
}));
exports.createSubComment = createSubComment;

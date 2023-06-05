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
exports.getSubCommentLikes = exports.subCommentUnlike = exports.subCommentLike = exports.deleteSubComment = void 0;
const converter_1 = __importDefault(require("../functions/converter"));
const error_1 = require("../mw/error");
const subCommentsQ_1 = require("../queries/subCommentsQ");
const deleteSubComment = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { subcommentid } = req.params;
    yield (0, subCommentsQ_1.deleteSubCommentQ)(id, subcommentid);
    res.json({ status: "ok" });
}));
exports.deleteSubComment = deleteSubComment;
const subCommentLike = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { subcommentid } = req.params;
    yield (0, subCommentsQ_1.subCommentLikeQ)(id, subcommentid);
    res.json({ status: "ok" });
}));
exports.subCommentLike = subCommentLike;
const subCommentUnlike = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { subcommentid } = req.params;
    yield (0, subCommentsQ_1.subCommentUnLikeQ)(id, subcommentid);
    res.json({ status: "ok" });
}));
exports.subCommentUnlike = subCommentUnlike;
const getSubCommentLikes = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { subcommentid } = req.params;
    const last = (0, converter_1.default)(req.query);
    const sbcl = yield (0, subCommentsQ_1.getSubCommentLikesQ)(id, subcommentid, last);
    res.json(sbcl);
}));
exports.getSubCommentLikes = getSubCommentLikes;

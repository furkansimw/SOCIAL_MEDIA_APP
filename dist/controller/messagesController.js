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
exports.deleteMessage = exports.getMessages = exports.sendMessage = exports.startRoom = exports.getRoom = exports.getRooms = void 0;
const cloudinary_1 = require("../db/cloudinary");
const converter_1 = __importDefault(require("../functions/converter"));
const error_1 = require("../mw/error");
const messagesQ_1 = require("../queries/messagesQ");
const getRooms = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { requests } = req.query;
    const rooms = yield (0, messagesQ_1.getRoomsQ)(id, requests == "true", (0, converter_1.default)(req.query));
    res.json(rooms);
}));
exports.getRooms = getRooms;
const startRoom = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { userid } = req.body;
    const result = yield (0, messagesQ_1.startRoomQ)(id, userid);
    res.json(result);
}));
exports.startRoom = startRoom;
const getRoom = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { roomid } = req.params;
    const result = yield (0, messagesQ_1.getRoomQ)(id, roomid);
    res.json(result);
}));
exports.getRoom = getRoom;
const sendMessage = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { roomid } = req.params;
    let { content, type, reply, messageid } = req.body;
    type = parseInt(type);
    if (!(type >= 0 && type <= 3))
        (0, error_1.badRequest)();
    if (type == 3) {
        if (!reply)
            (0, error_1.badRequest)();
        const a = yield (0, messagesQ_1.selectReplyForMessage)(reply.substring(0, 36));
        if (a == null)
            (0, error_1.badRequest)();
        reply = `${a.id}-${a.content}`;
    }
    if (type == 1) {
        try {
            content = yield (0, cloudinary_1.upload)(content, messageid, "messages");
        }
        catch (error) {
            res.json(error);
            return;
        }
    }
    const result = yield (0, messagesQ_1.sendMessageQ)(id, roomid, content, type, messageid, reply);
    res.json(result);
}));
exports.sendMessage = sendMessage;
const getMessages = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { roomid } = req.params;
    const result = yield (0, messagesQ_1.getMessagesQ)(id, roomid, (0, converter_1.default)(req.query));
    const messages = result.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
    res.json(messages);
}));
exports.getMessages = getMessages;
const deleteMessage = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals;
    const { roomid, messageid } = req.params;
    const result = yield (0, messagesQ_1.deleteMessageQ)(id, roomid, messageid);
    res.json(result);
}));
exports.deleteMessage = deleteMessage;

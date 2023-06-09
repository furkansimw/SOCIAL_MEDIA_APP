"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mustbeloggedin_1 = __importDefault(require("../mw/mustbeloggedin"));
const messagesController_1 = require("../controller/messagesController");
const messagesRoute = (0, express_1.Router)();
messagesRoute.use(mustbeloggedin_1.default);
messagesRoute.route("/start").post(messagesController_1.startRoom);
messagesRoute.route("/rooms").get(messagesController_1.getRooms);
messagesRoute.route("/rooms/:roomid").get(messagesController_1.getRoom);
exports.default = messagesRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenMw_1 = __importDefault(require("../mw/tokenMw"));
const authRoute_1 = __importDefault(require("./authRoute"));
const postsRoute_1 = __importDefault(require("./postsRoute"));
const apiRoute = (0, express_1.Router)();
apiRoute.use(tokenMw_1.default);
apiRoute.use("/login", authRoute_1.default);
apiRoute.use("/posts", postsRoute_1.default);
exports.default = apiRoute;

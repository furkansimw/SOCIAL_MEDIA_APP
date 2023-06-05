"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
const __1 = require("..");
exports.io = new socket_io_1.Server(__1.server);

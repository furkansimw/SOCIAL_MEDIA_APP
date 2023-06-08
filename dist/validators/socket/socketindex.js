"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const __1 = require("..");
const io = new socket_io_1.Server(__1.server);
exports.default = io;

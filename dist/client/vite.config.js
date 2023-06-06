"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    server: {
        hmr: false,
        proxy: {
            "/api": "http://localhost:4000",
            "/socket.io": "http://localhost:4000",
        },
    },
});

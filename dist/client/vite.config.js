"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:4000/api",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            "/socket.io": {
                target: "http://localhost:4000/socket.io",
            },
        },
    },
});

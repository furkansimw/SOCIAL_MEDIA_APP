import { defineConfig } from "vite";

export default defineConfig({
  server: {
    hmr: false,
    proxy: {
      "/api": "http://localhost:4000",
      "/socket.io": "http://localhost:4000",
    },
  },
});

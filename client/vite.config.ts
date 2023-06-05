import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import dotenv from "dotenv";

export default defineConfig(() => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((acc, key) => {
    acc[`import.meta.env.${key}`] = JSON.stringify(env[key]);
    return acc;
  }, {});
  return {
    plugins: [reactRefresh()],
    define: {
      ...envKeys,
    },
    server: {
      proxy: {
        "/api": {
          target: "https://social-media-app-server-rqig.onrender.com/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});

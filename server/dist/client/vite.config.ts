import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
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
  };
});

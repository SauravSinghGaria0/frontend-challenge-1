import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom", // ✅ This gives your test access to `document`, `window`, etc.
    globals: true,
    include: ["src/**/*.test.ts"],
  },
});

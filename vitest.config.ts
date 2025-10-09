import path from "node:path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts,tsx}"],
    exclude: ["src/**/*.stories.{js,ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "src"),
      "@components": path.resolve(dirname, "src/components"),
      "@assets": path.resolve(dirname, "src/assets"),
      "@styles": path.resolve(dirname, "src/styles"),
      "@types": path.resolve(dirname, "src/types"),
      "@utils": path.resolve(dirname, "src/utils"),
    },
  },
});

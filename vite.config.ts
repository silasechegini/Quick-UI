import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { cssInjectPlugin } from "./css-inject-plugin";
import svgr from "@svgr/rollup";

export default defineConfig({
  plugins: [
    svgr({
      icon: true,
      dimensions: false,
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),

    react(),
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
      include: ["src"],
    }),
    cssInjectPlugin(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
  },

  css: {
    modules: {
      localsConvention: "camelCase",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/_variables.scss" as *;
        @use "@/styles/_mixins.scss" as *;
        @use "@/styles/_utils.scss" as *;
        `,
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/setupTests.ts"],
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "QuickUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },

    rollupOptions: {
      external: ["react", "react-dom"],

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },

        // Ensures all CSS is output to dist/style.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "style.css";
          return assetInfo.name ?? "asset.[ext]";
        },
      },
    },

    sourcemap: true,
    cssCodeSplit: false, // One unified CSS file
    target: "esnext",
  },
});

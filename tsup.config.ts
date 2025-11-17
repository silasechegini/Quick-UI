import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  target: "esnext",
  external: ["react", "react-dom"], // Add your external dependencies here, e.g. ['react', 'lodash']
  esbuildPlugins: [
    sassPlugin({
      type: "css",
    }),
  ],
  esbuildOptions(options) {
    // Suppress warnings about undefined imports for assets
    options.loader = {
      ...options.loader,
      ".scss": "css",
      ".svg": "empty",
    };
    options.logOverride = {
      "import-is-undefined": "silent",
    };
  },
});

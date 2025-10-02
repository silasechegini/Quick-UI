import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  target: "esnext",
  external: ["react", "react-dom"], // Add your external dependencies here, e.g. ['react', 'lodash']
  loader: {
    ".scss": "empty", // Ignore SCSS files during build
    ".svg": "empty", // Ignore SVG files during build
  },
  esbuildOptions(options) {
    // Suppress warnings about undefined imports for assets
    options.logOverride = {
      "import-is-undefined": "silent",
    };
  },
});

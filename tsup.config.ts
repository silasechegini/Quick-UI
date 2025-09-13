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
});

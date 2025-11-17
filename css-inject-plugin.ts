import type { Plugin } from "vite";

export function cssInjectPlugin(): Plugin {
  return {
    name: "css-inject-plugin",

    generateBundle(_, bundle) {
      // Find the output CSS file
      let cssFile = null;

      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type === "asset" && fileName.endsWith(".css")) {
          cssFile = file;
          break;
        }
      }

      if (!cssFile) return;

      // Create JS asset that injects CSS at runtime
      this.emitFile({
        type: "asset",
        fileName: "style-injected.js",
        source: `
          const css = ${JSON.stringify(cssFile.source)};
          const style = document.createElement("style");
          style.textContent = css;
          document.head.appendChild(style);
          export default css;
        `,
      });
    },
  };
}

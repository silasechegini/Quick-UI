// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/documentation/**/*.mdx",
    "../src/documentation/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  viteFinal: async (config) => {
    // Configure CSS modules
    config.css = {
      ...config.css,
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
      preprocessorOptions: {
        scss: {},
      },
    };

    // Set up path aliases
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@assets": path.resolve(__dirname, "../src/assets"),
        "@components": path.resolve(__dirname, "../src/components"),
        "@utils": path.resolve(__dirname, "../src/utils"),
        "@": path.resolve(__dirname, "../src"),
      },
    };

    return config;
  },
};
export default config;

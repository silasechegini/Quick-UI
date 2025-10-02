import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import svgr from "vite-plugin-svgr";

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
    // Ensure plugins array exists
    config.plugins = [...(config.plugins || [])];

    // Add SVGR plugin
    config.plugins.push(
      svgr({
        svgrOptions: {
          exportType: "named",
        },
        include: "**/*.svg",
      }),
    );

    // Configure CSS modules
    config.css = {
      ...config.css,
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
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

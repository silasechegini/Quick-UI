import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
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

  viteFinal: async (config, { configType }) => {
    config.plugins = [...(config.plugins || [])];

    config.plugins.unshift(
      svgr({
        svgrOptions: {
          exportType: "named", // to use ReactComponent export
        },
        include: "**/*.svg", // make sure this includes your SVGs
      }),
    );

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

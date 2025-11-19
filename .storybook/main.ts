// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import path, { dirname } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

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

  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop?.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  viteFinal: async (config) => {
    // Add TypeScript path resolution
    config.plugins = config?.plugins || [];
    config.plugins.push(
      tsconfigPaths({
        projects: [path.resolve(__dirname, "./tsconfig.json")],
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
          additionalData: `
            @use "@/styles/_variables.scss" as *;
            @use "@/styles/_mixins.scss" as *;
            @use "@/styles/_utils.scss" as *;
          `,
        },
      },
    };

    // Set up path aliases to match tsconfig.json paths
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@assets": path.resolve(__dirname, "../src/assets"),
        "@components": path.resolve(__dirname, "../src/components"),
        "@utils": path.resolve(__dirname, "../src/utils"),
        "@styles": path.resolve(__dirname, "../src/styles"),
        "@": path.resolve(__dirname, "../src"),
      },
    };

    return config;
  },
};
export default config;

// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Add React support
  {
    files: ["**/*.tsx", "**/*.jsx"],
    plugins: {
      react,
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/jsx-uses-react": "off", // not needed with React 17+
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/alt-text": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // TypeScript-specific overrides
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      // parserOptions: {
      //     project: ["./tsconfig.json"],
      //     sourceType: "module",
      //     tsconfigRootDir: __dirname,
      // },
    },
    rules: {
      // Add or override TypeScript-specific rules here
    },
  },

  // Node.js/CommonJS files configuration
  {
    files: [
      "jest.config.js",
      "__mocks__/**/*.js",
      "*.config.js",
      "scripts/**/*.js",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
        global: "readonly",
        Buffer: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
];

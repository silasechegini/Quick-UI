/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // Add this:
  moduleNameMapper: {
    // CSS modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Support path aliases
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@assets$": "<rootDir>/src/assets",

    // Plain CSS (optional)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    // SVG files - mock them properly
    "^.+\\.svg$": "<rootDir>/__mocks__/svgMock.js",

    // Other static assets
    "^.+\\.(png|jpg|jpeg|gif)$": "identity-obj-proxy",
  },

  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: false }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)"],
};

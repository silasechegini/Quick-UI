import "@testing-library/jest-dom";
import { beforeAll } from "vitest";

beforeAll(() => {
  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // Suppress console.error for icon not found messages in tests
  const originalError = console.error;
  console.error = (...args: Array<unknown>) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Icon") &&
      args[0].includes("not found")
    ) {
      return; // Suppress icon not found errors
    }
    originalError.call(console, ...args);
  };
});

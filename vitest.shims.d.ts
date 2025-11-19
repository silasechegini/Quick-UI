/// <reference types="vitest/globals" />
/// <reference types="@vitest/browser/providers/playwright" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare global {
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface AssertionMethods<T = unknown>
      extends TestingLibraryMatchers<T, void> {}
  }
}

// CSS Module declarations
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

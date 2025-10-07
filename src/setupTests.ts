import "@testing-library/jest-dom";
import { beforeAll, vi } from "vitest";

beforeAll(() => {
  global.jest = {
    fn: vi.fn,
    mock: vi.mock,
    requireActual: vi.importActual,
    spyOn: vi.spyOn,
    clearAllMocks: vi.clearAllMocks,
    resetAllMocks: vi.resetAllMocks,
    restoreAllMocks: vi.restoreAllMocks,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
});

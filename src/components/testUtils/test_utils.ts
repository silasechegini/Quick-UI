/**
 * Mock getBoundingClientRect for a given element.
 * Useful for simulating track dimensions in slider tests.
 */
export function mockBoundingClientRect(
  el: HTMLElement,
  rect: Partial<DOMRect> = {},
) {
  const defaultRect: DOMRect = {
    x: 0,
    y: 0,
    width: 100,
    height: 10,
    top: 0,
    left: 0,
    right: 100,
    bottom: 10,
    toJSON: () => {},
  };

  Object.defineProperty(el, "getBoundingClientRect", {
    value: () => ({ ...defaultRect, ...rect }),
    configurable: true,
  });
}

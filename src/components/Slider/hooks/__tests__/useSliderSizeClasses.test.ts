import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useSliderSizeClasses } from "../useSliderSizeClasses";

// Mock styles object that mimics CSS modules
const mockStyles = {
  sliderSmall: "slider-small-class",
  sliderMedium: "slider-medium-class",
  sliderLarge: "slider-large-class",
  trackSmall: "track-small-class",
  trackMedium: "track-medium-class",
  trackLarge: "track-large-class",
  filledSmall: "filled-small-class",
  filledMedium: "filled-medium-class",
  filledLarge: "filled-large-class",
  thumbSmall: "thumb-small-class",
  thumbMedium: "thumb-medium-class",
  thumbLarge: "thumb-large-class",
};

describe("useSliderSizeClasses", () => {
  describe("size class mapping", () => {
    it("should return correct classes for small size", () => {
      const { result } = renderHook(() =>
        useSliderSizeClasses(mockStyles, "small"),
      );

      expect(result.current).toEqual({
        slider: "slider-small-class",
        track: "track-small-class",
        filled: "filled-small-class",
        thumb: "thumb-small-class",
      });
    });

    it("should return correct classes for medium size", () => {
      const { result } = renderHook(() =>
        useSliderSizeClasses(mockStyles, "medium"),
      );

      expect(result.current).toEqual({
        slider: "slider-medium-class",
        track: "track-medium-class",
        filled: "filled-medium-class",
        thumb: "thumb-medium-class",
      });
    });

    it("should return correct classes for large size", () => {
      const { result } = renderHook(() =>
        useSliderSizeClasses(mockStyles, "large"),
      );

      expect(result.current).toEqual({
        slider: "slider-large-class",
        track: "track-large-class",
        filled: "filled-large-class",
        thumb: "thumb-large-class",
      });
    });
  });

  describe("memoization behavior", () => {
    it("should return the same object reference when size doesn't change", () => {
      const { result, rerender } = renderHook(
        ({ size }: { size: "small" | "medium" | "large" }) =>
          useSliderSizeClasses(mockStyles, size),
        { initialProps: { size: "medium" as const } },
      );

      const firstResult = result.current;

      // Rerender with same size
      rerender({ size: "medium" });

      expect(result.current).toBe(firstResult);
    });

    it("should return different object reference when size changes", () => {
      const { result, rerender } = renderHook(
        ({ size }: { size: "small" | "medium" | "large" }) =>
          useSliderSizeClasses(mockStyles, size),
        { initialProps: { size: "medium" } },
      );

      const firstResult = result.current;

      // Rerender with different size
      rerender({ size: "large" });

      expect(result.current).not.toBe(firstResult);
      expect(result.current).toEqual({
        slider: "slider-large-class",
        track: "track-large-class",
        filled: "filled-large-class",
        thumb: "thumb-large-class",
      });
    });

    it("should return different object reference when styles object changes but size stays same", () => {
      const { result, rerender } = renderHook(
        ({
          styles,
          size,
        }: {
          styles: Record<string, string>;
          size: "small" | "medium" | "large";
        }) => useSliderSizeClasses(styles, size),
        {
          initialProps: {
            styles: mockStyles,
            size: "medium" as const,
          },
        },
      );

      // Rerender with new styles object but same size
      const newStyles = { ...mockStyles };
      rerender({ styles: newStyles, size: "medium" });

      // Should now return a new object since styles changed
      expect(result.current).toEqual({
        slider: "slider-medium-class",
        track: "track-medium-class",
        filled: "filled-medium-class",
        thumb: "thumb-medium-class",
      });
    });

    it("should return the same object reference when styles object and size stays same", () => {
      const { result, rerender } = renderHook(
        ({
          styles,
          size,
        }: {
          styles: Record<string, string>;
          size: "small" | "medium" | "large";
        }) => useSliderSizeClasses(styles, size),
        {
          initialProps: {
            styles: mockStyles,
            size: "medium" as const,
          },
        },
      );

      const firstResult = result.current;

      // Rerender with new styles object but same size
      const newStyles = { ...mockStyles };
      rerender({ styles: newStyles, size: "medium" });

      // Should be a different object reference, but contents should be equal
      expect(result.current).not.toBe(firstResult);
      expect(result.current).toEqual(firstResult);
    });
  });

  describe("edge cases", () => {
    it("should handle missing style classes gracefully", () => {
      const incompleteStyles = {
        sliderSmall: "slider-small-class",
        // Missing other classes
      };

      const { result } = renderHook(() =>
        useSliderSizeClasses(incompleteStyles, "small"),
      );

      expect(result.current).toEqual({
        slider: "slider-small-class",
        track: undefined,
        filled: undefined,
        thumb: undefined,
      });
    });

    it("should handle empty styles object", () => {
      const emptyStyles = {};

      const { result } = renderHook(() =>
        useSliderSizeClasses(emptyStyles, "medium"),
      );

      expect(result.current).toEqual({
        slider: undefined,
        track: undefined,
        filled: undefined,
        thumb: undefined,
      });
    });
  });

  describe("type safety", () => {
    it("should work with different styles object shapes", () => {
      const customStyles = {
        sliderSmall: "custom-slider-sm",
        sliderMedium: "custom-slider-md",
        sliderLarge: "custom-slider-lg",
        trackSmall: "custom-track-sm",
        trackMedium: "custom-track-md",
        trackLarge: "custom-track-lg",
        filledSmall: "custom-filled-sm",
        filledMedium: "custom-filled-md",
        filledLarge: "custom-filled-lg",
        thumbSmall: "custom-thumb-sm",
        thumbMedium: "custom-thumb-md",
        thumbLarge: "custom-thumb-lg",
        // Additional properties should be ignored
        someOtherClass: "ignored",
      };

      const { result } = renderHook(() =>
        useSliderSizeClasses(customStyles, "large"),
      );

      expect(result.current).toEqual({
        slider: "custom-slider-lg",
        track: "custom-track-lg",
        filled: "custom-filled-lg",
        thumb: "custom-thumb-lg",
      });
    });
  });

  describe("performance", () => {
    it("should not create new objects on every render when size is stable", () => {
      const results: { [key: string]: string }[] = [];

      const { rerender } = renderHook(() => {
        const result = useSliderSizeClasses(mockStyles, "medium");
        results.push(result);
        return result;
      });

      // Trigger multiple rerenders
      rerender();
      rerender();
      rerender();

      // All results should be the same object reference
      expect(results).toHaveLength(4); // Initial + 3 rerenders
      expect(results[0]).toBe(results[1]);
      expect(results[1]).toBe(results[2]);
      expect(results[2]).toBe(results[3]);
    });
  });
});

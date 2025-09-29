import { renderHook, act } from "@testing-library/react";
import { useSlider } from "../useSlider";

describe("useSlider", () => {
  describe("single value mode", () => {
    it("should initialize with default value", () => {
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
        }),
      );

      expect(result.current.value).toBe(50);
    });

    it("should use controlled value when provided", () => {
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
          controlledValue: 75,
        }),
      );

      expect(result.current.value).toBe(75);
    });

    it("should update internal value when not controlled", () => {
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
        }),
      );

      act(() => {
        result.current.updateValue(75);
      });

      expect(result.current.value).toBe(75);
    });

    it("should not update internal value when controlled", () => {
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
          controlledValue: 60,
        }),
      );

      act(() => {
        result.current.updateValue(75);
      });

      // Value should remain the controlled value
      expect(result.current.value).toBe(60);
    });

    it("should call onChange callback when value updates", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
          onChange,
        }),
      );

      act(() => {
        result.current.updateValue(75);
      });

      expect(onChange).toHaveBeenCalledWith(75);
    });

    it("should clamp values to min/max bounds", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
          onChange,
        }),
      );

      // Test upper bound
      act(() => {
        result.current.updateValue(150);
      });
      expect(onChange).toHaveBeenLastCalledWith(100);

      // Test lower bound
      act(() => {
        result.current.updateValue(-10);
      });
      expect(onChange).toHaveBeenLastCalledWith(0);
    });

    it("should round values to nearest step", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 0,
          max: 100,
          step: 5,
          defaultValue: 50,
          onChange,
        }),
      );

      // Test rounding down
      act(() => {
        result.current.updateValue(37);
      });
      expect(onChange).toHaveBeenLastCalledWith(35);

      // Test rounding up
      act(() => {
        result.current.updateValue(38);
      });
      expect(onChange).toHaveBeenLastCalledWith(40);
    });

    it("should handle decimal steps correctly", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 0,
          max: 1,
          step: 0.1,
          defaultValue: 0.5,
          onChange,
        }),
      );

      act(() => {
        result.current.updateValue(0.37);
      });
      expect(onChange).toHaveBeenLastCalledWith(0.4);
    });
  });

  describe("range value mode", () => {
    it("should initialize with default range value", () => {
      const { result } = renderHook(() =>
        useSlider({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: [20, 80] as [number, number],
        }),
      );

      expect(result.current.value).toEqual([20, 80]);
    });

    it("should use controlled range value when provided", () => {
      const { result } = renderHook(() =>
        useSlider({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: [20, 80] as [number, number],
          controlledValue: [30, 70] as [number, number],
        }),
      );

      expect(result.current.value).toEqual([30, 70]);
    });

    it("should update internal range value when not controlled", () => {
      const { result } = renderHook(() =>
        useSlider({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: [20, 80] as [number, number],
        }),
      );

      act(() => {
        result.current.updateValue([30, 70] as [number, number]);
      });

      expect(result.current.value).toEqual([30, 70]);
    });

    it("should not update internal range value when controlled", () => {
      const { result } = renderHook(() =>
        useSlider({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: [20, 80] as [number, number],
          controlledValue: [25, 75] as [number, number],
        }),
      );

      act(() => {
        result.current.updateValue([30, 70] as [number, number]);
      });

      // Value should remain the controlled value
      expect(result.current.value).toEqual([25, 75]);
    });

    it("should call onChange callback with range value", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: [20, 80] as [number, number],
          onChange,
        }),
      );

      act(() => {
        result.current.updateValue([30, 70] as [number, number]);
      });

      expect(onChange).toHaveBeenCalledWith([30, 70]);
    });

    it("should clamp both range values to min/max bounds", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: [20, 80] as [number, number],
          onChange,
        }),
      );

      act(() => {
        result.current.updateValue([-10, 150] as [number, number]);
      });

      expect(onChange).toHaveBeenCalledWith([0, 100]);
    });

    it("should round both range values to nearest step", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider({
          min: 0,
          max: 100,
          step: 5,
          defaultValue: [20, 80] as [number, number],
          onChange,
        }),
      );

      act(() => {
        result.current.updateValue([23, 87] as [number, number]);
      });

      expect(onChange).toHaveBeenCalledWith([25, 85]);
    });

    it("should handle overlapping range values", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider({
          min: 0,
          max: 100,
          step: 1,
          defaultValue: [20, 80] as [number, number],
          onChange,
        }),
      );

      // Test where both values end up at the same position
      act(() => {
        result.current.updateValue([50, 50] as [number, number]);
      });

      expect(onChange).toHaveBeenCalledWith([50, 50]);
    });
  });

  describe("edge cases", () => {
    it("should handle min equals max", () => {
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 50,
          max: 50,
          step: 1,
          defaultValue: 50,
        }),
      );

      expect(result.current.value).toBe(50);

      act(() => {
        result.current.updateValue(100);
      });

      expect(result.current.value).toBe(50);
    });

    it("should handle step larger than range", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider<number>({
          min: 0,
          max: 10,
          step: 15,
          defaultValue: 5,
          onChange,
        }),
      );

      act(() => {
        result.current.updateValue(7);
      });

      // Should round to nearest valid step (0 in this case)
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it("should handle negative ranges", () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useSlider<number>({
          min: -100,
          max: -50,
          step: 5,
          defaultValue: -75,
          onChange,
        }),
      );

      act(() => {
        result.current.updateValue(-67);
      });

      expect(onChange).toHaveBeenCalledWith(-65);
    });

    it("should memoize updateValue function properly", () => {
      const onChange = jest.fn();
      const { result, rerender } = renderHook(
        ({ min, max, step, defaultValue, controlledValue, onChange }) =>
          useSlider<number>({
            min,
            max,
            step,
            defaultValue,
            controlledValue,
            onChange,
          }),
        {
          initialProps: {
            min: 0,
            max: 100,
            step: 1,
            defaultValue: 50,
            controlledValue: undefined,
            onChange,
          },
        },
      );

      const firstUpdateValue = result.current.updateValue;

      // Rerender with same props
      rerender({
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        controlledValue: undefined,
        onChange,
      });

      // updateValue should be the same reference
      expect(result.current.updateValue).toBe(firstUpdateValue);

      // Rerender with different props
      rerender({
        min: 0,
        max: 200, // Changed
        step: 1,
        defaultValue: 50,
        controlledValue: undefined,
        onChange,
      });

      // updateValue should be a new reference
      expect(result.current.updateValue).not.toBe(firstUpdateValue);
    });
  });
});

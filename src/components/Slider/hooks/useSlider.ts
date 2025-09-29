import { useState, useCallback } from "react";
import { clamp, roundToStep } from "../utils/math";

interface UseSliderProps<T extends number | [number, number]> {
  min: number;
  max: number;
  step: number;
  defaultValue: T;
  controlledValue?: T;
  onChange?: (val: T) => void;
}

export function useSlider<T extends number | [number, number]>({
  min,
  max,
  step,
  defaultValue,
  controlledValue,
  onChange,
}: UseSliderProps<T>) {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const updateValue = useCallback(
    (newVal: T) => {
      const next = Array.isArray(newVal)
        ? ([
            roundToStep(clamp(newVal[0], min, max), step, min),
            roundToStep(clamp(newVal[1], min, max), step, min),
          ] as T)
        : (roundToStep(clamp(newVal as number, min, max), step, min) as T);

      // Only update internal state if not controlled
      if (controlledValue === undefined) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [min, max, step, controlledValue, onChange],
  );

  return { value, updateValue };
}

import { useState, useCallback } from "react";
import { clamp, roundToStep } from "../utils/math";

interface UseSliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue: number | [number, number];
  onChange?: (val: number | [number, number]) => void;
}

export function useSlider({
  min,
  max,
  step,
  defaultValue,
  onChange,
}: UseSliderProps) {
  const [value, setValue] = useState<number | [number, number]>(defaultValue);

  const updateValue = useCallback(
    (newVal: number | [number, number]) => {
      const next: number | [number, number] = Array.isArray(newVal)
        ? [
            roundToStep(clamp(newVal[0], min, max), step, min),
            roundToStep(clamp(newVal[1], min, max), step, min),
          ]
        : roundToStep(clamp(newVal, min, max), step, min);

      setValue(next);
      onChange?.(next);
    },
    [min, max, step, onChange],
  );

  return { value, updateValue };
}

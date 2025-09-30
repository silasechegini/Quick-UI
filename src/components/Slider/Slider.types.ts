export interface BaseSliderProps {
  min?: number;
  max?: number;
  step?: number;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
}

export interface SingleValueSliderProps extends BaseSliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export interface RangeSliderProps extends BaseSliderProps {
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
}

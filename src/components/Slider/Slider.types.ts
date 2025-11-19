/* Slider component type definitions */

/** Enums for Slider component props */
export enum SLIDER_SIZES {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

/** Type aliases for Slider component props */
export type SliderSize = (typeof SLIDER_SIZES)[keyof typeof SLIDER_SIZES];

/** Props for the Slider component */
export interface BaseSliderProps {
  min?: number;
  max?: number;
  step?: number;
  size?: SliderSize;
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

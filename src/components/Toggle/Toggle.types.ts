import { InputHTMLAttributes } from "react";

/* Toggle component type definitions */

/** Enums for Toggle component props */
export enum TOGGLE_SIZES {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

/** Type aliases for Toggle component props */
export type ToggleSize = (typeof TOGGLE_SIZES)[keyof typeof TOGGLE_SIZES];

export type ToggleProps = {
  /**
   * The size of the toggle
   * @default 'medium'
   */
  size?: ToggleSize;

  /**
   * Whether the toggle is checked
   */
  checked?: boolean;

  /**
   * Default checked state for uncontrolled component
   */
  defaultChecked?: boolean;

  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Label text for the toggle
   */
  label?: string;

  /**
   * Description text shown below the label
   */
  description?: string;

  /**
   * Whether there's an error state
   * @default false
   */
  error?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Custom className for the toggle container
   */
  className?: string;

  /**
   * Custom className for the slider element
   */
  sliderClassName?: string;

  /**
   * Custom className for the label
   */
  labelClassName?: string;

  /**
   * Custom className for the input
   */
  inputClassName?: string;

  /**
   * Callback function called when the toggle state changes
   */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "type">;

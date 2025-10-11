import { InputHTMLAttributes } from "react";
import { IconKey } from "../../assets/iconType";

export type InputVariant = "primary" | "secondary" | "error" | "success";

export type InputSize = "xs" | "s" | "m" | "l" | "xl";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Visual style variant of the input
   * @default 'primary'
   */
  variant?: InputVariant;

  /**
   * Size of the input
   * @default 'm'
   */
  size?: InputSize;

  /**
   * Whether the input should take full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Optional label text
   */
  label?: string;

  /**
   * Optional helper text displayed below the input
   */
  helperText?: string;

  /**
   * Whether to show an error state
   * @default false
   */
  error?: boolean;

  /**
   * Optional error message
   */
  errorMessage?: string;

  /**
   * Whether the input is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Icon to display at the start of the input
   */
  startIcon?: IconKey;

  /**
   * Icon to display at the end of the input
   */
  endIcon?: IconKey;

  /**
   * Whether the input should show a clear button when it has value
   * @default false
   */
  clearable?: boolean;

  /**
   * Callback when clear button is clicked
   */
  onClear?: () => void;

  /**
   * Custom class name for the input container
   */
  containerClassName?: string;

  /**
   * Configuration for the input
   */
  configuration?: "multi-select" | "";
}

export interface DebouncedInputProps extends Omit<InputProps, "onChange"> {
  /**
   * Callback function called after debounce delay
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceDelay?: number;
}

export enum INPUT_CONFIGURATIONS {
  SINGLE = "single",
  MULTI_SELECT = "multi-select",
}

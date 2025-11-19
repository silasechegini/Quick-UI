import { InputHTMLAttributes } from "react";
import { IconKey } from "@assets/iconType";

/**
 * Enums and types for Input component variants and sizes
 */

/** Enums for Input component variants and sizes */
export enum INPUT_VARIANTS {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  SUCCESS = "success",
}

export enum INPUT_SIZES {
  XS = "xs",
  S = "s",
  M = "m",
  L = "l",
  XL = "xl",
}

export enum INPUT_CONFIGURATIONS {
  SINGLE = "single",
  MULTI_SELECT = "multi-select",
}

/** Type aliases for Input component props */
export type InputVariant = (typeof INPUT_VARIANTS)[keyof typeof INPUT_VARIANTS];
export type InputSize = (typeof INPUT_SIZES)[keyof typeof INPUT_SIZES];
export type InputConfiguration =
  (typeof INPUT_CONFIGURATIONS)[keyof typeof INPUT_CONFIGURATIONS];
/** Props for the Input component */
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
  configuration?: InputConfiguration;
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

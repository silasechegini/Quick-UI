import { InputHTMLAttributes } from "react";

export type ToggleSize = "small" | "medium" | "large";

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

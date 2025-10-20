import { ReactNode } from "react";
import { IconKey } from "@assets/iconType";

export type SwitchSize = "small" | "medium" | "large";
export type SwitchVariant = "primary" | "secondary" | "success" | "danger";

export interface SwitchProps {
  /**
   * Whether the switch is checked (controlled mode)
   */
  checked?: boolean;

  /**
   * Default checked state (uncontrolled mode)
   */
  defaultChecked?: boolean;

  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;

  /**
   * Size of the switch
   */
  size?: SwitchSize;

  /**
   * Visual variant/color scheme
   */
  variant?: SwitchVariant;

  /**
   * Label text for the switch
   */
  label?: ReactNode;

  /**
   * Position of the label relative to the switch
   */
  labelPosition?: "left" | "right";

  /**
   * Additional CSS class for the container
   */
  className?: string;

  /**
   * Additional CSS class for the label
   */
  labelClassName?: string;

  /**
   * Additional CSS class for the switch element
   */
  switchClassName?: string;

  /**
   * Icon to display in the thumb when checked
   */
  checkedIcon?: IconKey | ReactNode;

  /**
   * Icon to display in the thumb when unchecked
   */
  uncheckedIcon?: IconKey | ReactNode;

  /**
   * Size of the icon in the thumb (in pixels)
   */
  iconSize?: number;

  /**
   * Callback function called when the switch state changes
   */
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * ID for the switch input element
   */
  id?: string;

  /**
   * Name attribute for the input element (useful for forms)
   */
  name?: string;

  /**
   * Value attribute for the input element
   */
  value?: string;

  /**
   * Whether the switch is required in a form
   */
  required?: boolean;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA described by for accessibility
   */
  "aria-describedby"?: string;
}

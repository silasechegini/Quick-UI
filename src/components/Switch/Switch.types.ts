import { ReactNode } from "react";
import { IconKey } from "@assets/iconType";

/**
 * Switch component types and enums
 */

// enum for switch label positions

// Label position options
export enum SWITCH_LABEL_POSITIONS {
  LEFT = "left",
  RIGHT = "right",
}

// Size options for the Switch component
export enum SWITCH_SIZES {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

// Variant/color scheme options for the Switch component
export enum SWITCH_VARIANTS {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
}

// Type definitions for Switch component props
export type SwitchSize = (typeof SWITCH_SIZES)[keyof typeof SWITCH_SIZES];

export type SwitchVariant =
  (typeof SWITCH_VARIANTS)[keyof typeof SWITCH_VARIANTS];

export type SwitchLabelPosition =
  (typeof SWITCH_LABEL_POSITIONS)[keyof typeof SWITCH_LABEL_POSITIONS];

// Props for the Switch component
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
  labelPosition?: SwitchLabelPosition;

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
   * CSS color for the checked icon (e.g., "#fff", "rgb(255,255,255)", "var(--color)").
   * Applied to the built-in Icon when checked; has no effect for custom ReactNode icons.
   */
  checkedIconColor?: string;

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

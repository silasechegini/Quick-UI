import { ButtonHTMLAttributes, ReactNode, ElementType } from "react";

/**
 * Button Component Types and Enums
 * This file defines the types and enums used in the Button component.
 * It includes props for different button variants, sizes, and icon positions.
 * It also defines the base props for the button and specific props for icon buttons.
 */
export type ButtonVariants = "primary" | "secondary" | "tertiary" | "plain";
type ButtonSizes = "xxl" | "xl" | "l" | "m" | "s" | "xs" | "fullWidth";
type IconPosition = "start" | "end" | "default";
type ButtonShapes = "square" | "circular" | "pill";

/**
 * BaseProps - Common properties for all button types
 * @property {ReactNode} children - The content of the button
 * @property {ButtonSizes} size - The size of the button
 * @property {ButtonVariants} variant - The variant/style of the button
 * @property {ReactNode} icon - Optional icon to display in the button
 * @property {IconPosition} iconPosition - Position of the icon (start or end)
 * @property {boolean} isLoading - Whether the button is in a loading state
 * @property {string} loadingText - Text to display when loading
 * @property {boolean} fullWidth - Whether the button should take full width
 * @property {ElementType} as - The HTML element or component to render as  (e.g., 'button', 'a', etc.)
 * @property {string} className - Additional CSS class names
 * @property {string} ariaLabel - ARIA label for accessibility
 */
type BaseProps = {
  children?: ReactNode;
  size?: ButtonSizes;
  variant?: ButtonVariants;
  shape?: ButtonShapes;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  as?: ElementType;
  className?: string;
  ariaLabel?: string;
};

/**
 * StyleOverride - Custom styles for the button
 * @property {string} className - Custom CSS class name
 * @property {React.CSSProperties} style - Inline styles
 */
export type StyleOverride = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * ButtonProps - Props for the Button component
 * Extends BaseProps and standard button HTML attributes (excluding 'type')
 * @property {("button" | "submit" | "reset")} type - The button type attribute
 * @property {StyleOverride} styleOverride - Custom styles for the button
 */
export type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    type?: "button" | "submit" | "reset";
    styleOverride?: StyleOverride;
  };

/**
 * IconButtonProps - Props specific to icon-only buttons
 * Extends BaseProps but omits children and iconPosition
 * @property {string} label - Accessible label for the icon button
 */
export type IconButtonProps = Omit<ButtonProps, "children" | "iconPosition"> & {
  label: string;
};

/**
 * Enums for Button Component
 * These enums define the possible values for button types, sizes, variants, and icon positions.
 */
export enum BUTTON_TYPES {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}

/** Enums for Button Sizes, Variants, and Icon Positions */
export enum BUTTON_SIZES {
  XXLARGE = "xxl",
  XLARGE = "xl",
  LARGE = "l",
  MEDIUM = "m",
  SMALL = "s",
  EXTRASMALL = "xs",
  DEFAULT = "fullWidth",
}

/** Enums for Button Variants */
export const BUTTON_VARIANTS = {
  PRIMARY: "primary" as const,
  SECONDARY: "secondary" as const,
  TERTIARY: "tertiary" as const,
  PLAIN: "plain" as const,
};

export enum BUTTON_SHAPES {
  SQUARE = "square",
  CIRCULAR = "circular",
  PILL = "pill",
}

/** Enums for Icon Positions */
export enum ICON_POSITIONS {
  START = "start",
  END = "end",
  DEFAULT = "default",
}

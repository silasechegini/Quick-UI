import { ReactNode, CSSProperties } from "react";
import { IconType } from "react-icons";

/**
 * Star Rating Component Types
 */

// Enums for sizes and variants
export enum STAR_SIZES {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  EXTRA_LARGE = "xLarge",
}

export enum STAR_VARIANTS {
  FILLED = "filled",
  OUTLINED = "outlined",
  ROUNDED = "rounded",
}

// Type definitions
export type StarSize = (typeof STAR_SIZES)[keyof typeof STAR_SIZES];
export type StarVariant = (typeof STAR_VARIANTS)[keyof typeof STAR_VARIANTS];

export interface StarRatingProps {
  /**
   * The number of stars to display
   * @default 5
   */
  count?: number;

  /**
   * Current rating value (controlled mode)
   * Should be between 0 and count
   */
  value?: number;

  /**
   * Default rating value (uncontrolled mode)
   * @default 0
   */
  defaultValue?: number;

  /**
   * Called when the rating changes
   */
  onChange?: (rating: number) => void;

  /**
   * Called when a star is clicked
   */
  onStarClick?: (starIndex: number, rating: number) => void;

  /**
   * Called when mouse enters a star
   */
  onStarHover?: (starIndex: number, rating: number) => void;

  /**
   * Called when mouse leaves the rating component
   */
  onStarLeave?: () => void;

  /**
   * Size of the stars
   * @default "medium"
   */
  size?: StarSize | number;

  /**
   * Visual variant of the stars
   * @default "filled"
   */
  variant?: StarVariant;

  /**
   * Color of filled/active stars
   * @default "#ffc107"
   */
  activeColor?: string;

  /**
   * Color of empty/inactive stars
   * @default "#e4e5e9"
   */
  inactiveColor?: string;

  /**
   * Color of hovered stars
   */
  hoverColor?: string;

  /**
   * Custom icon for filled stars
   */
  filledIcon?: IconType;

  /**
   * Custom icon for empty stars
   */
  emptyIcon?: IconType;

  /**
   * Enable half-star ratings
   * @default false
   */
  allowHalf?: boolean;

  /**
   * Make the rating read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Disable the rating component
   * @default false
   */
  disabled?: boolean;

  /**
   * Show rating value as text
   * @default false
   */
  showValue?: boolean;

  /**
   * Custom value formatter
   */
  valueFormatter?: (value: number) => string;

  /**
   * Custom class name for the container
   */
  className?: string;

  /**
   * Custom styles for the container
   */
  style?: CSSProperties;

  /**
   * Custom class name for individual stars
   */
  starClassName?: string;

  /**
   * Custom styles for individual stars
   */
  starStyle?: CSSProperties;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA labelledby for accessibility
   */
  "aria-labelledby"?: string;

  /**
   * ID for the rating component
   */
  id?: string;

  /**
   * Test ID for testing purposes
   */
  "data-testid"?: string;

  /**
   * Custom content to display alongside the rating
   */
  children?: ReactNode;
}

export interface StarItemProps {
  filled: boolean;
  halfFilled?: boolean;
  hovered: boolean;
  size: number;
  activeColor: string;
  inactiveColor: string;
  hoverColor?: string;
  filledIcon?: IconType;
  emptyIcon?: IconType;
  variant: StarVariant;
  disabled: boolean;
  readOnly: boolean;
  onClick: (event: React.MouseEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  tabIndex?: number;
  className?: string;
  style?: CSSProperties;
  index: number;
  "aria-label"?: string;
  "aria-checked"?: boolean;
}

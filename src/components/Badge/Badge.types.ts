import { HTMLAttributes, ReactNode } from "react";

/**
 * Badge Component Types and Enums
 * Badges are small status descriptors or notification indicators
 */

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "neutral";

export type BadgeSize = "sm" | "md" | "lg";

export type BadgePosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "inline";

export type BadgeType = "standard" | "dot";

/**
 * BadgeProps - Props for the Badge component
 * @property {ReactNode} children - The element to attach the badge to (e.g., icon)
 * @property {number} count - Numeric count to display in badge
 * @property {number} max - Maximum count before showing "max+" (default: 99)
 * @property {boolean} showZero - Show badge when count is 0 (default: false)
 * @property {BadgeVariant} variant - Color variant (default: "primary")
 * @property {BadgeSize} size - Size of the badge (default: "md")
 * @property {BadgePosition} position - Position relative to children (default: "top-right")
 * @property {BadgeType} type - Badge type: standard or dot (default: "standard")
 * @property {boolean} pulse - Add pulse animation (default: false)
 * @property {boolean} invisible - Hide the badge (default: false)
 * @property {ReactNode} content - Custom content instead of count
 * @property {string} className - Additional CSS classes
 * @property {string} badgeClassName - Additional CSS classes for badge element
 */
export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "content"> & {
  children?: ReactNode;
  count?: number;
  max?: number;
  showZero?: boolean;
  variant?: BadgeVariant;
  size?: BadgeSize;
  position?: BadgePosition;
  type?: BadgeType;
  pulse?: boolean;
  invisible?: boolean;
  content?: ReactNode;
  className?: string;
  badgeClassName?: string;
};

/**
 * Enums for Badge Component
 */
export enum BADGE_VARIANTS {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  NEUTRAL = "neutral",
}

export enum BADGE_SIZES {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export enum BADGE_POSITIONS {
  TOP_RIGHT = "top-right",
  TOP_LEFT = "top-left",
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM_LEFT = "bottom-left",
  INLINE = "inline",
}

export enum BADGE_TYPES {
  STANDARD = "standard",
  DOT = "dot",
}

import { HTMLAttributes, ReactNode } from "react";

/**
 * ProgressBar Component Types and Enums
 * This file defines the types and enums used in the ProgressBar component.
 * It includes props for different variants, sizes, and display options.
 */

/**
 * Enums for ProgressBar Component
 * These enums define the possible values for variants, sizes, and shapes.
 */

export enum PROGRESS_BAR_VARIANTS {
  DEFAULT = "default",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

export enum PROGRESS_BAR_SIZES {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum PROGRESS_BAR_SHAPES {
  ROUNDED = "rounded",
  SQUARE = "square",
}

export type ProgressBarVariants =
  (typeof PROGRESS_BAR_VARIANTS)[keyof typeof PROGRESS_BAR_VARIANTS];
export type ProgressBarSizes =
  (typeof PROGRESS_BAR_SIZES)[keyof typeof PROGRESS_BAR_SIZES];
export type ProgressBarShapes =
  (typeof PROGRESS_BAR_SHAPES)[keyof typeof PROGRESS_BAR_SHAPES];

/**
 * ProgressBarProps - Props for the ProgressBar component
 * @property {number} value - Current progress value (0-100)
 * @property {number} max - Maximum value (default: 100)
 * @property {ProgressBarVariants} variant - Visual variant/theme of the progress bar
 * @property {ProgressBarSizes} size - Size of the progress bar
 * @property {ProgressBarShapes} shape - Shape style of the progress bar
 * @property {boolean} showPercentage - Whether to display percentage text
 * @property {boolean} showValue - Whether to display current value/max
 * @property {string} label - Accessible label for the progress bar
 * @property {ReactNode} children - Custom content to display inside or alongside
 * @property {string} className - Additional CSS classes
 * @property {boolean} striped - Whether to show striped pattern
 * @property {boolean} animated - Whether stripes should be animated
 * @property {boolean} indeterminate - Whether to show indeterminate/loading state
 * @property {string} color - Custom color override
 * @property {string} backgroundColor - Custom background color
 */
export type ProgressBarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  value: number;
  max?: number;
  variant?: ProgressBarVariants;
  size?: ProgressBarSizes;
  shape?: ProgressBarShapes;
  showPercentage?: boolean;
  showValue?: boolean;
  label?: string;
  children?: ReactNode;
  className?: string;
  striped?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  color?: string;
  backgroundColor?: string;
};

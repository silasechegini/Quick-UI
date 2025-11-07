import { HTMLAttributes, ReactNode } from "react";

/**
 * ProgressBar Component Types and Enums
 *
 * This file defines the comprehensive type system for the ProgressBar component,
 * including all available variants, sizes, shapes, and configuration options.
 * The types ensure type safety and provide IntelliSense support for developers.
 *
 * @fileoverview Type definitions for ProgressBar component
 * @author Quick-UI Team
 * @since 1.0.0
 */

/**
 * Visual variants for the ProgressBar component.
 * Each variant corresponds to different semantic meanings and color schemes.
 *
 * @enum {string}
 * @readonly
 */
export enum PROGRESS_BAR_VARIANTS {
  /** Default blue variant for general progress indication */
  DEFAULT = "default",
  /** Green variant for successful operations or completion */
  SUCCESS = "success",
  /** Yellow/orange variant for warnings or caution states */
  WARNING = "warning",
  /** Red variant for errors or failed operations */
  ERROR = "error",
  /** Light blue variant for informational progress */
  INFO = "info",
}

/**
 * Size variants for the ProgressBar component.
 * Controls the height and font size of the progress bar.
 *
 * @enum {string}
 * @readonly
 */
export enum PROGRESS_BAR_SIZES {
  /** Small progress bar (height: 0.5rem, font: 0.75rem) */
  SMALL = "small",
  /** Medium progress bar (height: 1rem, font: 0.875rem) - default */
  MEDIUM = "medium",
  /** Large progress bar (height: 1.5rem, font: 1rem) */
  LARGE = "large",
}

/**
 * Shape variants for the ProgressBar component.
 * Controls the border radius and overall visual appearance.
 *
 * @enum {string}
 * @readonly
 */
export enum PROGRESS_BAR_SHAPES {
  /** Rounded corners with default border radius - default */
  ROUNDED = "rounded",
  /** Sharp, square corners with no border radius */
  SQUARE = "square",
}

/**
 * Type alias for ProgressBar variant values.
 * Extracts the literal types from the PROGRESS_BAR_VARIANTS enum.
 *
 * @typedef {string} ProgressBarVariants
 */
export type ProgressBarVariants =
  (typeof PROGRESS_BAR_VARIANTS)[keyof typeof PROGRESS_BAR_VARIANTS];

/**
 * Type alias for ProgressBar size values.
 * Extracts the literal types from the PROGRESS_BAR_SIZES enum.
 *
 * @typedef {string} ProgressBarSizes
 */
export type ProgressBarSizes =
  (typeof PROGRESS_BAR_SIZES)[keyof typeof PROGRESS_BAR_SIZES];

/**
 * Type alias for ProgressBar shape values.
 * Extracts the literal types from the PROGRESS_BAR_SHAPES enum.
 *
 * @typedef {string} ProgressBarShapes
 */
export type ProgressBarShapes =
  (typeof PROGRESS_BAR_SHAPES)[keyof typeof PROGRESS_BAR_SHAPES];

/**
 * Props interface for the ProgressBar component.
 * Extends HTMLDivElement attributes while providing comprehensive configuration options.
 *
 * @interface ProgressBarProps
 * @extends {Omit<HTMLAttributes<HTMLDivElement>, "children">}
 */
export type ProgressBarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  /**
   * Current progress value. Should be between 0 and the max value.
   * Values outside this range will be automatically clamped.
   *
   * @type {number}
   * @example
   * <ProgressBar value={65} /> // 65% complete
   */
  value: number;

  /**
   * Maximum value for the progress bar. Defaults to 100.
   * Used to calculate percentage and for accessibility.
   *
   * @type {number}
   * @default 100
   * @example
   * <ProgressBar value={30} max={50} /> // 60% complete (30/50)
   */
  max?: number;

  /**
   * Visual variant that determines the color scheme and semantic meaning.
   *
   * @type {ProgressBarVariants}
   * @default "default"
   * @example
   * <ProgressBar value={100} variant="success" />
   */
  variant?: ProgressBarVariants;

  /**
   * Size variant that controls height and font size.
   *
   * @type {ProgressBarSizes}
   * @default "medium"
   * @example
   * <ProgressBar value={75} size="large" />
   */
  size?: ProgressBarSizes;

  /**
   * Shape variant that controls border radius.
   *
   * @type {ProgressBarShapes}
   * @default "rounded"
   * @example
   * <ProgressBar value={50} shape="square" />
   */
  shape?: ProgressBarShapes;

  /**
   * Whether to display the percentage value as text within the progress bar.
   *
   * @type {boolean}
   * @default false
   * @example
   * <ProgressBar value={75} showPercentage /> // Shows "75%"
   */
  showPercentage?: boolean;

  /**
   * Whether to display the current value and max as text (e.g., "30/100").
   *
   * @type {boolean}
   * @default false
   * @example
   * <ProgressBar value={30} max={50} showValue /> // Shows "30/50"
   */
  showValue?: boolean;

  /**
   * Custom accessible label for screen readers. If not provided,
   * a default label will be generated.
   *
   * @type {string}
   * @example
   * <ProgressBar value={65} label="File upload progress" />
   */
  label?: string;

  /**
   * Custom content to display within the progress bar.
   * Takes priority over showPercentage and showValue.
   *
   * @type {ReactNode}
   * @example
   * <ProgressBar value={75}>
   *   <span>3 of 4 items complete</span>
   * </ProgressBar>
   */
  children?: ReactNode;

  /**
   * Additional CSS class names to apply to the progress bar container.
   *
   * @type {string}
   * @example
   * <ProgressBar value={50} className="my-custom-progress" />
   */
  className?: string;

  /**
   * Whether to show a striped pattern on the progress bar fill.
   *
   * @type {boolean}
   * @default false
   * @example
   * <ProgressBar value={60} striped />
   */
  striped?: boolean;

  /**
   * Whether to animate the striped pattern (requires striped=true).
   *
   * @type {boolean}
   * @default false
   * @example
   * <ProgressBar value={60} striped animated />
   */
  animated?: boolean;

  /**
   * Whether to show an indeterminate loading state (ignores value).
   * Useful for unknown progress durations.
   *
   * @type {boolean}
   * @default false
   * @example
   * <ProgressBar indeterminate /> // Shows continuous loading animation
   */
  indeterminate?: boolean;

  /**
   * Custom color for the progress bar fill. Overrides variant colors.
   *
   * @type {string}
   * @example
   * <ProgressBar value={75} color="#ff6b6b" />
   */
  color?: string;

  /**
   * Custom background color for the progress bar container.
   *
   * @type {string}
   * @example
   * <ProgressBar value={75} backgroundColor="#f0f0f0" />
   */
  backgroundColor?: string;
};

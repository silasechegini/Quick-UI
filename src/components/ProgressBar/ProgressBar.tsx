import React from "react";
import { combineClasses } from "../../utils/classNames";
import {
  ProgressBarProps,
  PROGRESS_BAR_VARIANTS,
  PROGRESS_BAR_SIZES,
  PROGRESS_BAR_SHAPES,
} from "./ProgressBar.types";
import styles from "./styles.module.scss";

/**
 * ProgressBar Component
 *
 * A flexible and accessible progress bar component that supports various visual styles,
 * sizes, animations, and accessibility features. Fully compliant with WCAG guidelines
 * and supports both determinate and indeterminate states.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <ProgressBar value={65} />
 *
 * // With percentage display
 * <ProgressBar value={45} showPercentage />
 *
 * // Success variant with animation
 * <ProgressBar
 *   value={100}
 *   variant="success"
 *   striped
 *   animated
 * />
 *
 * // Indeterminate loading state
 * <ProgressBar indeterminate />
 *
 * // Custom colors and styling
 * <ProgressBar
 *   value={75}
 *   color="#ff6b6b"
 *   backgroundColor="#f0f0f0"
 *   size="large"
 * />
 * ```
 *
 * @param {ProgressBarProps} props - The props for the ProgressBar component
 * @returns {React.ReactElement} The rendered ProgressBar component
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = PROGRESS_BAR_VARIANTS.DEFAULT,
  size = PROGRESS_BAR_SIZES.MEDIUM,
  shape = PROGRESS_BAR_SHAPES.ROUNDED,
  showPercentage = false,
  showValue = false,
  label,
  children,
  className,
  striped = false,
  animated = false,
  indeterminate = false,
  color,
  backgroundColor,
  ...rest
}) => {
  /**
   * Clamps the value between 0 and max to ensure valid progress values.
   * If value is undefined (for indeterminate state), defaults to 0.
   *
   * @type {number} clampedValue - The clamped progress value
   */
  const clampedValue =
    value !== undefined ? Math.min(Math.max(0, value), max) : 0;

  /**
   * Calculates the percentage for the visual fill.
   * Returns 0 for indeterminate state to prevent visual fill.
   *
   * @type {number} percentage - The calculated percentage (0-100)
   */
  const percentage = indeterminate ? 0 : (clampedValue / max) * 100;

  /**
   * Generates an accessible label for screen readers.
   * Uses provided label or creates a default descriptive label.
   *
   * @type {string} ariaLabel - The accessibility label
   */
  const ariaLabel = label || `Progress: ${clampedValue} of ${max}`;

  /**
   * Builds the CSS classes for the main progress bar container.
   * Combines base styles with variant, size, shape, and state classes.
   *
   * @type {string} progressBarClasses - Combined CSS class string
   */
  const progressBarClasses = combineClasses(
    styles.progressBar,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    styles[`shape-${shape}`],
    striped && styles.striped,
    animated && striped && styles.animated,
    indeterminate && styles.indeterminate,
    className,
  );

  /**
   * Builds the CSS classes for the progress fill element.
   *
   * @type {string} fillClasses - Combined CSS class string for the fill
   */
  const fillClasses = combineClasses(
    styles.fill,
    indeterminate && styles.indeterminateAnimation,
  );

  /**
   * Custom inline styles for the progress bar container.
   * Applies background color override if provided.
   *
   * @type {React.CSSProperties} customStyles - Inline styles object
   */
  const customStyles = {
    ...(backgroundColor && { backgroundColor }),
  };

  /**
   * Custom inline styles for the progress fill element.
   * Sets width based on percentage and applies color override if provided.
   *
   * @type {React.CSSProperties} fillStyles - Inline styles object for fill
   */
  const fillStyles = {
    width: `${percentage}%`,
    ...(color && { backgroundColor: color }),
  };

  /**
   * Determines the text content to display within the progress bar.
   * Priority: children > showPercentage > showValue > null
   *
   * @returns {ReactNode | null} The text content to display or null
   */
  const getDisplayText = () => {
    if (children) return children;
    if (showPercentage) return `${Math.round(percentage)}%`;
    if (showValue) return `${clampedValue}/${max}`;
    return null;
  };

  /**
   * The resolved display text content.
   *
   * @type {ReactNode | null} displayText - The text to display in the progress bar
   */
  const displayText = getDisplayText();

  return (
    <div
      className={progressBarClasses}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={indeterminate ? undefined : clampedValue}
      aria-valuemin={0}
      aria-valuemax={max}
      style={customStyles}
      {...rest}
    >
      <div className={fillClasses} style={fillStyles} aria-hidden="true" />
      {displayText && (
        <div className={styles.text} aria-hidden="true">
          {displayText}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

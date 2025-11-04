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
 * A flexible progress bar component that supports various visual styles,
 * sizes, animations, and accessibility features.
 *
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
 * ```
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
  // Clamp value between 0 and max
  const clampedValue = Math.min(Math.max(0, value), max);
  const percentage = indeterminate ? 0 : (clampedValue / max) * 100;

  // Generate accessible label
  const ariaLabel = label || `Progress: ${clampedValue} of ${max}`;

  // Build CSS classes
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

  const fillClasses = combineClasses(
    styles.fill,
    indeterminate && styles.indeterminateAnimation,
  );

  // Custom styles
  const customStyles = {
    ...(backgroundColor && { backgroundColor }),
  };

  const fillStyles = {
    width: `${percentage}%`,
    ...(color && { backgroundColor: color }),
  };

  // Format display text
  const getDisplayText = () => {
    if (children) return children;
    if (showPercentage) return `${Math.round(percentage)}%`;
    if (showValue) return `${clampedValue}/${max}`;
    return null;
  };

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

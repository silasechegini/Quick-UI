import React, { forwardRef, useState, useId } from "react";
import { TOGGLE_SIZES, ToggleProps } from "./Toggle.types";
import { combineClasses } from "../../utils";
import styles from "./styles.module.scss";
import { Icon } from "@components/Icon";
import { ICONS } from "@assets/iconType";

/**
 * Toggle component that provides an on/off switch interface.
 * Supports multiple sizes, controlled/uncontrolled modes, and accessibility features.
 *
 * @param props - The props for the Toggle component
 * @param props.size - The size of the toggle (default: 'medium')
 * @param props.checked - Whether the toggle is checked (controlled mode)
 * @param props.defaultChecked - Default checked state (uncontrolled mode)
 * @param props.disabled - Whether the toggle is disabled (default: false)
 * @param props.label - Label text for the toggle
 * @param props.description - Description text shown below the label
 * @param props.error - Whether there's an error state (default: false)
 * @param props.errorMessage - Error message to display
 * @param props.className - Additional CSS classes for the container
 * @param props.labelClassName - Additional CSS classes for the label
 * @param props.inputClassName - Additional CSS classes for the input
 * @param props.onChange - Callback function called when the toggle state changes
 * @returns JSX.Element representing the toggle component
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = TOGGLE_SIZES.MEDIUM,
      checked,
      defaultChecked = false,
      disabled = false,
      label,
      description,
      error = false,
      errorMessage,
      className,
      labelClassName,
      inputClassName,
      sliderClassName,
      onChange,
      id,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const toggleId = id || generatedId;

    // Handle controlled vs uncontrolled state
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const checkedValue = isControlled ? checked : internalChecked;

    const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked, event);
    };

    const containerClasses = combineClasses(
      styles.toggleContainer,
      disabled && styles.disabled,
      className,
    );

    const wrapperClasses = combineClasses(
      styles.toggleWrapper,
      disabled && styles.disabled,
    );

    const sliderClasses = combineClasses(
      styles.toggleSlider,
      styles[size],
      checkedValue ? styles.checked : styles.unchecked,
      error && styles.error,
      disabled && styles.disabled,
      sliderClassName,
    );

    const labelClasses = combineClasses(
      styles.toggleLabel,
      disabled && styles.disabled,
      error && styles.error,
      labelClassName,
    );

    const inputClasses = combineClasses(styles.toggleInput, inputClassName);

    const descriptionClasses = combineClasses(
      styles.toggleDescription,
      disabled && styles.disabled,
    );

    return (
      <div className={containerClasses}>
        <label className={wrapperClasses} htmlFor={toggleId}>
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            className={inputClasses}
            checked={checkedValue}
            disabled={disabled}
            onChange={handleToggleChange}
            aria-invalid={error}
            aria-describedby={
              description || errorMessage
                ? `${toggleId}-description ${toggleId}-error`
                : undefined
            }
            {...rest}
          />

          <div
            className={sliderClasses}
            data-testid="toggle-slider"
            data-size={size}
          >
            <div className={styles.toggleThumb} />
          </div>

          {label && <span className={labelClasses}>{label}</span>}
        </label>

        {description && (
          <div id={`${toggleId}-description`} className={descriptionClasses}>
            {description}
          </div>
        )}

        {errorMessage && error && (
          <div
            id={`${toggleId}-error`}
            className={styles.toggleError}
            role="alert"
          >
            <Icon
              name={ICONS.EXCLAMATION_ICON}
              className={styles.errorIcon}
              aria-hidden="true"
              focusable={false}
              size={16}
            />
            {errorMessage}
          </div>
        )}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";

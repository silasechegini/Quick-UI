import React, { forwardRef, useState, useId } from "react";
import {
  SWITCH_LABEL_POSITIONS,
  SWITCH_SIZES,
  SWITCH_VARIANTS,
  SwitchProps,
} from "./Switch.types";
import { combineClasses } from "../../utils";
import styles from "./styles.module.scss";
import { Icon } from "@components/Icon";
import { IconKey } from "@assets/iconType";

/**
 * Switch component that provides a modern toggle interface.
 * Supports multiple sizes, colors, controlled/uncontrolled modes, and accessibility features.
 *
 * @param props - The props for the Switch component
 * @param props.size - The size of the switch (default: 'medium')
 * @param props.variant - The color variant (default: 'primary')
 * @param props.checked - Whether the switch is checked (controlled mode)
 * @param props.defaultChecked - Default checked state (uncontrolled mode)
 * @param props.disabled - Whether the switch is disabled (default: false)
 * @param props.label - Label text for the switch
 * @param props.labelPosition - Position of the label (default: 'right')
 * @param props.className - Additional CSS classes for the container
 * @param props.labelClassName - Additional CSS classes for the label
 * @param props.switchClassName - Additional CSS classes for the switch
 * @param props.onChange - Callback function called when the switch state changes
 * @param props.checkedIcon - Icon to display in the thumb when checked
 * @param props.uncheckedIcon - Icon to display in the thumb when unchecked
 * @param props.iconSize - Size of the icon in pixels
 * @returns JSX.Element representing the switch component
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = SWITCH_SIZES.MEDIUM,
      variant = SWITCH_VARIANTS.PRIMARY,
      checked,
      defaultChecked = false,
      disabled = false,
      label,
      labelPosition = SWITCH_LABEL_POSITIONS.RIGHT,
      className,
      labelClassName,
      switchClassName,
      checkedIcon,
      checkedIconColor,
      uncheckedIcon,
      iconSize,
      onChange,
      id,
      name,
      value,
      required = false,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = id || generatedId;

    // Handle controlled vs uncontrolled state
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const checkedValue = isControlled ? checked : internalChecked;

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked, event);
    };

    const containerClasses = combineClasses(
      styles.switchContainer,
      labelPosition === SWITCH_LABEL_POSITIONS.LEFT && styles.labelLeft,
      disabled && styles.disabled,
      className,
    );

    const switchWrapperClasses = combineClasses(
      styles.switchWrapper,
      styles[size],
      styles[variant],
      checkedValue ? styles.checked : styles.unchecked,
      disabled && styles.disabled,
      switchClassName,
    );

    const labelClasses = combineClasses(
      styles.switchLabel,
      disabled && styles.disabled,
      labelClassName,
    );

    // Helper function to check if icon is IconKey
    const isIconKey = (icon: IconKey | React.ReactNode): icon is IconKey => {
      return typeof icon === "string";
    };

    // Determine which icon to show
    const currentIcon = checkedValue ? checkedIcon : uncheckedIcon;

    // Calculate icon size based on switch size if not provided
    const sizeMap = {
      [SWITCH_SIZES.SMALL]: 12,
      [SWITCH_SIZES.MEDIUM]: 14,
      [SWITCH_SIZES.LARGE]: 16,
    };
    const defaultIconSize = sizeMap[size];
    const actualIconSize = iconSize || defaultIconSize;

    const switchContent = (
      <>
        <input
          ref={ref}
          type="checkbox"
          id={switchId}
          name={name}
          value={value}
          className={styles.switchInput}
          checked={checkedValue}
          disabled={disabled}
          required={required}
          onChange={handleSwitchChange}
          aria-label={
            ariaLabel || (typeof label === "string" ? label : undefined)
          }
          aria-describedby={ariaDescribedBy}
          {...rest}
        />
        <span className={switchWrapperClasses}>
          <span className={styles.switchThumb}>
            {currentIcon &&
              (isIconKey(currentIcon) ? (
                <Icon
                  name={currentIcon}
                  size={actualIconSize}
                  className={styles.thumbIcon}
                  fill={
                    checkedValue && checkedIconColor
                      ? checkedIconColor
                      : undefined
                  }
                  aria-hidden="true"
                />
              ) : (
                <span className={styles.thumbIcon}>{currentIcon}</span>
              ))}
          </span>
        </span>
      </>
    );

    return (
      <label className={containerClasses} htmlFor={switchId}>
        {label && labelPosition === SWITCH_LABEL_POSITIONS.LEFT && (
          <span className={labelClasses}>{label}</span>
        )}
        {switchContent}
        {label && labelPosition === SWITCH_LABEL_POSITIONS.RIGHT && (
          <span className={labelClasses}>{label}</span>
        )}
      </label>
    );
  },
);

Switch.displayName = "Switch";

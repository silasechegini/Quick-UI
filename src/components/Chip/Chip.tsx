import React, { useMemo } from "react";
import { ChipProps } from "./Chip.types";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "@components/Button";
import { Icon } from "@components/Icon";
import { buildClassNames } from "@utils/classNames";
import styles from "./styles.module.scss";
import { ICONS } from "@assets/iconType";

/**
 * Chip component that displays small pieces of information or tags.
 * Supports various sizes, colors, icons, and interactive functionality.
 *
 * @param props - The props for the Chip component
 * @param props.text - The text content to display in the chip
 * @param props.size - The size of the chip
 * @param props.className - Additional CSS classes to apply to the chip
 * @param props.ariaLabel - Accessible label for the chip
 * @param props.style - Additional CSS styles to apply to the chip
 * @param props.onRemove - Callback function called when the remove button is clicked
 * @param props.disabled - Whether the chip is disabled
 * @param props.variant - The visual style variant of the chip
 * @param props.interactive - Whether the chip should have interactive styling
 * @param props.leadingIcon - Icon to display at the start of the chip
 * @param props.trailingIcon - Icon to display at the end of the chip
 * @param props.status - Status indicator configuration for the chip
 * @param props.children - Additional content to display in the chip
 * @returns JSX.Element representing the chip component
 */
const Chip: React.FC<ChipProps> = ({
  text,
  size,
  className,
  ariaLabel,
  style,
  onRemove,
  disabled,
  variant,
  interactive,
  leadingIcon,
  trailingIcon,
  status,
  children,
}) => {
  const statusStyle = useMemo(() => {
    if (typeof status === "object" && status.class) {
      return [styles.statusContainer, status.class].join(" ");
    }
    if (typeof status === "string") {
      return [styles.statusContainer, styles[status]].join(" ");
    }
    return undefined;
  }, [status]);

  const chipClasses = useMemo(
    () =>
      buildClassNames(
        [
          styles.chipContainer,
          styles.chip,
          styles[variant || "ghost"],
          styles[size || "medium"],
        ],
        {
          [styles.chip_with_icon]: !!(leadingIcon || trailingIcon),
          [styles.chip_with_button]: !!(interactive && !disabled),
          [styles.disabled]: !!disabled,
        },
        className,
      ),
    [
      className,
      disabled,
      interactive,
      size,
      variant,
      leadingIcon,
      trailingIcon,
    ],
  );

  const iconSize = useMemo(() => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      case "medium":
      default:
        return 20;
    }
  }, [size]);

  return (
    <div
      className={chipClasses}
      style={style}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={interactive && !disabled ? 0 : -1}
    >
      {status && <span className={statusStyle} />}
      {leadingIcon && leadingIcon}
      {children || <span>{text}</span>}
      {interactive && !disabled && (
        <div className={styles.clearButton}>
          <Button
            variant={BUTTON_VARIANTS.PLAIN}
            size={BUTTON_SIZES.EXTRASMALL}
            icon={<Icon name={ICONS.CLEAR_ICON} size={iconSize} />}
            onClick={onRemove}
            onMouseDown={(e) => e.preventDefault()}
            type="button"
            aria-label="delete chip"
            disabled={disabled}
          />
        </div>
      )}
      {trailingIcon && trailingIcon}
    </div>
  );
};

export default Chip;

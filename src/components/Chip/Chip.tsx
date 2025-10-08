import React, { useMemo } from "react";
import { ChipProps } from "./Chip.types";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "@components/Button";
import { Icon } from "@components/Icon";
import styles from "./styles.module.scss";

const Chip: React.FC<ChipProps> = ({
  text,
  size,
  className,
  ariaLabel,
  style,
  onClick,
  disabled,
  variant,
  interactive,
  status,
  children,
}) => {
  const statusStyle = useMemo(() => {
    if (typeof status === "object" && status.class) {
      return [styles.statusContainer, status.class].join(" ");
    }
    if (typeof status === "string") {
      return [styles.statusContainer, styles[status] || styles.info].join(" ");
    }
    return styles.info;
  }, [status]);

  const chipClasses = useMemo(
    () =>
      [
        styles.chipContainer,
        styles.chip,
        styles[variant || "ghost"],
        styles[size || "medium"],
        disabled ? styles.disabled : "",
        interactive && !disabled ? styles.interactive : "",
        className,
      ].join(" "),
    [className, disabled, interactive, size, variant],
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
    >
      {status && <span className={statusStyle}></span>}
      {children || <span>{text}</span>}
      {interactive && !disabled && (
        <div className={styles.clearButton}>
          <Button
            variant={BUTTON_VARIANTS.PLAIN}
            size={BUTTON_SIZES.EXTRASMALL}
            icon={<Icon name="clear_icon" size={iconSize} />}
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
            type="button"
            tabIndex={1}
            aria-label="Clear input"
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default Chip;

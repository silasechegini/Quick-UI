import React from "react";
import styles from "./Button.module.css";
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ButtonProps,
  ICON_POSITIONS,
} from "./Button.types";
import classNames from "classnames";

const ButtonBase: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = ICON_POSITIONS.START,
  isLoading = false,
  loadingText,
  size = BUTTON_SIZES.MEDIUM,
  variant = BUTTON_VARIANTS.PRIMARY,
  fullWidth = false,
  className,
  styleOverride,
  ariaLabel,
  as: Component = "button",
  ...rest
}) => {
  const isIconOnly = !children && icon;

  const combinedClassName = classNames(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.fullWidth]: fullWidth,
      [styles.loading]: isLoading,
    },
    className,
    styleOverride?.className,
  );

  const content = (
    <>
      {isLoading && <span className={styles.icon}>⏳</span>}
      {!isLoading && icon && iconPosition === ICON_POSITIONS.START && (
        <span className={classNames(styles.icon, styles.iconStart)}>
          {icon}
        </span>
      )}
      {children && (
        <span>{isLoading ? loadingText || children : children}</span>
      )}
      {!isLoading && icon && iconPosition === ICON_POSITIONS.END && (
        <span className={classNames(styles.icon, styles.iconEnd)}>{icon}</span>
      )}
    </>
  );

  return (
    <Component
      className={combinedClassName}
      style={styleOverride?.style}
      disabled={isLoading || rest.disabled}
      aria-label={isIconOnly ? ariaLabel : undefined}
      {...rest}
    >
      {content}
    </Component>
  );
};

export default ButtonBase;

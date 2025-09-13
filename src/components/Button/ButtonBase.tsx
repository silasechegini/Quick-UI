import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./Button.types";
import classNames from "classnames";

const ButtonBase: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = "start",
  isLoading = false,
  loadingText,
  size = "m",
  variant = "primary",
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
      {!isLoading && icon && iconPosition === "start" && (
        <span className={classNames(styles.icon, styles.iconStart)}>
          {icon}
        </span>
      )}
      {children && (
        <span>{isLoading ? loadingText || children : children}</span>
      )}
      {!isLoading && icon && iconPosition === "end" && (
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

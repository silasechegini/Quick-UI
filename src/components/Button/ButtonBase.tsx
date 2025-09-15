import React from "react";
import styles from "./styles.module.scss";
import {
  BUTTON_SHAPES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ButtonProps,
  ICON_POSITIONS,
} from "./Button.types";
import classNames from "classnames";

/** ButtonBase - The foundational button component handling core functionality and styling.
 *
 * @param {React.ReactNode} children - The content of the button.
 * @param {React.ReactNode} icon - Optional icon to display within the button.
 * @param {("start" | "end")} iconPosition - Position of the icon relative to the text (default: START).
 * @param {boolean} isLoading - Whether the button is in a loading state (default: false).
 * @param {string} loadingText - Text to display when the button is loading.
 * @param {BUTTON_SIZES} size - The size of the button (default: MEDIUM).
 * @param {BUTTON_VARIANTS} variant - The visual style of the button (default: PRIMARY).
 * @param {boolean} fullWidth - Whether the button should take full width of its container (default: false).
 * @param {StyleOverride} styleOverride - Custom styles for the button.
 * @param {string} ariaLabel - Accessible label for icon-only buttons.
 * @param {string} className - Additional CSS class names.
 * @param {React.ElementType} as - The HTML element or component to render as (default: 'button').
 * @param {object} rest - Additional props passed to the underlying button element.
 *
 * @returns {JSX.Element} The rendered ButtonBase component.
 */

const ButtonBase: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = ICON_POSITIONS.DEFAULT,
  isLoading = false,
  loadingText,
  size = BUTTON_SIZES.DEFAULT,
  shape = BUTTON_SHAPES.SQUARE,
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
    styles[shape],
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
      {!isLoading && isIconOnly && <span className={styles.icon}>{icon}</span>}
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

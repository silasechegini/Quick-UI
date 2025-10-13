import React from "react";
import styles from "./styles.module.scss";
import {
  BUTTON_SHAPES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ButtonProps,
  ICON_POSITIONS,
} from "./Button.types";
import { combineClasses } from "../../utils";
import { Icon } from "../Icon";
import { ICONS } from "@assets/iconType";

/** ButtonBase - The foundational button component handling core functionality and styling.
 *
 * @param {React.ReactNode} children - The content of the button.
 * @param {React.ReactNode} icon - Optional icon to display within the button.
 * @param {("start" | "end")} iconPosition - Position of the icon relative to the text (default: START).
 * @param {boolean} isLoading - Whether the button is in a loading state (default: false).
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
  size = BUTTON_SIZES.MEDIUM,
  shape = BUTTON_SHAPES.SQUARE,
  variant = BUTTON_VARIANTS.PRIMARY,
  fullWidth = false,
  className,
  styleOverride,
  ariaLabel,
  as: Component = "button",
  disabled = false,
  ...rest
}) => {
  const isIconOnly = !children && icon;

  const combinedClassName = combineClasses(
    styles.button,
    styles[variant],
    !fullWidth && styles[size], // Only apply size if not fullWidth
    styles[shape],
    fullWidth && styles.fullWidth,
    isLoading && styles.loading,
    className,
    styleOverride?.className,
  );

  const content = (
    <>
      {isLoading && (
        <span className={styles.icon}>
          <Icon name={ICONS.LOADING_ICON} size={16} />
        </span>
      )}
      {!isLoading && icon && iconPosition === ICON_POSITIONS.START && (
        <span className={combineClasses(styles.icon, styles.iconStart)}>
          {icon}
        </span>
      )}
      {children && <span className={styles.label}>{children}</span>}
      {!isLoading && icon && iconPosition === ICON_POSITIONS.END && (
        <span className={combineClasses(styles.icon, styles.iconEnd)}>
          {icon}
        </span>
      )}
      {!isLoading && isIconOnly && <span className={styles.icon}>{icon}</span>}
    </>
  );

  return (
    <Component
      className={combinedClassName}
      style={styleOverride?.style}
      disabled={isLoading || disabled}
      aria-label={isIconOnly ? ariaLabel : undefined}
      {...rest}
    >
      {content}
    </Component>
  );
};

export default ButtonBase;

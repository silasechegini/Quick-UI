import React from "react";
import ButtonBase from "./ButtonBase";
import { BUTTON_VARIANTS, ButtonProps, ICON_POSITIONS } from "./Button.types";

/** Button - A versatile button component supporting various styles, sizes, and states.
 *
 * @param {BUTTON_VARIANTS} variant - The visual style of the button (default: PRIMARY).
 * @param {React.ReactNode} icon - Optional icon to display within the button.
 * @param {React.ReactNode} children - The content of the button.
 * @param {("start" | "end")} iconPosition - Position of the icon relative to the text (default: START).
 * @param {string} ariaLabel - Accessible label for icon-only buttons.
 * @param {object} rest - Additional props passed to the underlying button element.
 *
 * @returns {JSX.Element} The rendered Button component.
 */

const Button: React.FC<ButtonProps> = ({
  variant = BUTTON_VARIANTS.PRIMARY,
  icon,
  children,
  iconPosition = ICON_POSITIONS.DEFAULT,
  ariaLabel,
  ...rest
}) => {
  const isIconOnly = icon && !children;

  return (
    <ButtonBase
      variant={variant}
      icon={icon}
      iconPosition={iconPosition}
      ariaLabel={ariaLabel}
      {...(isIconOnly && !ariaLabel ? { "aria-label": "icon button" } : {})}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;

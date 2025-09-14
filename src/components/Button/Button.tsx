import React from "react";
import ButtonBase from "./ButtonBase";
import { BUTTON_VARIANTS, ButtonProps, ICON_POSITIONS } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  variant = BUTTON_VARIANTS.PRIMARY,
  icon,
  children,
  iconPosition = ICON_POSITIONS.START,
  ariaLabel,
  ...rest
}) => {
  const isIconOnly = icon && !children;

  return (
    <ButtonBase
      variant={variant}
      icon={icon}
      iconPosition={iconPosition}
      ariaLabel={isIconOnly ? ariaLabel : undefined}
      {...(isIconOnly && !ariaLabel ? { "aria-label": "icon button" } : {})}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;

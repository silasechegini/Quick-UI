import React from "react";
import ButtonBase from "./ButtonBase";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  icon,
  children,
  iconPosition = "start",
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

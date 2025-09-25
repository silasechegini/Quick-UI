import type { CSSProperties, FC } from "react";
import clsx from "clsx";
import { iconSvgMapping as Icons } from "@assets"; // e.g., { HomeIcon, UserIcon, ... }
import { getIconStyle } from "./Icon.styles";

export interface IconProps {
  name: keyof typeof Icons;
  size?: number | string;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

const Icon: FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  style,
  className,
}) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  const combinedStyle = {
    ...getIconStyle(size, color),
    ...style,
  };

  return (
    <IconComponent style={combinedStyle} className={clsx("icon", className)} />
  );
};

export default Icon;

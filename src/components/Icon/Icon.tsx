import type { FC } from "react";
import clsx from "clsx";
import { iconSvgMapping as Icons } from "@assets"; // e.g., { HomeIcon, UserIcon, ... }
import { getIconStyle } from "./Icon.styles";
import type { IconProps } from "./Icon.types";

const Icon: FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  style,
  className,
}) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    const availableIcons = Object.keys(Icons).join(", ");
    console.warn(
      `Icon "${name}" not found. Available icons: [${availableIcons}]. ` +
        `Refer to the icon documentation for more details.`,
    );
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

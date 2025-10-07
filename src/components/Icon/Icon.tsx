import type { FC } from "react";
import clsx from "clsx";
import { iconSvgMapping as Icons } from "@assets"; // e.g., { HomeIcon, UserIcon, ... }
import { getIconStyle } from "./Icon.styles";
import type { IconProps } from "./Icon.types";

/**
 *
 * @param name - The name of the icon to render. Must correspond to a key in the iconSvgMapping.
 * @param size - The size of the icon in pixels. Default is 24.
 * @param color - The color of the icon. Default is "", which means the color is not set and the icon will inherit the current text color
 * (or whatever is inherited by default). However, specifying "currentColor" will explicitly make it inherit the text color
 * @param style - Additional CSS styles to apply to the icon.
 * @param className - Additional CSS class names to apply to the icon.
 * @returns {JSX.Element | null} The rendered icon component or null if the icon name is invalid.
 *
 * @example
 * <Icon name="home_icon" size={32} color="#000" />
 * <Icon name="user_icon" />
 *
 * @remarks Will log a warning if the icon name does not exist in the iconSvgMapping.
 */

const Icon: FC<IconProps> = ({
  name,
  size = 24,
  color = "",
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

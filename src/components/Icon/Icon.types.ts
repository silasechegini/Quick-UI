import type { CSSProperties } from "react";
import { iconSvgMapping as Icons } from "@assets"; // adjust path if icons live elsewhere

export interface IconProps {
  name: keyof typeof Icons;
  size?: number | string;
  color?: string;
  fill?: string;
  style?: CSSProperties;
  className?: string;
}
export type IconName = keyof typeof Icons;
export type IconComponent = React.FC<IconProps>;
export { Icons };
// Example usage: <Icon name="close_icon" size={24} color="#000" />

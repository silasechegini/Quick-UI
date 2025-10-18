import type { CSSProperties } from "react";
import { iconSvgMapping as Icons } from "@assets"; // adjust path if icons live elsewhere

export type BaseIconProps = {
  name: keyof typeof Icons;
  size?: number | string;
  color?: string;
  fill?: string;
  style?: CSSProperties;
  className?: string;
};

export type IconProps = BaseIconProps & React.SVGProps<SVGSVGElement>;
export type IconName = keyof typeof Icons;
export type IconComponent = React.FC<IconProps>;
export { Icons };
// Example usage: <Icon name="close_icon" size={24} color="#000" />

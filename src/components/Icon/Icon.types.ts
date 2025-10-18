import type { CSSProperties, SVGProps, FC } from "react";
import type { IconKey } from "@assets/iconType";

export type BaseIconProps = {
  name: IconKey;
  size?: number | string;
  color?: string;
  fill?: string;
  style?: CSSProperties;
  className?: string;
};

export type IconProps = BaseIconProps & SVGProps<SVGSVGElement>;
export type IconComponent = FC<IconProps>;
// Example usage: <Icon name="close_icon" size={24} color="#000" />

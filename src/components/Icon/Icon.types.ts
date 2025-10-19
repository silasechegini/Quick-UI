import type { SVGProps, FC } from "react";
import type { IconKey, ICONS } from "@assets/iconType";

export type BaseIconProps = {
  name: IconKey | ICONS;
  size?: number | string;
};

export type IconProps = BaseIconProps & SVGProps<SVGSVGElement>;
export type IconComponent = FC<IconProps>;
// Example usage: <Icon name="close_icon" size={24} fill="#000" />
// Or with CSS:   <Icon name="close_icon" size={24} className="text-red-500" />

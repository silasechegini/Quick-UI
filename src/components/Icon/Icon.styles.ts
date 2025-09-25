import { CSSProperties } from "react";

export const getIconStyle = (
  size: number | string,
  color: string,
): CSSProperties => ({
  width: size,
  height: size,
  fill: color,
});

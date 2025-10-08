import { CSSProperties } from "react";

export const getIconStyle = (
  size: number | string,
  color?: string,
  fill?: string,
): CSSProperties => ({
  width: size,
  height: size,
  ...(fill ? { fill } : color ? { color } : {}),
});

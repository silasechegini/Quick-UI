export const getIconStyle = (
  size: number | string,
  color: string,
): React.CSSProperties => ({
  width: size,
  height: size,
  fill: color,
});

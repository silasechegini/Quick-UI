export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const roundToStep = (
  value: number,
  step: number,
  min: number,
): number => {
  const remainder = (value - min) % step;
  return remainder < step / 2 ? value - remainder : value - remainder + step;
};

export const valueToPercent = (
  value: number,
  min: number,
  max: number,
): number => ((value - min) * 100) / (max - min);

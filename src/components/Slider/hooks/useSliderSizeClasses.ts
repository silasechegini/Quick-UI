import { useMemo } from "react";

const useSliderSizeClasses = (
  styles: Record<string, string>,
  size: "small" | "medium" | "large",
) => {
  const sizeClasses = useMemo(() => {
    const sizeClassMap = {
      small: {
        slider: styles.sliderSmall,
        track: styles.trackSmall,
        filled: styles.filledSmall,
        thumb: styles.thumbSmall,
      },
      medium: {
        slider: styles.sliderMedium,
        track: styles.trackMedium,
        filled: styles.filledMedium,
        thumb: styles.thumbMedium,
      },
      large: {
        slider: styles.sliderLarge,
        track: styles.trackLarge,
        filled: styles.filledLarge,
        thumb: styles.thumbLarge,
      },
    };
    return sizeClassMap[size];
  }, [size]);

  return sizeClasses;
};
export { useSliderSizeClasses };

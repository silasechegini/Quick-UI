/**
 * Style utility functions for component styling
 */

/**
 * Gets the appropriate elevation class based on the elevation level
 * @param elevation - The elevation level (0-4)
 * @param styles - The styles object containing elevation classes
 * @returns The appropriate elevation class string
 */
export const getElevationClass = (
  elevation: number = 1,
  styles: Record<string, string>,
): string => {
  switch (elevation) {
    case 0:
      return styles.elevation0;
    case 1:
      return styles.elevation1;
    case 2:
      return styles.elevation2;
    case 3:
      return styles.elevation3;
    case 4:
      return styles.elevation4;
    default:
      return styles.elevation1;
  }
};

/**
 * Utility to get variant class from styles object
 * @param variant - The variant name
 * @param styles - The styles object
 * @returns The variant class string or empty string if not found
 */
export const getVariantClass = (
  variant: string | undefined,
  styles: Record<string, string>,
): string => {
  return variant && styles[variant] ? styles[variant] : "";
};

/**
 * Utility to get size class from styles object
 * @param size - The size name
 * @param styles - The styles object
 * @returns The size class string or empty string if not found
 */
export const getSizeClass = (
  size: string | undefined,
  styles: Record<string, string>,
): string => {
  return size && styles[size] ? styles[size] : "";
};

/**
 * Utility function for building CSS class names with conditional logic
 *
 * @param baseClasses - Array of base CSS classes that are always applied
 * @param conditionalClasses - Object with class names as keys and boolean conditions as values
 * @param customClassName - Optional custom class name to append
 * @returns Combined class string with all applicable classes
 *
 * @example
 * ```tsx
 * const classes = buildClassNames(
 *   ['base-class', 'component'],
 *   {
 *     'active': isActive,
 *     'disabled': isDisabled,
 *     'large': size === 'large'
 *   },
 *   customClassName
 * );
 * ```
 */
export const buildClassNames = (
  baseClasses: string[],
  conditionalClasses: Record<string, boolean>,
  customClassName?: string,
): string => {
  return [
    ...baseClasses,
    ...Object.entries(conditionalClasses)
      .filter(([, condition]) => condition)
      .map(([className]) => className),
    customClassName,
  ]
    .filter(Boolean)
    .join(" ");
};

/**
 * Simple utility to combine class names, filtering out falsy values
 *
 * @param classes - Array of class names (can include falsy values)
 * @returns Combined class string
 *
 * @example
 * ```tsx
 * const classes = combineClasses([
 *   'base-class',
 *   isActive && 'active',
 *   isDisabled && 'disabled',
 *   customClassName
 * ]);
 * ```
 */
export const combineClasses = (
  ...classes: (string | boolean | null | undefined)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

import React from "react";
import {
  BadgeProps,
  BADGE_VARIANTS,
  BADGE_SIZES,
  BADGE_POSITIONS,
  BADGE_TYPES,
} from "./Badge.types";
import { combineClasses } from "../../utils";
import styles from "./styles.module.scss";

/**
 * Badge - A notification indicator component
 *
 * Displays notification counts, status indicators, or custom content.
 * Can be attached to other elements (like icons) or used standalone.
 *
 * @example
 * // Basic notification badge
 * <Badge count={5}>
 *   <Icon name="bell" />
 * </Badge>
 *
 * @example
 * // Dot badge for status
 * <Badge type="dot" variant="success">
 *   <Icon name="user" />
 * </Badge>
 *
 * @example
 * // Standalone badge
 * <Badge position="inline" count={10} variant="error" />
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  count = 0,
  max = 99,
  showZero = false,
  variant = BADGE_VARIANTS.PRIMARY,
  size = BADGE_SIZES.MEDIUM,
  position = BADGE_POSITIONS.TOP_RIGHT,
  type = BADGE_TYPES.STANDARD,
  pulse = false,
  invisible = false,
  content,
  className,
  badgeClassName,
  ...rest
}) => {
  // Determine if badge should be visible
  const shouldShowBadge = () => {
    if (invisible) return false;
    if (content) return true;
    if (type === BADGE_TYPES.DOT) return true;
    if (count === 0 && !showZero) return false;
    return true;
  };

  // Format the badge content
  const getBadgeContent = () => {
    if (content) return content;
    if (type === BADGE_TYPES.DOT) return null;
    if (count > max) return `${max}+`;
    return count;
  };

  const badgeClasses = combineClasses(
    styles.badge,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`position-${position}`],
    styles[`type-${type}`],
    pulse && styles.pulse,
    !shouldShowBadge() && styles.invisible,
    badgeClassName,
  );

  const containerClasses = combineClasses(
    styles.badgeContainer,
    position !== BADGE_POSITIONS.INLINE && styles.relative,
    className,
  );

  // If no children and inline position, render badge only
  if (!children || position === BADGE_POSITIONS.INLINE) {
    return (
      <span className={badgeClasses} {...rest}>
        {getBadgeContent()}
      </span>
    );
  }

  // Render badge attached to children
  return (
    <span className={containerClasses}>
      {children}
      <span className={badgeClasses} {...rest}>
        {getBadgeContent()}
      </span>
    </span>
  );
};

export default Badge;

import { FC, useState, useEffect } from "react";
import { combineClasses } from "../../utils/classNames";
import {
  AVATAR_SHAPES,
  AVATAR_SIZES,
  AVATAR_VARIANTS,
  AvatarProps,
  IconAvatarProps,
  ImageAvatarProps,
  InitialsAvatarProps,
  PlaceholderAvatarProps,
} from "./Avatar.types";
import IconAvatar from "./Renderers/IconAvatar";
import InitialsAvatar from "./Renderers/InitialsAvatar";
import ImageAvatar from "./Renderers/ImageAvatar";
import PlaceholderAvatar from "./Renderers/PlaceholderAvatar";
import styles from "./styles.module.scss";

/**
 * Avatar Component
 *
 * A flexible avatar component that supports multiple display modes:
 * - Image avatars with fallback support
 * - Initials-based avatars with customizable colors
 * - Icon avatars for branded or symbolic representations
 * - Placeholder avatars for empty states
 *
 * Features:
 * - Multiple sizes (xs, sm, md, lg, xl, xxl)
 * - Three shape variants (circle, square, rounded)
 * - Automatic fallback handling for failed image loads
 * - Accessibility support with proper ARIA labels
 * - Customizable colors for initials and icons
 * - Responsive design with consistent sizing
 *
 * @example
 * ```tsx
 * // Image avatar with fallback
 * <Avatar
 *   variant="image"
 *   src="/user.jpg"
 *   alt="User Avatar"
 *   fallback="JD"
 *   size="lg"
 * />
 *
 * // Initials avatar
 * <Avatar
 *   variant="initials"
 *   initials="AB"
 *   size="md"
 *   backgroundColor="#4F46E5"
 *   textColor="#FFFFFF"
 * />
 *
 * // Icon avatar
 * <Avatar
 *   variant="icon"
 *   icon={<UserIcon />}
 *   size="sm"
 *   shape="rounded"
 * />
 * ```
 */
const Avatar: FC<AvatarProps> = (props) => {
  const {
    size = AVATAR_SIZES.MEDIUM,
    shape = AVATAR_SHAPES.CIRCLE,
    alt,
    className,
    style,
    ariaLabel,
  } = props;

  const [imageError, setImageError] = useState(false);
  const variant = props.variant ?? AVATAR_VARIANTS.PLACEHOLDER;

  const src = variant === "image" ? (props as ImageAvatarProps).src : undefined;
  useEffect(() => {
    if (src) {
      setImageError(false);
    }
  }, [src]);

  // Build CSS classes
  const avatarClasses = combineClasses(
    styles.avatar,
    styles[`size-${size}`],
    styles[`shape-${shape}`],
    variant && styles[`variant-${variant}`],
    className,
  );

  // Default to placeholder if no variant specified
  if (!variant || variant === "placeholder") {
    return (
      <PlaceholderAvatar
        avatarClasses={avatarClasses}
        style={style}
        ariaLabel={ariaLabel}
        alt={alt}
        {...(props as PlaceholderAvatarProps)}
      />
    );
  }

  // Image avatar
  if (variant === "image") {
    return (
      <ImageAvatar
        avatarClasses={avatarClasses}
        style={style}
        ariaLabel={ariaLabel}
        alt={alt}
        imageError={imageError}
        setImageError={setImageError}
        {...(props as ImageAvatarProps)}
      />
    );
  }

  // Initials avatar
  if (variant === "initials") {
    return (
      <InitialsAvatar
        avatarClasses={avatarClasses}
        style={style}
        ariaLabel={ariaLabel}
        {...(props as InitialsAvatarProps)}
      />
    );
  }

  // Icon avatar
  if (variant === "icon") {
    return (
      <IconAvatar
        avatarClasses={avatarClasses}
        style={style}
        ariaLabel={ariaLabel}
        {...(props as IconAvatarProps)}
      />
    );
  }

  return null;
};

export default Avatar;

import { FC, useState, useEffect } from "react";
import { combineClasses } from "../../utils/classNames";
import {
  AVATAR_SHAPES,
  AVATAR_SIZES,
  AVATAR_VARIANTS,
  AvatarProps,
  AvatarVariants,
  ImageAvatarProps,
} from "./Avatar.types";
import { createAvatarRenderer } from "./Renderers/RendererFactory";
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
 * ```
 * // Placeholder avatar
 * <PlaceholderAvatar
 *   avatarClasses="avatar-large avatar-circle"
 *   backgroundColor="#E5E7EB"
 *   ariaLabel="Empty avatar placeholder"
 * />
 *
 * // Image avatar with fallback
 * <Avatar
 *   variant={AVATAR_VARIANTS.IMAGE}
 *   src="/user.jpg"
 *   alt="User Avatar"
 *   fallback="JD"
 *   size={AVATAR_SIZES.LARGE}
 * />
 *
 * // Initials avatar
 * <Avatar
 *   variant={AVATAR_VARIANTS.INITIALS}
 *   initials="AB"
 *   size={AVATAR_SIZES.MEDIUM}
 *   backgroundColor="#4F46E5"
 *   textColor="#FFFFFF"
 * />
 *
 * // Icon avatar
 * <Avatar
 *   variant={AVATAR_VARIANTS.ICON}
 *   icon={<UserIcon />}
 *   size={AVATAR_SIZES.SMALL}
 *   shape={AVATAR_SHAPES.ROUNDED}
 * />
 * ```
 */
const Avatar: FC<AvatarProps> = (props) => {
  const {
    size = AVATAR_SIZES.MEDIUM,
    shape = AVATAR_SHAPES.CIRCLE,
    className,
  } = props;

  const [imageError, setImageError] = useState(false);
  const variant = (props.variant ??
    AVATAR_VARIANTS.PLACEHOLDER) as AvatarVariants;

  const src =
    variant === AVATAR_VARIANTS.IMAGE
      ? (props as ImageAvatarProps).src
      : undefined;

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

  // Use the factory to create the appropriate renderer
  return createAvatarRenderer(
    variant,
    props,
    avatarClasses,
    imageError,
    setImageError,
  );
};

export default Avatar;

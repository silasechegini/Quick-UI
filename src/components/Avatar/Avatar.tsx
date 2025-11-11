import { FC, useState, useCallback, useEffect } from "react";
import { combineClasses } from "../../utils/classNames";
import { AvatarProps } from "./Avatar.types";
import styles from "./styles.module.scss";
import generateInitials from "@utils/generateInitials";
import getBackgroundColor from "@utils/backgroundColor";

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
    size = "md",
    shape = "circle",
    alt,
    className,
    style,
    ariaLabel,
  } = props;

  const [imageError, setImageError] = useState(false);

  const src = props.variant === "image" ? props.src : undefined;
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
    props.variant && styles[`variant-${props.variant}`],
    className,
  );

  // Handle different avatar variants
  const renderAvatarContent = () => {
    // Default to placeholder if no variant specified
    if (!props.variant || props.variant === "placeholder") {
      const backgroundColor =
        props.variant === "placeholder" ? props.backgroundColor : undefined;
      const { variant, ...placeholderRestProps } = props;
      const placeholderStyle = {
        ...style,
        ...(variant === "placeholder" &&
          props.backgroundColor && {
            background: `linear-gradient(135deg, ${backgroundColor}, ${backgroundColor}dd)`,
          }),
      };

      return (
        <div
          className={avatarClasses}
          style={placeholderStyle}
          role="img"
          aria-label={ariaLabel || alt || "Avatar placeholder"}
          {...placeholderRestProps}
        />
      );
    }

    // Image avatar
    if (props.variant === "image") {
      const { src, fallback, onImageError, ...imageRestProps } = props;

      if (imageError && fallback) {
        // Show fallback initials
        const fallbackStyle = {
          backgroundColor: getBackgroundColor(fallback),
          color: "var(--color-white)",
          ...style,
        };

        return (
          <div
            className={combineClasses(
              avatarClasses,
              styles["variant-initials"],
            )}
            style={fallbackStyle}
            role="img"
            aria-label={ariaLabel || alt || `Avatar for ${fallback}`}
            {...imageRestProps}
          >
            {generateInitials(fallback)}
          </div>
        );
      }

      /**
       * Handle image loading errors
       */
      const handleImageError = useCallback(() => {
        setImageError(true);
        if (onImageError) {
          onImageError();
        }
      }, [onImageError]);

      return (
        <div
          className={avatarClasses}
          style={style}
          role="img"
          aria-label={ariaLabel || alt || "User avatar"}
          {...imageRestProps}
        >
          <img
            className={styles.image}
            src={src}
            alt={alt || "Avatar"}
            onError={handleImageError}
          />
        </div>
      );
    }

    // Initials avatar
    if (props.variant === "initials") {
      const { initials, backgroundColor, textColor, ...initialsRestProps } =
        props;

      const initialsStyle = {
        backgroundColor: backgroundColor || getBackgroundColor(initials),
        color: textColor || "var(--color-white)",
        ...style,
      };

      return (
        <div
          className={avatarClasses}
          style={initialsStyle}
          role="img"
          aria-label={ariaLabel || `Avatar with initials ${initials}`}
          {...initialsRestProps}
        >
          {initials.substring(0, 2).toUpperCase()}
        </div>
      );
    }

    // Icon avatar
    if (props.variant === "icon") {
      const { icon, backgroundColor, iconColor, ...iconRestProps } = props;

      const iconStyle = {
        backgroundColor: backgroundColor || "var(--gray-200)",
        color: iconColor || "var(--gray-600)",
        ...style,
      };

      return (
        <div
          className={avatarClasses}
          style={iconStyle}
          role="img"
          aria-label={ariaLabel || "Icon avatar"}
          {...iconRestProps}
        >
          <span className={styles.icon}>{icon}</span>
        </div>
      );
    }

    return null;
  };

  return renderAvatarContent();
};

export default Avatar;

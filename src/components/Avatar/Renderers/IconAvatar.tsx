import { FC } from "react";
import { IconAvatarProps } from "../Avatar.types";
import styles from "../styles.module.scss";

/**
 * Props for the IconAvatar renderer component
 * @interface IconAvatarRendererProps
 * @extends {IconAvatarProps}
 */
type IconAvatarRendererProps = IconAvatarProps & {
  /** Combined CSS classes for the avatar container */
  avatarClasses: string;
};

/**
 * IconAvatar renderer component that displays an icon-based avatar.
 *
 * This component renders a customizable icon within an avatar container,
 * supporting custom background and icon colors. It's typically used for
 * system accounts, placeholder states, or when no user image/initials
 * are available.
 *
 * @component
 *
 * @param {IconAvatarRendererProps} props - The props for the IconAvatar component
 * @param {React.ReactNode} props.icon - The icon element to display within the avatar
 * @param {string} props.avatarClasses - CSS classes for styling the avatar container
 * @param {string} [props.backgroundColor] - Custom background color (defaults to gray-200)
 * @param {string} [props.iconColor] - Custom icon color (defaults to gray-600)
 * @param {string} [props.ariaLabel] - Custom ARIA label for accessibility
 * @param {React.CSSProperties} [props.style] - Custom inline styles
 *
 * @returns {JSX.Element} The rendered IconAvatar component
 *
 * @since 1.0.0
 */
const IconAvatar: FC<IconAvatarRendererProps> = ({
  avatarClasses,
  style,
  ariaLabel,
  icon,
  backgroundColor,
  iconColor,
  ...props
}) => {
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
      {...props}
    >
      <span className={styles.icon}>{icon}</span>
    </div>
  );
};
export default IconAvatar;

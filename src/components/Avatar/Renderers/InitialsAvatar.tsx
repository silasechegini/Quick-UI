import { FC } from "react";
import { InitialsAvatarProps } from "../Avatar.types";
import { getBackgroundColor } from "../../../utils";

/**
 * Props for the InitialsAvatar renderer component
 * @interface InitialsAvatarRendererProps
 * @extends {InitialsAvatarProps}
 */
type InitialsAvatarRendererProps = InitialsAvatarProps & {
  /** Combined CSS classes for the avatar container */
  avatarClasses: string;
};

/**
 * InitialsAvatar renderer component that displays a text-based avatar using initials.
 *
 * This component renders user initials (up to 2 characters) with customizable
 * background and text colors. It automatically generates a background color based
 * on the initials if none is provided, ensuring consistent visual representation
 * across different users.
 *
 * @component
 *
 * @param {InitialsAvatarRendererProps} props - The props for the InitialsAvatar component
 * @param {string} props.initials - The initials to display (will be truncated to 2 chars and uppercased)
 * @param {string} props.avatarClasses - CSS classes for styling the avatar
 * @param {string} [props.backgroundColor] - Custom background color (falls back to auto-generated)
 * @param {string} [props.textColor] - Custom text color (defaults to white)
 * @param {string} [props.ariaLabel] - Custom ARIA label for accessibility
 * @param {React.CSSProperties} [props.style] - Custom inline styles
 *
 * @returns {JSX.Element} The rendered InitialsAvatar component
 *
 * @since 1.0.0
 */
const InitialsAvatar: FC<InitialsAvatarRendererProps> = ({
  avatarClasses,
  style,
  ariaLabel,
  initials,
  backgroundColor,
  textColor,
  ...props
}) => {
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
      {...props}
    >
      {initials.substring(0, 2).toUpperCase()}
    </div>
  );
};

export default InitialsAvatar;

import { FC } from "react";
import { PlaceholderAvatarProps } from "../Avatar.types";

/**
 * Props for the PlaceholderAvatar renderer component
 * @interface PlaceholderRendererProps
 * @extends {PlaceholderAvatarProps}
 */
type PlaceholderRendererProps = PlaceholderAvatarProps & {
  /** Combined CSS classes for the avatar container */
  avatarClasses: string;
};

/**
 * PlaceholderAvatar renderer component that displays an empty avatar placeholder.
 *
 * This component serves as the default fallback when no specific avatar variant
 * is provided or when other avatar types are not applicable. It renders an empty
 * container with optional background styling and gradient effects.
 *
 * @component
 *
 * @param {PlaceholderRendererProps} props - The props for the PlaceholderAvatar component
 * @param {string} props.avatarClasses - CSS classes for styling the avatar container
 * @param {string} [props.backgroundColor] - Custom background color (creates gradient effect)
 * @param {string} [props.ariaLabel] - Custom ARIA label for accessibility
 * @param {string} [props.alt] - Alternative text description
 * @param {React.CSSProperties} [props.style] - Custom inline styles
 *
 * @returns {JSX.Element} The rendered PlaceholderAvatar component
 *
 * @since 1.0.0
 */
const PlaceholderAvatar: FC<PlaceholderRendererProps> = ({
  avatarClasses,
  style,
  ariaLabel,
  alt,
  ...props
}) => {
  // Default to placeholder if no variant specified

  const { backgroundColor, ...placeholderRestProps } = props;
  const placeholderStyle = {
    ...style,
    ...(backgroundColor && {
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
};

export default PlaceholderAvatar;

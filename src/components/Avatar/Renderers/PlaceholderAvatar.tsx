import { FC } from "react";
import { PlaceholderAvatarProps } from "../Avatar.types";

type PlaceholderRendererProps = PlaceholderAvatarProps & {
  avatarClasses: string;
};

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

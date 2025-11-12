import { FC } from "react";
import { AvatarProps } from "../Avatar.types";

type PlaceholderProps = AvatarProps & {
  avatarClasses: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  alt?: string;
};

const PlaceholderAvatar: FC<PlaceholderProps> = ({
  avatarClasses,
  style,
  ariaLabel,
  alt,
  ...props
}: PlaceholderProps) => {
  // Default to placeholder if no variant specified

  const backgroundColor =
    props.variant === "placeholder" ? props.backgroundColor : undefined;
  const { variant, ...placeholderRestProps } = props;
  const placeholderStyle = {
    ...style,
    ...(variant === "placeholder" &&
      backgroundColor && {
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

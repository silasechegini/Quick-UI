import { FC } from "react";
import { InitialsAvatarProps } from "../Avatar.types";
import { getBackgroundColor } from "../../../utils";

type InitialsAvatarRendererProps = InitialsAvatarProps & {
  avatarClasses: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

const InitialsAvatar: FC<InitialsAvatarRendererProps> = ({
  avatarClasses,
  style,
  ariaLabel,
  initials,
  backgroundColor,
  textColor,
  ...props
}: InitialsAvatarRendererProps) => {
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

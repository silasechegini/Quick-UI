import { FC } from "react";
import { IconAvatarProps } from "../Avatar.types";
import styles from "../styles.module.scss";

type IconAvatarRendererProps = IconAvatarProps & {
  avatarClasses: string;
};

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

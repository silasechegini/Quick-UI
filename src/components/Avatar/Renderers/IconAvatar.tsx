import { FC } from "react";
import { IconAvatarProps } from "../Avatar.types";
import styles from "../styles.module.scss";

type IconAvatarPropsType = IconAvatarProps & {
  avatarClasses: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

const IconAvatar: FC<IconAvatarPropsType> = ({
  avatarClasses,
  style,
  ariaLabel,
  icon,
  backgroundColor,
  iconColor,
  ...props
}: IconAvatarPropsType) => {
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

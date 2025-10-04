import { FC } from "react";
import { iconSvgMapping } from "../../../assets";
import { User } from "../Header.types";
import styles from "../styles.module.scss";

const UserIcon = iconSvgMapping["user_icon"];

interface HeaderUserSectionProps {
  user?: User;
}

export const HeaderUserSection: FC<HeaderUserSectionProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className={styles.userDisplay}>
      <div className={styles.userInfo}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <UserIcon />
          </div>
        )}
        <span className={styles.userName}>{user.name}</span>
      </div>
    </div>
  );
};

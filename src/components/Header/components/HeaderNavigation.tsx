import { FC, ReactNode } from "react";
import styles from "../styles.module.scss";

interface HeaderNavigationProps {
  navigationItems?: ReactNode;
}

export const HeaderNavigation: FC<HeaderNavigationProps> = ({
  navigationItems,
}) => {
  if (!navigationItems) return null;

  return <nav className={styles.navigation}>{navigationItems}</nav>;
};

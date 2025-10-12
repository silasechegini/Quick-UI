import { FC } from "react";
import { FooterProps } from "./Footer.types";
import { combineClasses } from "../../utils";
import styles from "./styles.module.scss";

const Footer: FC<FooterProps> = ({
  leftContent,
  rightContent,
  className,
  children,
}) => {
  return (
    <footer className={combineClasses(styles.footerContainer, className)}>
      <div className={styles.container}>
        {leftContent && <div className={styles.leftSection}>{leftContent}</div>}
        {rightContent && (
          <div className={styles.rightSection}>{rightContent}</div>
        )}
        {children && children}
      </div>
    </footer>
  );
};

export default Footer;

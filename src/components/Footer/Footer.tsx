import { FC } from "react";
import { FooterProps } from "./Footer.types";
import { combineClasses } from "../../utils";
import styles from "./styles.module.scss";

/**
 * Footer component that provides a flexible layout for footer content.
 * Supports left and right content areas with responsive design that stacks on mobile.
 *
 * @param props - The props for the Footer component
 * @param props.leftContent - Content to display on the left side of the footer
 * @param props.rightContent - Content to display on the right side of the footer
 * @param props.className - Additional CSS classes to apply to the footer
 * @param props.children - Additional content to display in the footer
 * @returns JSX.Element representing the footer
 */
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
        {children}
      </div>
    </footer>
  );
};

export default Footer;

import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import { FlyoutProps } from "./Flyout.types";

export const Flyout = ({
  children,
  width = "400px",
  height = "100vh",
  role = "dialog",
  ariaLabelledBy,
  ariaDescribedBy,
  ...rest
}: FlyoutProps) => {
  return (
    <aside
      className={styles.flyout}
      style={{ width, height }}
      role={role}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      {...rest}
    >
      {children}
    </aside>
  );
};

// Sub-components
const Header: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={`${styles.header} ${className || ""}`}>{children}</div>;

const Body: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={`${styles.body} ${className || ""}`}>{children}</div>;

const Footer: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={`${styles.footer} ${className || ""}`}>{children}</div>;

// Attach sub-components
Flyout.Header = Header;
Flyout.Body = Body;
Flyout.Footer = Footer;

import { FC, ReactNode } from "react";
import styles from "../styles.module.scss";

interface PageFooterProps {
  footer?: ReactNode;
  testId?: string;
}

export const PageFooter: FC<PageFooterProps> = ({
  footer,
  testId = "page",
}) => {
  if (!footer) return null;

  return (
    <footer className={styles.footer} data-testid={`${testId}-footer`}>
      {footer}
    </footer>
  );
};

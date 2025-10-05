import { FC } from "react";
import styles from "../styles.module.scss";

interface PageTitleSectionProps {
  title?: string;
  description?: string;
  testId?: string;
}

export const PageTitleSection: FC<PageTitleSectionProps> = ({
  title,
  description,
  testId = "page",
}) => {
  if (!title && !description) return null;

  return (
    <header className={styles.pageHeader} data-testid={`${testId}-page-header`}>
      {title && <h1 className={styles.pageTitle}>{title}</h1>}
      {description && <p className={styles.pageDescription}>{description}</p>}
    </header>
  );
};

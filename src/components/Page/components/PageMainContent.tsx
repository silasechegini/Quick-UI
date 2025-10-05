import { FC, ReactNode } from "react";
import styles from "../styles.module.scss";

interface PageMainContentProps {
  children?: ReactNode;
  loading?: boolean;
  error?: string | ReactNode;
  testId?: string;
}

export const PageMainContent: FC<PageMainContentProps> = ({
  children,
  loading,
  error,
  testId = "page",
}) => {
  return (
    <main className={styles.content} data-testid={`${testId}-content`}>
      {loading ? (
        <div className={styles.loading} data-testid={`${testId}-loading`}>
          Loading...
        </div>
      ) : error ? (
        <div className={styles.error} data-testid={`${testId}-error`}>
          {typeof error === "string" ? <p>{error}</p> : error}
        </div>
      ) : (
        children
      )}
    </main>
  );
};

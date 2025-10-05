import { FC, useState } from "react";
import { PageProps } from "./Page.types";
import {
  PageHeaderWrapper,
  PageSidebar,
  PageTitleSection,
  PageMainContent,
  PageFooter,
} from "./components";
import styles from "./styles.module.scss";

export const Page: FC<PageProps> = ({
  variant = "default",
  spacing = "normal",
  title,
  description,
  children,
  header = { show: true },
  sidebar,
  footer,
  isLoading = false,
  error,
  className,
  testId = "page",
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    sidebar?.initiallyCollapsed || false,
  );

  const pageClasses = [
    styles.page,
    styles[`page--${variant}`],
    styles[`page--spacing-${spacing}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Prepare sidebar configuration for the PageSidebar component
  const sidebarConfig =
    sidebar && variant === "sidebar"
      ? {
          content: sidebar.content,
          isCollapsible: sidebar.collapsible,
          isCollapsed: isSidebarCollapsed,
        }
      : undefined;

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={pageClasses} data-testid={testId}>
      <PageHeaderWrapper header={header} testId={testId} />

      <div className={styles.pageBody}>
        <PageSidebar
          sidebarConfig={sidebarConfig}
          testId={testId}
          onToggleSidebar={handleToggleSidebar}
        />

        <div className={styles.mainContent}>
          <PageMainContent loading={isLoading} error={error} testId={testId}>
            <PageTitleSection
              title={title}
              description={description}
              testId={testId}
            />
            {children}
          </PageMainContent>
        </div>
      </div>

      <PageFooter footer={footer} testId={testId} />
    </div>
  );
};

export default Page;

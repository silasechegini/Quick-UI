import { FC, useState } from "react";
import { PageProps } from "./Page.types";
import { Header } from "../Header";
import { Button } from "../Button";
import Icon from "../Icon/Icon";
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
  contentClassName,
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

  const contentClasses = [styles.content, contentClassName]
    .filter(Boolean)
    .join(" ");

  const renderHeader = () => {
    if (!header?.show) return null;

    return <Header {...header} testId={`${testId}-header`} />;
  };

  const renderSidebar = () => {
    if (!sidebar || variant !== "sidebar") return null;

    const sidebarClasses = [
      styles.sidebar,
      styles[`sidebar--${sidebar.position || "left"}`],
      isSidebarCollapsed ? styles.sidebarCollapsed : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <aside
        className={sidebarClasses}
        style={{ width: isSidebarCollapsed ? "0" : sidebar.width }}
        data-testid={`${testId}-sidebar`}
      >
        {sidebar.collapsible && (
          <Button
            variant="tertiary"
            size="s"
            className={styles.sidebarToggle}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            aria-label={
              isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            <Icon
              name={
                isSidebarCollapsed ? "chevron_right_icon" : "chevron_left_icon"
              }
              size={16}
            />
          </Button>
        )}
        {!isSidebarCollapsed && (
          <div className={styles.sidebarContent}>{sidebar.content}</div>
        )}
      </aside>
    );
  };

  const renderPageHeader = () => {
    if (!title && !description) return null;

    return (
      <header
        className={styles.pageHeader}
        data-testid={`${testId}-page-header`}
      >
        {title && <h1 className={styles.pageTitle}>{title}</h1>}
        {description && <p className={styles.pageDescription}>{description}</p>}
      </header>
    );
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className={styles.errorState} data-testid={`${testId}-error`}>
          {typeof error === "string" ? (
            <div className={styles.errorMessage}>
              <Icon name="close_icon" size={24} className={styles.errorIcon} />
              <h3>Something went wrong</h3>
              <p>{error}</p>
            </div>
          ) : (
            error
          )}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={styles.loadingState} data-testid={`${testId}-loading`}>
          <Icon
            name="spinner_icon"
            size={24}
            className={styles.loadingSpinner}
          />
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <main className={contentClasses} data-testid={`${testId}-content`}>
        {renderPageHeader()}
        {children}
      </main>
    );
  };

  const renderFooter = () => {
    if (!footer) return null;

    return (
      <footer className={styles.footer} data-testid={`${testId}-footer`}>
        {footer}
      </footer>
    );
  };

  return (
    <div className={pageClasses} data-testid={testId}>
      {renderHeader()}

      <div className={styles.pageBody}>
        {renderSidebar()}

        <div className={styles.mainContent}>{renderContent()}</div>
      </div>

      {renderFooter()}
    </div>
  );
};

export default Page;

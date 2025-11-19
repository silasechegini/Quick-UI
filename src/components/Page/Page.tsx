import { FC, useState } from "react";
import {
  PAGE_SIDEBAR_POSITIONS,
  PAGE_SPACINGS,
  PAGE_VARIANTS,
  PageProps,
} from "./Page.types";
import {
  PageHeaderWrapper,
  PageSidebar,
  PageTitleSection,
  PageMainContent,
  PageFooter,
} from "./components";
import styles from "./styles.module.scss";

/**
 * Page component that provides a complete page layout with header, sidebar, main content, and footer.
 * Supports multiple layout variants, responsive design, and loading/error states.
 *
 * @param props - The props for the Page component
 * @param props.variant - The layout variant of the page (default: "default")
 * @param props.spacing - The spacing variant for content padding (default: "normal")
 * @param props.title - The page title to display in the header
 * @param props.description - The page description to display below the title
 * @param props.children - The main content of the page
 * @param props.header - Header configuration object (default: { show: true })
 * @param props.sidebar - Sidebar configuration and content
 * @param props.footer - Footer configuration and content
 * @param props.isLoading - Whether the page is in a loading state (default: false)
 * @param props.error - Error message to display if the page is in an error state
 * @param props.className - Additional CSS classes to apply to the page
 * @param props.testId - Test ID for the page element (default: "page")
 * @returns JSX.Element representing the complete page layout
 */
export const Page: FC<PageProps> = ({
  variant = PAGE_VARIANTS.DEFAULT,
  spacing = PAGE_SPACINGS.NORMAL,
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
    sidebar && variant === PAGE_VARIANTS.SIDEBAR
      ? {
          content: sidebar.content,
          isCollapsible: sidebar.collapsible,
          isCollapsed: isSidebarCollapsed,
          position: sidebar.position || PAGE_SIDEBAR_POSITIONS.LEFT,
          width: sidebar.width || "300px",
        }
      : undefined;

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Update header config to disable hamburger menu when using sidebar
  const headerConfig =
    header && variant === PAGE_VARIANTS.SIDEBAR && sidebar?.collapsible
      ? { ...header, showHamburgerMenu: false }
      : header;

  return (
    <div className={pageClasses} data-testid={testId}>
      <PageHeaderWrapper header={headerConfig} testId={testId} />

      <div
        className={`${styles.pageBody} ${sidebar?.position === PAGE_SIDEBAR_POSITIONS.RIGHT ? styles.rightSidebar : ""}`}
      >
        {sidebar?.position !== PAGE_SIDEBAR_POSITIONS.RIGHT && (
          <PageSidebar
            sidebarConfig={sidebarConfig}
            testId={testId}
            onToggleSidebar={handleToggleSidebar}
          />
        )}

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

        {sidebar?.position === PAGE_SIDEBAR_POSITIONS.RIGHT && (
          <PageSidebar
            sidebarConfig={sidebarConfig}
            testId={testId}
            onToggleSidebar={handleToggleSidebar}
          />
        )}
      </div>

      <PageFooter footer={footer} testId={testId} />
    </div>
  );
};

export default Page;

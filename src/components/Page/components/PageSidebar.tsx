import { FC, ReactNode } from "react";
import styles from "../styles.module.scss";

interface PageSidebarProps {
  sidebarConfig?: {
    content: ReactNode;
    isCollapsible?: boolean;
    isCollapsed?: boolean;
  };
  testId?: string;
  onToggleSidebar?: () => void;
}

export const PageSidebar: FC<PageSidebarProps> = ({
  sidebarConfig,
  testId = "page",
  onToggleSidebar,
}) => {
  if (!sidebarConfig) return null;

  const { content, isCollapsible, isCollapsed } = sidebarConfig;

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
      data-testid={`${testId}-sidebar`}
    >
      {isCollapsible && (
        <button
          className={styles.toggleSidebar}
          onClick={onToggleSidebar}
          data-testid={`${testId}-sidebar-toggle`}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      )}
      <div className={styles.sidebarContent}>{content}</div>
    </aside>
  );
};

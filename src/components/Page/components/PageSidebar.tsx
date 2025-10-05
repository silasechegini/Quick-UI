import { FC, ReactNode } from "react";
import Icon from "../../Icon/Icon";
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
          <Icon
            name={isCollapsed ? "chevron_right_icon" : "chevron_left_icon"}
            size={16}
          />
        </button>
      )}
      <div className={styles.sidebarContent}>{content}</div>
    </aside>
  );
};

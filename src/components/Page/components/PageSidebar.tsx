import { FC, ReactNode } from "react";
import Icon from "../../Icon/Icon";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "../../Button";
import styles from "../styles.module.scss";
import { ICONS } from "@assets/iconType";

interface PageSidebarProps {
  sidebarConfig?: {
    content: ReactNode;
    isCollapsible?: boolean;
    isCollapsed?: boolean;
    position?: "left" | "right";
    width?: string;
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

  const {
    content,
    isCollapsible,
    isCollapsed,
    position = "left",
    width = "300px",
  } = sidebarConfig;

  const sidebarClasses = [
    styles.sidebar,
    isCollapsed ? styles.sidebarCollapsed : "",
    position === "right" ? styles.sidebarRight : "",
  ]
    .filter(Boolean)
    .join(" ");

  const toggleIconName =
    position === "right"
      ? isCollapsed
        ? ICONS.CHEVRON_LEFT_ICON
        : ICONS.CHEVRON_RIGHT_ICON
      : isCollapsed
        ? ICONS.CHEVRON_RIGHT_ICON
        : ICONS.CHEVRON_LEFT_ICON;

  return (
    <aside
      className={sidebarClasses}
      style={{ width: isCollapsed ? "48px" : width }}
      data-testid={`${testId}-sidebar`}
    >
      {isCollapsible && (
        <Button
          variant={BUTTON_VARIANTS.PLAIN}
          size={BUTTON_SIZES.EXTRASMALL}
          className={`${styles.toggleSidebar} ${position === "right" ? styles.toggleSidebarRight : ""} ${isCollapsed ? styles.toggleSidebarCollapsed : ""}`}
          onClick={onToggleSidebar}
          data-testid={`${testId}-sidebar-toggle`}
          ariaLabel={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          icon={<Icon name={toggleIconName} size={16} />}
        />
      )}
      <div
        className={styles.sidebarContent}
        style={{ display: isCollapsed ? "none" : "block" }}
      >
        {content}
      </div>
    </aside>
  );
};

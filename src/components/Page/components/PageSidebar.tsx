import { FC, ReactNode } from "react";
import Icon from "../../Icon/Icon";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "../../Button";
import styles from "../styles.module.scss";
import { ICONS } from "../../../assets/iconType";

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
        <Button
          variant={BUTTON_VARIANTS.PLAIN}
          size={BUTTON_SIZES.EXTRASMALL}
          className={styles.toggleSidebar}
          onClick={onToggleSidebar}
          data-testid={`${testId}-sidebar-toggle`}
          ariaLabel={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          icon={
            <Icon
              name={
                isCollapsed ? ICONS.CHEVRON_RIGHT_ICON : ICONS.CHEVRON_LEFT_ICON
              }
              size={16}
            />
          }
        />
      )}
      <div className={styles.sidebarContent}>{content}</div>
    </aside>
  );
};

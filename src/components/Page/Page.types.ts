import { ReactNode } from "react";
import { HeaderProps } from "../Header/Header.types";

export type PageVariant = "default" | "centered" | "fullwidth" | "sidebar";
export type PageSpacing = "compact" | "normal" | "spacious";

export interface PageHeaderConfig extends Omit<HeaderProps, "testId"> {
  /**
   * Whether to show the header
   */
  show?: boolean;
}

export interface PageSidebarConfig {
  /**
   * Sidebar content
   */
  content: ReactNode;
  /**
   * Sidebar position
   */
  position?: "left" | "right";
  /**
   * Sidebar width
   */
  width?: string;
  /**
   * Whether sidebar is collapsible
   */
  collapsible?: boolean;
  /**
   * Initial collapsed state
   */
  initiallyCollapsed?: boolean;
}

export interface PageProps {
  /**
   * Visual variant of the page layout
   */
  variant?: PageVariant;
  /**
   * Spacing variant for content area
   */
  spacing?: PageSpacing;
  /**
   * Page title
   */
  title?: string;
  /**
   * Page description/subtitle
   */
  description?: string;
  /**
   * Main page content
   */
  children: ReactNode;
  /**
   * Header configuration
   */
  header?: PageHeaderConfig;
  /**
   * Sidebar configuration (for sidebar variant)
   */
  sidebar?: PageSidebarConfig;
  /**
   * Footer content
   */
  footer?: ReactNode;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Error state content
   */
  error?: ReactNode;
  /**
   * Custom CSS class for the page container
   */
  className?: string;
  /**
   * Custom CSS class for the content area
   */
  contentClassName?: string;
  /**
   * Custom data-testid for testing
   */
  testId?: string;
}

import { ReactNode } from "react";
import { HeaderProps } from "../Header/Header.types";

/**
 * Page component type definitions
 */

/** Enums for Page component variants and spacings */
export enum PAGE_VARIANTS {
  DEFAULT = "default",
  CENTERED = "centered",
  FULLWIDTH = "fullwidth",
  SIDEBAR = "sidebar",
}

export enum PAGE_SPACINGS {
  COMPACT = "compact",
  NORMAL = "normal",
  SPACIOUS = "spacious",
}

export enum PAGE_SIDEBAR_POSITIONS {
  LEFT = "left",
  RIGHT = "right",
}

/** Type aliases for Page component props */
export type PageVariant = (typeof PAGE_VARIANTS)[keyof typeof PAGE_VARIANTS];
export type PageSpacing = (typeof PAGE_SPACINGS)[keyof typeof PAGE_SPACINGS];
export type PageSidebarPosition =
  (typeof PAGE_SIDEBAR_POSITIONS)[keyof typeof PAGE_SIDEBAR_POSITIONS];

/** PageHeaderConfig - Configuration for the page header
 */
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
  position?: PageSidebarPosition;
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

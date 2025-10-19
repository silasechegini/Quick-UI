import { IconKey } from "@assets/iconType";
import { ReactNode } from "react";

export interface User {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface HamburgerMenuItem {
  id: string;
  label: string;
  icon?: IconKey | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean; // Add a divider after this item
}

export type HeaderVariant = "default" | "minimal" | "compact";
export type HeaderPosition = "static" | "sticky" | "fixed";

export interface HeaderProps {
  /**
   * Visual variant of the header
   */
  variant?: HeaderVariant;
  /**
   * Position behavior of the header
   */
  position?: HeaderPosition;
  /**
   * Logo or brand element (can be image, icon, or text)
   */
  logo?: ReactNode;
  /**
   * Brand name or title
   */
  brandName?: string;
  /**
   * Click handler for brand/logo area
   */
  onBrandClick?: () => void;
  /**
   * Navigation items to display in the header
   */
  navigationItems?: ReactNode;
  /**
   * Content to display in the center of the header
   */
  centerContent?: ReactNode;
  /**
   * Current user information
   */
  user?: User;
  /**
   * Login handler
   */
  onLogin?: () => void;
  /**
   * Logout handler
   */
  onLogout?: () => void;
  /**
   * Account creation handler
   */
  onCreateAccount?: () => void;
  /**
   * Profile click handler (when user is logged in)
   */
  onProfileClick?: () => void;

  /**
   * Settings click handler (when user is logged in)
   */
  onSettingsClick?: () => void;
  /**
   * Additional actions to display on the right side
   */
  actions?: ReactNode;
  /**
   * Show/hide authentication buttons
   */
  showAuth?: boolean;
  /**
   * Show/hide hamburger menu
   */
  showHamburgerMenu?: boolean;
  /**
   * Configurable hamburger menu items
   */
  hamburgerMenuItems?: HamburgerMenuItem[];
  /**
   * Custom CSS class
   */
  className?: string;
  /**
   * Custom data-testid for testing
   */
  testId?: string;
}

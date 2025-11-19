import { HTMLAttributes, ReactNode } from "react";

/** Flyout component type definitions
 */

/** Enums for Flyout component roles */
export enum FLYOUT_ROLES {
  DIALOG = "dialog",
  COMPLEMENTARY = "complementary",
}

/** Type alias for Flyout component role */
export type FlyoutRole = (typeof FLYOUT_ROLES)[keyof typeof FLYOUT_ROLES];

/** FlyoutProps - Props for the Flyout component */
export interface FlyoutProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  headerChildren?: ReactNode;
  footerChildren?: ReactNode;
  bodyChildren?: ReactNode;
  classNames?: {
    header?: string;
    body?: string;
    footer?: string;
  };
  width?: string | number;
  height?: string | number;
  role?: FlyoutRole;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  isOpen: boolean;
  onClose?: () => void;
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
}

/** FlyoutHeaderProps - Props for the FlyoutHeader component */
export interface FlyoutHeaderProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

/** FlyoutBodyProps - Props for the FlyoutBody component */
export interface FlyoutBodyProps {
  children: ReactNode;
  className?: string;
}

/** FlyoutFooterProps - Props for the FlyoutFooter component */
export interface FlyoutFooterProps {
  children: ReactNode;
  className?: string;
}

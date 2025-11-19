import { HTMLAttributes, ReactNode } from "react";

export enum FLYOUT_ROLES {
  DIALOG = "dialog",
  COMPLEMENTARY = "complementary",
}

export type FlyoutRole = (typeof FLYOUT_ROLES)[keyof typeof FLYOUT_ROLES];

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

export interface FlyoutHeaderProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export interface FlyoutBodyProps {
  children: ReactNode;
  className?: string;
}

export interface FlyoutFooterProps {
  children: ReactNode;
  className?: string;
}

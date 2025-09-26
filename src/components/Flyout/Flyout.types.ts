import { HTMLAttributes, ReactNode } from "react";

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
  role?: "dialog" | "complementary";
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  isOpen: boolean;
  onClose?: () => void;
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
}

export interface FlyoutHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface FlyoutBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface FlyoutFooterProps {
  children: React.ReactNode;
  className?: string;
}

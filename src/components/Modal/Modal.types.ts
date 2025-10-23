import { ReactNode } from "react";

export enum MODAL_SIZES {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
  EXTRA_LARGE = "xl",
  FULL = "full",
}

export enum MODAL_VARIANTS {
  DEFAULT = "default",
  CENTERED = "centered",
  SLIDE_UP = "slide-up",
  SLIDE_RIGHT = "slide-right",
}

export type ModalSize = (typeof MODAL_SIZES)[keyof typeof MODAL_SIZES];
export type ModalVariant = (typeof MODAL_VARIANTS)[keyof typeof MODAL_VARIANTS];

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: ReactNode;
  /** Modal content */
  children: ReactNode;
  /** Footer content (typically buttons) */
  footer?: ReactNode;
  /** Size of the modal */
  size?: ModalSize;
  /** Animation variant */
  variant?: ModalVariant;
  /** Whether clicking the overlay closes the modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing ESC closes the modal */
  closeOnEsc?: boolean;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Custom className for the modal container */
  className?: string;
  /** Custom className for the modal content */
  contentClassName?: string;
  /** Custom className for the overlay */
  overlayClassName?: string;
  /** Custom className for the header */
  headerClassName?: string;
  /** Custom className for the body */
  bodyClassName?: string;
  /** Custom className for the footer */
  footerClassName?: string;
  /** Whether the modal body should be scrollable */
  scrollable?: boolean;
  /** Callback fired when modal finishes opening */
  onAfterOpen?: () => void;
  /** Callback fired when modal finishes closing */
  onAfterClose?: () => void;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** ARIA described by ID for accessibility */
  ariaDescribedBy?: string;
  /** Whether to prevent body scroll when modal is open */
  preventBodyScroll?: boolean;
  /** z-index for the modal */
  zIndex?: number;
}

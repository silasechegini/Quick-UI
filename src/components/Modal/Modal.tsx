import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { ModalProps, MODAL_SIZES, MODAL_VARIANTS } from "./Modal.types";
import { combineClasses } from "../../utils";
import { Icon } from "../Icon";
import { ICONS } from "../../assets/iconType";
import styles from "./styles.module.scss";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "@/components/Button";

/**
 * Modal - A dialog component that overlays the page
 *
 * Displays content in a layer above the main application, typically used for
 * forms, confirmations, or detailed information that requires user attention.
 *
 * @example
 * // Basic modal
 * <Modal isOpen={isOpen} onClose={handleClose} title="Confirm Action">
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 *
 * @example
 * // Modal with footer
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Delete Item"
 *   footer={
 *     <>
 *       <Button onClick={handleClose}>Cancel</Button>
 *       <Button variant="error" onClick={handleDelete}>Delete</Button>
 *     </>
 *   }
 * >
 *   <p>This action cannot be undone.</p>
 * </Modal>
 *
 * @example
 * // Large modal with custom variant
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="User Profile"
 *   size="lg"
 *   variant="slide-right"
 * >
 *   <UserProfileForm />
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = MODAL_SIZES.MEDIUM,
  variant = MODAL_VARIANTS.DEFAULT,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className,
  contentClassName,
  overlayClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  scrollable = true,
  onAfterOpen,
  onAfterClose,
  ariaLabel,
  ariaDescribedBy,
  preventBodyScroll = true,
  zIndex = 1000,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(isOpen);

  // Handle ESC key press
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === "Escape") {
        onClose();
      }
    },
    [closeOnEsc, onClose],
  );

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);

      // Add ESC key listener
      document.addEventListener("keydown", handleEscKey);

      // Prevent body scroll
      if (preventBodyScroll) {
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscKey);
        if (preventBodyScroll) {
          document.body.style.overflow = "";
        }
      };
    } else {
      // Restore focus when modal closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen, handleEscKey, preventBodyScroll]);

  // Animation handling
  useEffect(() => {
    let animationTimer: NodeJS.Timeout | undefined;
    let closeTimer: NodeJS.Timeout | undefined;

    if (isOpen) {
      setShouldRender(true);
      // Trigger animation after render
      animationTimer = setTimeout(() => setIsAnimating(true), 10);
      onAfterOpen?.();
    } else {
      setIsAnimating(false);
      // Remove from DOM after animation
      closeTimer = setTimeout(() => {
        setShouldRender(false);
        onAfterClose?.();
      }, 300); // Match animation duration
    }

    return () => {
      if (animationTimer) clearTimeout(animationTimer);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [isOpen, onAfterOpen, onAfterClose]);

  // Don't render if not open and animation finished
  if (!shouldRender) {
    return null;
  }

  const overlayClasses = combineClasses(
    styles.overlay,
    isAnimating && styles.overlayVisible,
    overlayClassName,
  );

  const modalClasses = combineClasses(
    styles.modal,
    styles[`size-${size}`],
    variant !== MODAL_VARIANTS.DEFAULT && styles[`variant-${variant}`],
    isAnimating && styles.modalVisible,
    className,
  );

  const contentClasses = combineClasses(styles.content, contentClassName);
  const headerClasses = combineClasses(styles.header, headerClassName);
  const bodyClasses = combineClasses(
    styles.body,
    scrollable && styles.scrollable,
    !footer && styles.bodyNoFooter,
    bodyClassName,
  );
  const footerClasses = combineClasses(styles.footer, footerClassName);

  // Determine the aria-label value
  const getAriaLabel = (): string => {
    if (ariaLabel) return ariaLabel;
    if (typeof title === "string") return title;

    // This should never happen with proper TypeScript usage, but provide a warning in development
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Modal: ariaLabel is required when title is not a string. Please provide an ariaLabel prop for accessibility.",
      );
    }
    return "Dialog"; // Fallback for runtime safety
  };

  const modalContent = (
    <div
      className={overlayClasses}
      onClick={handleOverlayClick}
      style={{ zIndex }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-label={getAriaLabel()}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
      >
        <div className={contentClasses}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className={headerClasses}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {showCloseButton && (
                <Button
                  type="button"
                  className={styles.closeButton}
                  onClick={onClose}
                  ariaLabel="Close modal"
                  variant={BUTTON_VARIANTS.PLAIN}
                  size={BUTTON_SIZES.EXTRASMALL}
                  icon={<Icon name={ICONS.CLOSE_ICON} size={20} />}
                />
              )}
            </div>
          )}

          {/* Body */}
          <div className={bodyClasses}>{children}</div>

          {/* Footer */}
          {footer && <div className={footerClasses}>{footer}</div>}
        </div>
      </div>
    </div>
  );

  // Render in portal
  return createPortal(modalContent, document.body);
};

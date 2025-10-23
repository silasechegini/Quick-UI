import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { ModalProps, MODAL_SIZES, MODAL_VARIANTS } from "./Modal.types";
import { combineClasses } from "../../utils";
import { Icon } from "../Icon";
import { ICONS } from "../../assets/iconType";
import styles from "./styles.module.scss";

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
    if (isOpen) {
      setShouldRender(true);
      // Trigger animation after render
      setTimeout(() => setIsAnimating(true), 10);
      onAfterOpen?.();
    } else {
      setIsAnimating(false);
      // Remove from DOM after animation
      const timer = setTimeout(() => {
        setShouldRender(false);
        onAfterClose?.();
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
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
    styles[`variant-${variant}`],
    isAnimating && styles.modalVisible,
    className,
  );

  const contentClasses = combineClasses(styles.content, contentClassName);
  const headerClasses = combineClasses(styles.header, headerClassName);
  const bodyClasses = combineClasses(
    styles.body,
    scrollable && styles.scrollable,
    bodyClassName,
  );
  const footerClasses = combineClasses(styles.footer, footerClassName);

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
        aria-label={ariaLabel || (typeof title === "string" ? title : "Modal")}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
      >
        <div className={contentClasses}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className={headerClasses}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {showCloseButton && (
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <Icon name={ICONS.CLOSE_ICON} size={20} />
                </button>
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

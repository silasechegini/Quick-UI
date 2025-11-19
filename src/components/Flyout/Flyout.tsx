import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FocusTrap } from "focus-trap-react";
import styles from "./styles.module.scss";
import { FLYOUT_ROLES, FlyoutProps } from "./Flyout.types";
import FlyoutHeader from "./components/FlyoutHeader";
import FlyoutBody from "./components/FlyoutBody";
import FlyoutFooter from "./components/FlyoutFooter";

/**
 * Flyout component that displays content in a sliding panel overlay.
 * Supports configurable positioning, backdrop, and focus management.
 *
 * @param props - The props for the Flyout component
 * @param props.role - ARIA role for the flyout (default: "dialog")
 * @param props.isOpen - Whether the flyout is currently open
 * @param props.onClose - Callback function called when the flyout should close
 * @param props.width - Width of the flyout panel (default: "400px")
 * @param props.height - Height of the flyout panel (default: "100vh")
 * @param props.children - Content to display in the flyout
 * @param props.showBackdrop - Whether to show a backdrop overlay (default: true)
 * @param props.closeOnBackdropClick - Whether clicking the backdrop should close the flyout (default: true)
 * @param props.ariaLabelledBy - ID of element that labels the flyout
 * @param props.ariaDescribedBy - ID of element that describes the flyout
 * @param props.headerChildren - Content to display in the flyout header
 * @param props.bodyChildren - Content to display in the flyout body
 * @param props.footerChildren - Content to display in the flyout footer
 * @param props.classNames - Custom CSS class names for different parts of the flyout (default: {})
 * @returns JSX.Element representing the flyout component
 */
const Flyout = ({
  role = FLYOUT_ROLES.DIALOG,
  isOpen,
  onClose,
  width = "400px",
  height = "100vh",
  children,
  showBackdrop = true,
  closeOnBackdropClick = true,
  ariaLabelledBy,
  ariaDescribedBy,
  headerChildren,
  bodyChildren,
  footerChildren,
  classNames = {},
}: FlyoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Capture the triggering element when Flyout is opened
  useEffect(() => {
    if (isOpen && typeof document !== "undefined") {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Restore focus to the trigger element on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = () => {
    if (closeOnBackdropClick && onClose) onClose();
  };

  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      {showBackdrop && (
        <div
          className={styles.backdrop}
          onClick={handleBackdropClick}
          data-testid="flyout-backdrop"
        />
      )}

      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          initialFocus: () => containerRef.current || undefined,
          allowOutsideClick: true,
        }}
      >
        <aside
          ref={containerRef}
          className={`${styles.flyout} ${isOpen ? styles.slideIn : styles.slideOut}`}
          style={{ width, height }}
          role={role}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
        >
          <FlyoutHeader className={classNames.header} onClose={onClose}>
            {headerChildren}
          </FlyoutHeader>
          {bodyChildren && (
            <FlyoutBody className={classNames.body}>{bodyChildren}</FlyoutBody>
          )}
          {footerChildren && (
            <FlyoutFooter className={classNames.footer}>
              {footerChildren}
            </FlyoutFooter>
          )}
          {children}
        </aside>
      </FocusTrap>
    </div>,
    document.body,
  );
};

export default Flyout;

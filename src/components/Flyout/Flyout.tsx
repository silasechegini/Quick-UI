import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FocusTrap } from "focus-trap-react";
import styles from "./styles.module.scss";
import { FlyoutProps } from "./Flyout.types";
import FlyoutHeader from "./components/FlyoutHeader";
import FlyoutBody from "./components/FlyoutBody";
import FlyoutFooter from "./components/FlyoutFooter";

const Flyout = ({
  role = "dialog",
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
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
      {showBackdrop && (
        <div className={styles.backdrop} onClick={handleBackdropClick} />
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
            {headerChildren !== undefined && headerChildren}
          </FlyoutHeader>
          {bodyChildren !== undefined && (
            <FlyoutBody className={classNames.body}>{bodyChildren}</FlyoutBody>
          )}
          {footerChildren !== undefined && (
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

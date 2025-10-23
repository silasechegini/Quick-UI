import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Modal } from "../Modal";
import { MODAL_SIZES, MODAL_VARIANTS } from "../Modal.types";
import styles from "../styles.module.scss";

describe("Modal Component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render when isOpen is true", () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    it("should not render when isOpen is false", () => {
      render(<Modal {...defaultProps} isOpen={false} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render with title", () => {
      render(<Modal {...defaultProps} title="Test Modal" />);
      expect(screen.getByText("Test Modal")).toBeInTheDocument();
    });

    it("should render with footer", () => {
      render(
        <Modal
          {...defaultProps}
          footer={<button type="button">Action</button>}
        />,
      );
      expect(
        screen.getByRole("button", { name: "Action" }),
      ).toBeInTheDocument();
    });

    it("should render close button by default", () => {
      render(<Modal {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: "Close modal" }),
      ).toBeInTheDocument();
    });

    it("should not render close button when showCloseButton is false", () => {
      render(<Modal {...defaultProps} showCloseButton={false} />);
      expect(
        screen.queryByRole("button", { name: "Close modal" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("Closing Behavior", () => {
    it("should call onClose when close button is clicked", () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.click(screen.getByRole("button", { name: "Close modal" }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when overlay is clicked and closeOnOverlayClick is true", () => {
      const onClose = vi.fn();
      render(
        <Modal
          {...defaultProps}
          onClose={onClose}
          closeOnOverlayClick={true}
        />,
      );

      const overlay = screen.getByRole("dialog").parentElement;
      fireEvent.click(overlay!);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should not call onClose when overlay is clicked and closeOnOverlayClick is false", () => {
      const onClose = vi.fn();
      render(
        <Modal
          {...defaultProps}
          onClose={onClose}
          closeOnOverlayClick={false}
        />,
      );

      const overlay = screen.getByRole("dialog").parentElement;
      fireEvent.click(overlay!);
      expect(onClose).not.toHaveBeenCalled();
    });

    it("should call onClose when ESC key is pressed and closeOnEsc is true", () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} closeOnEsc={true} />);

      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should not call onClose when ESC key is pressed and closeOnEsc is false", () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} closeOnEsc={false} />);

      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).not.toHaveBeenCalled();
    });

    it("should not call onClose when clicking inside modal content", () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.click(screen.getByRole("dialog"));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Sizes", () => {
    it("should apply small size class", () => {
      render(<Modal {...defaultProps} size={MODAL_SIZES.SMALL} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["size-sm"]);
    });

    it("should apply medium size class by default", () => {
      render(<Modal {...defaultProps} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["size-md"]);
    });

    it("should apply large size class", () => {
      render(<Modal {...defaultProps} size={MODAL_SIZES.LARGE} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["size-lg"]);
    });

    it("should apply extra large size class", () => {
      render(<Modal {...defaultProps} size={MODAL_SIZES.EXTRA_LARGE} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["size-xl"]);
    });

    it("should apply full size class", () => {
      render(<Modal {...defaultProps} size={MODAL_SIZES.FULL} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["size-full"]);
    });
  });

  describe("Variants", () => {
    it("should apply default variant class", () => {
      render(<Modal {...defaultProps} variant={MODAL_VARIANTS.DEFAULT} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["variant-default"]);
    });

    it("should apply centered variant class", () => {
      render(<Modal {...defaultProps} variant={MODAL_VARIANTS.CENTERED} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["variant-centered"]);
    });

    it("should apply slide-up variant class", () => {
      render(<Modal {...defaultProps} variant={MODAL_VARIANTS.SLIDE_UP} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["variant-slide-up"]);
    });

    it("should apply slide-right variant class", () => {
      render(<Modal {...defaultProps} variant={MODAL_VARIANTS.SLIDE_RIGHT} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["variant-slide-right"]);
    });
  });

  describe("Custom Classes", () => {
    it("should apply custom className to modal", () => {
      render(<Modal {...defaultProps} className="custom-modal" />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass("custom-modal");
    });

    it("should apply custom contentClassName", () => {
      render(<Modal {...defaultProps} contentClassName="custom-content" />);
      const content = screen.getByRole("dialog").firstChild as HTMLElement;
      expect(content).toHaveClass("custom-content");
    });

    it("should apply custom headerClassName", () => {
      render(
        <Modal
          {...defaultProps}
          title="Test"
          headerClassName="custom-header"
        />,
      );
      const header = screen.getByText("Test").parentElement as HTMLElement;
      expect(header).toHaveClass("custom-header");
    });

    it("should apply custom bodyClassName", () => {
      render(<Modal {...defaultProps} bodyClassName="custom-body" />);
      const body = screen.getByText("Modal content")
        .parentElement as HTMLElement;
      expect(body).toHaveClass("custom-body");
    });

    it("should apply custom footerClassName", () => {
      render(
        <Modal
          {...defaultProps}
          footer={<button type="button">Action</button>}
          footerClassName="custom-footer"
        />,
      );
      const footer = screen.getByRole("button", { name: "Action" })
        .parentElement as HTMLElement;
      expect(footer).toHaveClass("custom-footer");
    });
  });

  describe("Scrollable", () => {
    it("should apply scrollable class by default", () => {
      render(<Modal {...defaultProps} />);
      const body = screen.getByText("Modal content")
        .parentElement as HTMLElement;
      expect(body).toHaveClass(styles.scrollable);
    });

    it("should not apply scrollable class when scrollable is false", () => {
      render(<Modal {...defaultProps} scrollable={false} />);
      const body = screen.getByText("Modal content")
        .parentElement as HTMLElement;
      expect(body).not.toHaveClass(styles.scrollable);
    });
  });

  describe("Accessibility", () => {
    it("should have role dialog", () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should have aria-modal true", () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });

    it("should use title as aria-label when title is string", () => {
      render(<Modal {...defaultProps} title="Test Modal" />);
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-label",
        "Test Modal",
      );
    });

    it("should use custom ariaLabel", () => {
      render(<Modal {...defaultProps} ariaLabel="Custom label" />);
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-label",
        "Custom label",
      );
    });

    it("should have aria-describedby when provided", () => {
      render(<Modal {...defaultProps} ariaDescribedBy="description-id" />);
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-describedby",
        "description-id",
      );
    });

    it("should be focusable", () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByRole("dialog")).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Enums", () => {
    it("should work with MODAL_SIZES enum", () => {
      render(<Modal {...defaultProps} size={MODAL_SIZES.LARGE} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["size-lg"]);
    });

    it("should work with MODAL_VARIANTS enum", () => {
      render(<Modal {...defaultProps} variant={MODAL_VARIANTS.SLIDE_UP} />);
      const modal = screen.getByRole("dialog");
      expect(modal).toHaveClass(styles["variant-slide-up"]);
    });
  });

  describe("Lifecycle Callbacks", () => {
    it("should call onAfterOpen when modal opens", async () => {
      const onAfterOpen = vi.fn();
      const { rerender } = render(
        <Modal {...defaultProps} isOpen={false} onAfterOpen={onAfterOpen} />,
      );

      rerender(
        <Modal {...defaultProps} isOpen={true} onAfterOpen={onAfterOpen} />,
      );

      await waitFor(() => {
        expect(onAfterOpen).toHaveBeenCalled();
      });
    });

    it("should call onAfterClose when modal closes", async () => {
      const onAfterClose = vi.fn();
      const { rerender } = render(
        <Modal {...defaultProps} isOpen={true} onAfterClose={onAfterClose} />,
      );

      rerender(
        <Modal {...defaultProps} isOpen={false} onAfterClose={onAfterClose} />,
      );

      await waitFor(
        () => {
          expect(onAfterClose).toHaveBeenCalled();
        },
        { timeout: 500 },
      );
    });
  });

  describe("Body Scroll Prevention", () => {
    it("should prevent body scroll when modal is open by default", () => {
      render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should not prevent body scroll when preventBodyScroll is false", () => {
      render(<Modal {...defaultProps} preventBodyScroll={false} />);
      expect(document.body.style.overflow).not.toBe("hidden");
    });

    it("should restore body scroll when modal closes", () => {
      const { rerender } = render(<Modal {...defaultProps} />);
      expect(document.body.style.overflow).toBe("hidden");

      rerender(<Modal {...defaultProps} isOpen={false} />);
      expect(document.body.style.overflow).toBe("");
    });
  });
});

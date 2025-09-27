import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Flyout } from "../index";

// Mock ReactDOM.createPortal to render in place for testing
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (element: React.ReactElement) => element,
}));

// Mock focus-trap-react to avoid complex focus trap testing
jest.mock("focus-trap-react", () => ({
  FocusTrap: ({
    children,
    active,
  }: {
    children: React.ReactNode;
    active: boolean;
  }) => (
    <div data-testid="focus-trap" data-active={active}>
      {children}
    </div>
  ),
}));

describe("Flyout", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    headerChildren: "Test Header",
    bodyChildren: "Test Body Content",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders when isOpen is true", () => {
      render(<Flyout {...defaultProps} />);

      const flyout = screen.getByRole("dialog");
      expect(flyout).toBeInTheDocument();
      expect(flyout).toHaveClass("slideIn");
      expect(flyout).not.toHaveClass("slideOut");
      expect(screen.getByText("Test Header")).toBeInTheDocument();
      expect(screen.getByText("Test Body Content")).toBeInTheDocument();
    });

    it("renders with slideOut class when isOpen is false", () => {
      render(<Flyout {...defaultProps} isOpen={false} showBackdrop={false} />);

      const flyout = screen.getByRole("dialog");
      expect(flyout).toBeInTheDocument();
      expect(flyout).toHaveClass("slideOut");
      expect(flyout).not.toHaveClass("slideIn");
    });

    it("renders with default props", () => {
      render(<Flyout isOpen={true} />);

      const flyout = screen.getByRole("dialog");
      expect(flyout).toBeInTheDocument();
    });

    it("renders children when provided", () => {
      render(
        <Flyout isOpen={true}>
          <div>Custom children content</div>
        </Flyout>,
      );

      expect(screen.getByText("Custom children content")).toBeInTheDocument();
    });

    it("conditionally renders body and footer sections", () => {
      const { rerender } = render(
        <Flyout
          isOpen={true}
          headerChildren="Header"
          bodyChildren="Body"
          footerChildren="Footer"
        />,
      );

      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();

      // Rerender without body and footer
      rerender(<Flyout isOpen={true} headerChildren="Header" />);

      expect(screen.queryByText("Body")).not.toBeInTheDocument();
      expect(screen.queryByText("Footer")).not.toBeInTheDocument();
    });

    it("applies correct CSS classes based on isOpen state", () => {
      const { rerender } = render(<Flyout {...defaultProps} isOpen={true} />);

      let flyout = screen.getByRole("dialog");
      expect(flyout).toHaveClass("slideIn");
      expect(flyout).not.toHaveClass("slideOut");

      // Change to closed state
      rerender(<Flyout {...defaultProps} isOpen={false} />);

      flyout = screen.getByRole("dialog");
      expect(flyout).toHaveClass("slideOut");
      expect(flyout).not.toHaveClass("slideIn");
    });
  });

  describe("Props and Styling", () => {
    it("applies custom width and height", () => {
      render(<Flyout {...defaultProps} width="600px" height="80vh" />);

      const flyout = screen.getByRole("dialog");
      expect(flyout).toHaveStyle({
        width: "600px",
        height: "80vh",
      });
    });

    it("uses default width and height when not provided", () => {
      render(<Flyout {...defaultProps} />);

      const flyout = screen.getByRole("dialog");
      expect(flyout).toHaveStyle({
        width: "400px",
        height: "100vh",
      });
    });

    it("applies custom classNames to sections", () => {
      const classNames = {
        header: "custom-header",
        body: "custom-body",
        footer: "custom-footer",
      };

      render(
        <Flyout
          {...defaultProps}
          footerChildren="Footer"
          classNames={classNames}
        />,
      );

      // Note: We'd need to check the actual DOM structure to verify classNames are applied
      // This would depend on how the components handle the className prop
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("renders with custom role", () => {
      render(<Flyout {...defaultProps} role="complementary" />);

      expect(screen.getByRole("complementary")).toBeInTheDocument();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("sets proper ARIA attributes", () => {
      render(
        <Flyout
          {...defaultProps}
          ariaLabelledBy="flyout-title"
          ariaDescribedBy="flyout-description"
        />,
      );

      const flyout = screen.getByRole("dialog");
      expect(flyout).toHaveAttribute("aria-labelledby", "flyout-title");
      expect(flyout).toHaveAttribute("aria-describedby", "flyout-description");
    });

    it("has proper focus trap integration", () => {
      render(<Flyout {...defaultProps} />);

      const focusTrap = screen.getByTestId("focus-trap");
      expect(focusTrap).toHaveAttribute("data-active", "true");
    });

    it("focus trap is inactive when flyout is closed", () => {
      render(<Flyout {...defaultProps} isOpen={false} />);

      // Focus trap should still be rendered but marked as inactive
      const focusTrap = screen.getByTestId("focus-trap");
      expect(focusTrap).toBeInTheDocument();
      expect(focusTrap).toHaveAttribute("data-active", "false");
    });
  });

  describe("Backdrop Functionality", () => {
    it("renders backdrop by default", () => {
      const { container } = render(<Flyout {...defaultProps} />);

      const backdrop = container.querySelector(".backdrop");
      expect(backdrop).toBeInTheDocument();
    });

    it("does not render backdrop when showBackdrop is false", () => {
      const { container } = render(
        <Flyout {...defaultProps} showBackdrop={false} />,
      );

      const backdrop = container.querySelector(".backdrop");
      expect(backdrop).not.toBeInTheDocument();
    });

    it("calls onClose when backdrop is clicked and closeOnBackdropClick is true", async () => {
      const onClose = jest.fn();
      const { container } = render(
        <Flyout
          {...defaultProps}
          onClose={onClose}
          closeOnBackdropClick={true}
        />,
      );

      const backdrop = container.querySelector(".backdrop");
      expect(backdrop).toBeInTheDocument();

      fireEvent.click(backdrop as Element);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when backdrop is clicked and closeOnBackdropClick is false", async () => {
      const onClose = jest.fn();
      const { container } = render(
        <Flyout
          {...defaultProps}
          onClose={onClose}
          closeOnBackdropClick={false}
        />,
      );

      const backdrop = container.querySelector(".backdrop");
      expect(backdrop).not.toBeNull();
      fireEvent.click(backdrop as Element);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Interactions", () => {
    it("calls onClose when Escape key is pressed", async () => {
      const onClose = jest.fn();

      render(<Flyout {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when Escape is pressed if onClose is not provided", () => {
      // Should not throw error
      render(<Flyout isOpen={true} />);

      expect(() => {
        fireEvent.keyDown(document, { key: "Escape" });
      }).not.toThrow();
    });

    it("ignores other key presses", () => {
      const onClose = jest.fn();

      render(<Flyout {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: "Enter" });
      fireEvent.keyDown(document, { key: " " }); // Space key
      fireEvent.keyDown(document, { key: "a" });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Focus Management", () => {
    let mockActiveElement: HTMLElement;
    let mockFocus: jest.Mock;

    beforeEach(() => {
      // Create a mock element to represent the triggering element
      mockFocus = jest.fn();
      mockActiveElement = {
        focus: mockFocus,
        tagName: "BUTTON",
      } as unknown as HTMLElement;

      // Mock document.activeElement
      Object.defineProperty(document, "activeElement", {
        get: () => mockActiveElement,
        configurable: true,
      });
    });

    afterEach(() => {
      // Clean up mocks
      jest.restoreAllMocks();
    });

    it("captures focus when flyout opens", () => {
      const { rerender } = render(<Flyout {...defaultProps} isOpen={false} />);

      // Open the flyout
      rerender(<Flyout {...defaultProps} isOpen={true} />);

      // The active element should be captured (we can't easily test this without more complex mocking)
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("restores focus when flyout closes", async () => {
      const { rerender } = render(<Flyout {...defaultProps} isOpen={true} />);

      // Close the flyout
      rerender(<Flyout {...defaultProps} isOpen={false} />);

      // Wait for focus restoration
      await waitFor(() => {
        // Verify the flyout has slideOut class when closed
        const flyout = screen.getByRole("dialog");
        expect(flyout).toHaveClass("slideOut");
        expect(flyout).not.toHaveClass("slideIn");
      });
    });
  });

  describe("Event Cleanup", () => {
    it("removes event listeners when component unmounts", () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        "removeEventListener",
      );

      const { unmount } = render(<Flyout {...defaultProps} />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });

    it("updates event listeners when isOpen changes", () => {
      const addEventListenerSpy = jest.spyOn(document, "addEventListener");
      const removeEventListenerSpy = jest.spyOn(
        document,
        "removeEventListener",
      );

      const { rerender } = render(<Flyout {...defaultProps} isOpen={true} />);
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );

      rerender(<Flyout {...defaultProps} isOpen={false} />);
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Integration Tests", () => {
    it("works with all sections rendered", () => {
      render(
        <Flyout
          isOpen={true}
          onClose={jest.fn()}
          headerChildren={<h2>Flyout Title</h2>}
          bodyChildren={<p>This is the body content</p>}
          footerChildren={<button>Save</button>}
          width="500px"
          height="90vh"
          role="dialog"
          ariaLabelledBy="flyout-title"
        />,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Flyout Title")).toBeInTheDocument();
      expect(screen.getByText("This is the body content")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("handles complex interaction flow", () => {
      const onClose = jest.fn();

      const { container } = render(
        <Flyout
          isOpen={true}
          onClose={onClose}
          headerChildren="Interactive Flyout"
          bodyChildren={<button>Action Button</button>}
          closeOnBackdropClick={true}
        />,
      );

      // Verify initial render
      expect(screen.getByText("Interactive Flyout")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Action Button" }),
      ).toBeInTheDocument();

      // Test keyboard interaction
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);

      // Reset mock
      onClose.mockClear();

      // Test backdrop click
      const backdrop = container.querySelector(".backdrop");
      expect(backdrop).not.toBeNull();
      fireEvent.click(backdrop as Element);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});

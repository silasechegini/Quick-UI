import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../Button";
import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  ICON_POSITIONS,
  ButtonProps,
} from "../Button.types";

// Mock the Icon component
vi.mock("@components/Icon", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid={`icon-${name}`} data-size={size}>
      {name}
    </span>
  ),
}));

// Mock ButtonBase since Button is a wrapper
vi.mock("../ButtonBase", () => ({
  default: ({
    children,
    size,
    isLoading,
    fullWidth,
    ...props
  }: ButtonProps) => (
    <button
      data-testid="button-base"
      className={`
        ${size === "s" ? "size-s" : ""}
        ${size === "m" ? "size-m" : ""}
        ${size === "l" ? "size-l" : ""}
        ${size === "xs" ? "size-xs" : ""}
        ${size === "xl" ? "size-xl" : ""}
        ${size === "xxl" ? "size-xxl" : ""}
        ${fullWidth ? "full-width" : ""}
        ${isLoading ? "loading" : ""}
      `.trim()}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {children}
    </button>
  ),
}));

describe("Button Component", () => {
  const defaultProps = {
    children: "Click me",
  };

  describe("Basic Rendering", () => {
    it("should render with default props", () => {
      render(<Button {...defaultProps} />);
      expect(screen.getByTestId("button-base")).toBeInTheDocument();
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("should render children content", () => {
      render(<Button>Custom Button Text</Button>);
      expect(screen.getByText("Custom Button Text")).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      render(<Button {...defaultProps} className="custom-class" />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveClass("custom-class");
    });

    it("should render as different HTML elements using 'as' prop", () => {
      const { rerender } = render(<Button as="a">Link Button</Button>);
      expect(screen.getByText("Link Button")).toBeInTheDocument();

      rerender(<Button as="div">Div Button</Button>);
      expect(screen.getByText("Div Button")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should render with primary variant by default", () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("variant", BUTTON_VARIANTS.PRIMARY);
    });

    it("should render with secondary variant", () => {
      render(<Button {...defaultProps} variant={BUTTON_VARIANTS.SECONDARY} />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("variant", BUTTON_VARIANTS.SECONDARY);
    });

    it("should render with tertiary variant", () => {
      render(<Button {...defaultProps} variant={BUTTON_VARIANTS.TERTIARY} />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("variant", BUTTON_VARIANTS.TERTIARY);
    });

    it("should render with plain variant", () => {
      render(<Button {...defaultProps} variant={BUTTON_VARIANTS.PLAIN} />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("variant", BUTTON_VARIANTS.PLAIN);
    });
  });

  describe("Sizes", () => {
    it("should render with different sizes", () => {
      const { rerender } = render(
        <Button {...defaultProps} size={BUTTON_SIZES.SMALL} />,
      );
      expect(screen.getByTestId("button-base")).toHaveClass("size-s");

      rerender(<Button {...defaultProps} size={BUTTON_SIZES.MEDIUM} />);
      expect(screen.getByTestId("button-base")).toHaveClass("size-m");

      rerender(<Button {...defaultProps} size={BUTTON_SIZES.LARGE} />);
      expect(screen.getByTestId("button-base")).toHaveClass("size-l");
    });

    it("should render with extra large and extra small sizes", () => {
      const { rerender } = render(
        <Button {...defaultProps} size={BUTTON_SIZES.EXTRASMALL} />,
      );
      expect(screen.getByTestId("button-base")).toHaveClass("size-xs");

      rerender(<Button {...defaultProps} size={BUTTON_SIZES.XLARGE} />);
      expect(screen.getByTestId("button-base")).toHaveClass("size-xl");

      rerender(<Button {...defaultProps} size={BUTTON_SIZES.XXLARGE} />);
      expect(screen.getByTestId("button-base")).toHaveClass("size-xxl");
    });
  });

  describe("Icon Functionality", () => {
    const testIcon = <span data-testid="test-icon">🔥</span>;

    it("should render with icon at default position", () => {
      render(<Button {...defaultProps} icon={testIcon} />);
      expect(screen.getByTestId("button-base")).toHaveAttribute("icon");
      expect(screen.getByTestId("button-base")).toHaveAttribute(
        "iconPosition",
        ICON_POSITIONS.START,
      );
    });

    it("should render with icon at start position", () => {
      render(
        <Button
          {...defaultProps}
          icon={testIcon}
          iconPosition={ICON_POSITIONS.START}
        />,
      );
      expect(screen.getByTestId("button-base")).toHaveAttribute(
        "iconPosition",
        ICON_POSITIONS.START,
      );
    });

    it("should render with icon at end position", () => {
      render(
        <Button
          {...defaultProps}
          icon={testIcon}
          iconPosition={ICON_POSITIONS.END}
        />,
      );
      expect(screen.getByTestId("button-base")).toHaveAttribute(
        "iconPosition",
        ICON_POSITIONS.END,
      );
    });

    it("should render icon-only button with default aria-label", () => {
      render(<Button icon={testIcon} />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("ariaLabel", "Button");
    });

    it("should render icon-only button with custom aria-label", () => {
      render(<Button icon={testIcon} ariaLabel="Custom icon button" />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("ariaLabel", "Custom icon button");
    });

    it("should not override aria-label when button has children", () => {
      render(
        <Button {...defaultProps} icon={testIcon} ariaLabel="Custom label" />,
      );
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("ariaLabel", "Custom label");
    });
  });

  describe("States and Behaviors", () => {
    it("should handle click events", () => {
      const handleClick = vi.fn();
      render(<Button {...defaultProps} onClick={handleClick} />);

      fireEvent.click(screen.getByTestId("button-base"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should render disabled button", () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("disabled");
    });

    it("should render loading button", () => {
      render(<Button {...defaultProps} isLoading />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("disabled"); // loading buttons are disabled
    });

    it("should render full width button", () => {
      render(<Button {...defaultProps} fullWidth />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveClass("full-width");
    });

    it("should support different button types", () => {
      const { rerender } = render(<Button {...defaultProps} type="submit" />);
      expect(screen.getByTestId("button-base")).toHaveAttribute(
        "type",
        "submit",
      );

      rerender(<Button {...defaultProps} type="reset" />);
      expect(screen.getByTestId("button-base")).toHaveAttribute(
        "type",
        "reset",
      );

      rerender(<Button {...defaultProps} type="button" />);
      expect(screen.getByTestId("button-base")).toHaveAttribute(
        "type",
        "button",
      );
    });
  });

  describe("Style Overrides", () => {
    it("should apply style overrides", () => {
      const styleOverride = {
        className: "custom-override",
        style: { backgroundColor: "red" },
      };

      render(<Button {...defaultProps} styleOverride={styleOverride} />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("styleOverride");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes for icon-only buttons", () => {
      const testIcon = <span>📧</span>;
      render(<Button icon={testIcon} ariaLabel="Send email" />);

      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("ariaLabel", "Send email");
    });

    it("should be focusable by default", () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByTestId("button-base");

      button.focus();
      expect(button).toHaveFocus();
    });

    it("should not be focusable when disabled", () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByTestId("button-base");
      expect(button).toHaveAttribute("disabled");
    });

    describe("Development warnings", () => {
      const originalEnv = process.env.NODE_ENV;
      let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

      beforeEach(() => {
        consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      });

      afterEach(() => {
        consoleWarnSpy.mockRestore();
        process.env.NODE_ENV = originalEnv;
      });

      it("should warn when icon-only button lacks ariaLabel in development", () => {
        process.env.NODE_ENV = "development";
        const testIcon = <span>🔔</span>;

        render(<Button icon={testIcon} />);

        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            'Button: Icon-only buttons should have an "ariaLabel" prop for accessibility',
          ),
        );
      });

      it("should not warn when icon-only button has ariaLabel", () => {
        process.env.NODE_ENV = "development";
        const testIcon = <span>🔔</span>;

        render(<Button icon={testIcon} ariaLabel="Notifications" />);

        expect(consoleWarnSpy).not.toHaveBeenCalled();
      });

      it("should not warn when button has children (not icon-only)", () => {
        process.env.NODE_ENV = "development";
        const testIcon = <span>🔔</span>;

        render(
          <Button icon={testIcon} iconPosition={ICON_POSITIONS.START}>
            Notifications
          </Button>,
        );

        expect(consoleWarnSpy).not.toHaveBeenCalled();
      });

      it("should not warn in production mode even without ariaLabel", () => {
        process.env.NODE_ENV = "production";
        const testIcon = <span>🔔</span>;

        render(<Button icon={testIcon} />);

        expect(consoleWarnSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe("Event Handling", () => {
    it("should handle mouse events", () => {
      const handleMouseOver = vi.fn();
      const handleMouseOut = vi.fn();

      render(
        <Button
          {...defaultProps}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />,
      );

      const button = screen.getByTestId("button-base");

      fireEvent.mouseOver(button);
      expect(handleMouseOver).toHaveBeenCalledTimes(1);

      fireEvent.mouseOut(button);
      expect(handleMouseOut).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events", () => {
      const handleKeyDown = vi.fn();

      render(<Button {...defaultProps} onKeyDown={handleKeyDown} />);
      const button = screen.getByTestId("button-base");

      fireEvent.keyDown(button, { key: "Enter" });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it("should handle focus events", () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();

      render(
        <Button {...defaultProps} onFocus={handleFocus} onBlur={handleBlur} />,
      );

      const button = screen.getByTestId("button-base");

      fireEvent.focus(button);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      fireEvent.blur(button);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty children gracefully", () => {
      render(<Button>{""}</Button>);
      expect(screen.getByTestId("button-base")).toBeInTheDocument();
    });

    it("should handle null icon", () => {
      render(<Button {...defaultProps} icon={null} />);
      expect(screen.getByTestId("button-base")).toBeInTheDocument();
    });

    it("should handle undefined props", () => {
      render(<Button {...defaultProps} variant={undefined} size={undefined} />);
      expect(screen.getByTestId("button-base")).toBeInTheDocument();
    });
  });
});

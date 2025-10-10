import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ButtonBase from "../ButtonBase";
import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_SHAPES,
  ICON_POSITIONS,
} from "../Button.types";
import styles from "../styles.module.scss";

// Mock the Icon component
vi.mock("@components/Icon", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid={`icon-${name}`} data-size={size}>
      {name}
    </span>
  ),
}));

describe("ButtonBase Component", () => {
  const defaultProps = {
    children: "Button Text",
  };

  describe("Basic Rendering", () => {
    it("should render with default props", () => {
      render(<ButtonBase {...defaultProps} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Button Text")).toBeInTheDocument();
    });

    it("should render children content", () => {
      render(<ButtonBase>Custom Content</ButtonBase>);
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("should render without children (icon only)", () => {
      const testIcon = <span data-testid="test-icon">🔥</span>;
      render(<ButtonBase icon={testIcon} ariaLabel="Fire button" />);

      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Fire button",
      );
    });

    it("should apply custom className", () => {
      render(<ButtonBase {...defaultProps} className="custom-class" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("should render with primary variant by default", () => {
      render(<ButtonBase {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.primary);
    });

    it("should render with secondary variant", () => {
      render(
        <ButtonBase {...defaultProps} variant={BUTTON_VARIANTS.SECONDARY} />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.secondary);
    });

    it("should render with tertiary variant", () => {
      render(
        <ButtonBase {...defaultProps} variant={BUTTON_VARIANTS.TERTIARY} />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.tertiary);
    });

    it("should render with plain variant", () => {
      render(<ButtonBase {...defaultProps} variant={BUTTON_VARIANTS.PLAIN} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.plain);
    });
  });

  describe("Sizes", () => {
    it("should render with medium size by default", () => {
      render(<ButtonBase {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.m);
    });

    it("should render with small size", () => {
      render(<ButtonBase {...defaultProps} size={BUTTON_SIZES.SMALL} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.s);
    });

    it("should render with large size", () => {
      render(<ButtonBase {...defaultProps} size={BUTTON_SIZES.LARGE} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.l);
    });

    it("should render with extra small size", () => {
      render(<ButtonBase {...defaultProps} size={BUTTON_SIZES.EXTRASMALL} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.xs);
    });

    it("should render with extra large sizes", () => {
      const { rerender } = render(
        <ButtonBase {...defaultProps} size={BUTTON_SIZES.XLARGE} />,
      );
      expect(screen.getByRole("button")).toHaveClass(styles.xl);

      rerender(<ButtonBase {...defaultProps} size={BUTTON_SIZES.XXLARGE} />);
      expect(screen.getByRole("button")).toHaveClass(styles.xxl);
    });
  });

  describe("Shapes", () => {
    it("should render with square shape by default", () => {
      render(<ButtonBase {...defaultProps} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.square);
    });

    it("should render with circular shape", () => {
      render(<ButtonBase {...defaultProps} shape={BUTTON_SHAPES.CIRCULAR} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.circular);
    });

    it("should render with pill shape", () => {
      render(<ButtonBase {...defaultProps} shape={BUTTON_SHAPES.PILL} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.pill);
    });
  });

  describe("Icon Functionality", () => {
    const testIcon = <span data-testid="test-icon">🔥</span>;

    it("should render icon at start position", () => {
      render(
        <ButtonBase
          {...defaultProps}
          icon={testIcon}
          iconPosition={ICON_POSITIONS.START}
        />,
      );

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      const iconSpan = screen.getByTestId("test-icon").parentElement;
      expect(iconSpan).toHaveClass(styles.icon, styles.iconStart);
    });

    it("should render icon at end position", () => {
      render(
        <ButtonBase
          {...defaultProps}
          icon={testIcon}
          iconPosition={ICON_POSITIONS.END}
        />,
      );

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      const iconSpan = screen.getByTestId("test-icon").parentElement;
      expect(iconSpan).toHaveClass(styles.icon, styles.iconEnd);
    });

    it("should render icon-only button", () => {
      render(<ButtonBase icon={testIcon} ariaLabel="Icon only" />);

      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-label",
        "Icon only",
      );
    });

    it("should not render icon when loading", () => {
      render(<ButtonBase {...defaultProps} icon={testIcon} isLoading={true} />);

      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
      expect(screen.getByTestId("icon-loading_icon")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("should render loading icon when loading", () => {
      render(<ButtonBase {...defaultProps} isLoading={true} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.loading);
      expect(screen.getByTestId("icon-loading_icon")).toBeInTheDocument();
    });

    it("should be disabled when loading", () => {
      render(<ButtonBase {...defaultProps} isLoading={true} />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should hide regular icon when loading", () => {
      const testIcon = <span data-testid="test-icon">🔥</span>;
      render(<ButtonBase {...defaultProps} icon={testIcon} isLoading={true} />);

      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
      expect(screen.getByTestId("icon-loading_icon")).toBeInTheDocument();
    });
  });

  describe("Full Width", () => {
    it("should apply full width class", () => {
      render(<ButtonBase {...defaultProps} fullWidth={true} />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.fullWidth);
    });

    it("should not apply size class when full width", () => {
      render(
        <ButtonBase
          {...defaultProps}
          fullWidth={true}
          size={BUTTON_SIZES.LARGE}
        />,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(styles.fullWidth);
      expect(button).not.toHaveClass(styles.l);
    });
  });

  describe("Style Overrides", () => {
    it("should apply style override className", () => {
      const styleOverride = { className: "override-class" };
      render(<ButtonBase {...defaultProps} styleOverride={styleOverride} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("override-class");
    });

    it("should apply style override inline styles", () => {
      const styleOverride = {
        style: { backgroundColor: "red", color: "white" },
      };
      render(<ButtonBase {...defaultProps} styleOverride={styleOverride} />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle("background-color: rgb(255, 0, 0)");
      expect(button).toHaveStyle("color: rgb(255, 255, 255)");
    });

    it("should apply both className and style overrides", () => {
      const styleOverride = {
        className: "override-class",
        style: { backgroundColor: "blue" },
      };
      render(<ButtonBase {...defaultProps} styleOverride={styleOverride} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("override-class");
      expect(button).toHaveStyle("background-color: rgb(0, 0, 255)");
    });
  });

  describe("HTML Element Rendering", () => {
    it("should render as button by default", () => {
      render(<ButtonBase {...defaultProps} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render as different elements using 'as' prop", () => {
      const { rerender } = render(<ButtonBase {...defaultProps} as="a" />);
      expect(screen.getByText("Button Text")).toBeInTheDocument();

      rerender(<ButtonBase {...defaultProps} as="div" />);
      expect(screen.getByText("Button Text")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("should render disabled button", () => {
      render(<ButtonBase {...defaultProps} disabled={true} />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should be disabled when loading even if disabled prop is false", () => {
      render(
        <ButtonBase {...defaultProps} disabled={false} isLoading={true} />,
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Event Handling", () => {
    it("should handle click events", () => {
      const handleClick = vi.fn();
      render(<ButtonBase {...defaultProps} onClick={handleClick} />);

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not handle click when disabled", () => {
      const handleClick = vi.fn();
      render(
        <ButtonBase {...defaultProps} onClick={handleClick} disabled={true} />,
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should handle keyboard events", () => {
      const handleKeyDown = vi.fn();
      render(<ButtonBase {...defaultProps} onKeyDown={handleKeyDown} />);

      fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it("should handle focus events", () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();

      render(
        <ButtonBase
          {...defaultProps}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />,
      );

      const button = screen.getByRole("button");

      fireEvent.focus(button);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      fireEvent.blur(button);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should apply aria-label for icon-only buttons", () => {
      const testIcon = <span data-testid="test-icon">🔥</span>;
      render(<ButtonBase icon={testIcon} ariaLabel="Fire action" />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Fire action");
    });

    it("should not apply aria-label when button has children", () => {
      const testIcon = <span data-testid="test-icon">🔥</span>;
      render(
        <ButtonBase icon={testIcon} ariaLabel="Fire action">
          Button Text
        </ButtonBase>,
      );

      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("aria-label");
    });

    it("should be focusable by default", () => {
      render(<ButtonBase {...defaultProps} />);
      const button = screen.getByRole("button");

      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe("Edge Cases", () => {
    it("should handle null icon gracefully", () => {
      render(<ButtonBase {...defaultProps} icon={null} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Button Text")).toBeInTheDocument();
    });

    it("should handle undefined props gracefully", () => {
      render(
        <ButtonBase {...defaultProps} variant={undefined} size={undefined} />,
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render with all props combined", () => {
      const testIcon = <span data-testid="complex-icon">⚡</span>;
      const styleOverride = { className: "complex-class" };

      render(
        <ButtonBase
          variant={BUTTON_VARIANTS.SECONDARY}
          size={BUTTON_SIZES.LARGE}
          shape={BUTTON_SHAPES.PILL}
          icon={testIcon}
          iconPosition={ICON_POSITIONS.END}
          fullWidth={false}
          isLoading={false}
          disabled={false}
          className="base-class"
          styleOverride={styleOverride}
          ariaLabel="Complex button"
        >
          Complex Button
        </ButtonBase>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(styles.secondary, styles.l, styles.pill);
      expect(button).toHaveClass("base-class", "complex-class");
      expect(screen.getByText("Complex Button")).toBeInTheDocument();
      expect(screen.getByTestId("complex-icon")).toBeInTheDocument();
    });
  });
});

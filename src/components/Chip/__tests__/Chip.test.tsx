import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Chip from "../Chip";
import { CHIP_SIZES, CHIP_VARIANTS, CHIP_STATUSES } from "../Chip.types";
import styles from "../styles.module.scss";
import { ButtonProps } from "@components/Button";
import { ICONS } from "@assets/iconType";

// Mock the Icon component since it's imported
vi.mock("@components/Icon", () => ({
  Icon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid={`icon-${name}`} data-size={size}>
      {name}
    </span>
  ),
}));

// Mock the Button component
vi.mock("@components/Button", () => ({
  Button: ({
    onClick,
    children,
    disabled,
    icon,
    onMouseDown,
    "aria-label": ariaLabel,
    ...props
  }: ButtonProps) => (
    <button
      onClick={onClick}
      onMouseDown={(e) => {
        if (onMouseDown) {
          onMouseDown(e);
        }
      }}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid="chip-remove-button"
      {...props}
    >
      {icon}
      {children}
    </button>
  ),
  BUTTON_VARIANTS: {
    PLAIN: "plain",
  },
  BUTTON_SIZES: {
    EXTRASMALL: "xs",
  },
}));

describe("Chip Component", () => {
  const defaultProps = {
    text: "Test Chip",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render with default props", () => {
      render(<Chip {...defaultProps} />);
      expect(screen.getByText("Test Chip")).toBeInTheDocument();
    });

    it("should render with custom text", () => {
      render(<Chip text="Custom Chip Text" />);
      expect(screen.getByText("Custom Chip Text")).toBeInTheDocument();
    });

    it("should render children instead of text when provided", () => {
      render(
        <Chip text="Should not show">
          <span>Custom Children</span>
        </Chip>,
      );
      expect(screen.getByText("Custom Children")).toBeInTheDocument();
      expect(screen.queryByText("Should not show")).not.toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Chip {...defaultProps} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should apply custom styles", () => {
      const customStyle = { backgroundColor: "red", color: "white" };
      const { container } = render(
        <Chip {...defaultProps} style={customStyle} />,
      );
      expect(container.firstChild).toHaveStyle(
        "background-color: rgb(255, 0, 0)",
      );
      expect(container.firstChild).toHaveStyle("color: rgb(255, 255, 255)");
    });
  });

  describe("Size Variants", () => {
    it("should render with small size", () => {
      const { container } = render(
        <Chip {...defaultProps} size={CHIP_SIZES.SMALL} />,
      );
      expect(container.firstChild).toHaveClass(styles.small);
    });

    it("should render with medium size (default)", () => {
      const { container } = render(
        <Chip {...defaultProps} size={CHIP_SIZES.MEDIUM} />,
      );
      expect(container.firstChild).toHaveClass(styles.medium);
    });

    it("should render with large size", () => {
      const { container } = render(
        <Chip {...defaultProps} size={CHIP_SIZES.LARGE} />,
      );
      expect(container.firstChild).toHaveClass(styles.large);
    });

    it("should default to medium size when no size provided", () => {
      const { container } = render(<Chip {...defaultProps} />);
      expect(container.firstChild).toHaveClass(styles.medium);
    });
  });

  describe("Variants", () => {
    it("should render with solid variant", () => {
      const { container } = render(
        <Chip {...defaultProps} variant={CHIP_VARIANTS.SOLID} />,
      );
      expect(container.firstChild).toHaveClass(styles.solid);
    });

    it("should render with outline variant", () => {
      const { container } = render(
        <Chip {...defaultProps} variant={CHIP_VARIANTS.OUTLINE} />,
      );
      expect(container.firstChild).toHaveClass(styles.outline);
    });

    it("should render with ghost variant (default)", () => {
      const { container } = render(
        <Chip {...defaultProps} variant={CHIP_VARIANTS.GHOST} />,
      );
      expect(container.firstChild).toHaveClass(styles.ghost);
    });

    it("should default to ghost variant when no variant provided", () => {
      const { container } = render(<Chip {...defaultProps} />);
      expect(container.firstChild).toHaveClass(styles.ghost);
    });
  });

  describe("Status", () => {
    it("should render with info status", () => {
      const { container } = render(
        <Chip {...defaultProps} status={CHIP_STATUSES.INFO} />,
      );
      const statusElement = container.querySelector(
        `.${styles.statusContainer}`,
      );
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass(styles.info);
    });

    it("should render with success status", () => {
      const { container } = render(
        <Chip {...defaultProps} status={CHIP_STATUSES.SUCCESS} />,
      );
      const statusElement = container.querySelector(
        `.${styles.statusContainer}`,
      );
      expect(statusElement).toHaveClass(styles.success);
    });

    it("should render with warning status", () => {
      const { container } = render(
        <Chip {...defaultProps} status={CHIP_STATUSES.WARNING} />,
      );
      const statusElement = container.querySelector(
        `.${styles.statusContainer}`,
      );
      expect(statusElement).toHaveClass(styles.warning);
    });

    it("should render with error status", () => {
      const { container } = render(
        <Chip {...defaultProps} status={CHIP_STATUSES.ERROR} />,
      );
      const statusElement = container.querySelector(
        `.${styles.statusContainer}`,
      );
      expect(statusElement).toHaveClass(styles.error);
    });

    it("should render with custom status object", () => {
      const customStatus = { class: "custom-status-class" };
      const { container } = render(
        <Chip {...defaultProps} status={customStatus} />,
      );
      const statusElement = container.querySelector(
        `.${styles.statusContainer}`,
      );
      expect(statusElement).toHaveClass("custom-status-class");
    });

    it("should not render status when not provided", () => {
      const { container } = render(<Chip {...defaultProps} />);
      const statusElement = container.querySelector(
        `.${styles.statusContainer}`,
      );
      expect(statusElement).not.toBeInTheDocument();
    });
  });

  describe("Interactive Functionality", () => {
    it("should render remove button when interactive is true", () => {
      render(<Chip {...defaultProps} interactive={true} />);
      expect(screen.getByTestId("chip-remove-button")).toBeInTheDocument();
      expect(
        screen.getByTestId(`icon-${ICONS.CLEAR_ICON}`),
      ).toBeInTheDocument();
    });

    it("should not render remove button when interactive is false", () => {
      render(<Chip {...defaultProps} interactive={false} />);
      expect(
        screen.queryByTestId("chip-remove-button"),
      ).not.toBeInTheDocument();
    });

    it("should not render remove button when disabled", () => {
      render(<Chip {...defaultProps} interactive={true} disabled={true} />);
      expect(
        screen.queryByTestId("chip-remove-button"),
      ).not.toBeInTheDocument();
    });

    it("should call onRemove when remove button is clicked", () => {
      const onRemoveMock = vi.fn();
      render(
        <Chip {...defaultProps} interactive={true} onRemove={onRemoveMock} />,
      );

      fireEvent.click(screen.getByTestId("chip-remove-button"));
      expect(onRemoveMock).toHaveBeenCalledTimes(1);
    });

    it("should have correct tabIndex when interactive", () => {
      const { container } = render(
        <Chip {...defaultProps} interactive={true} />,
      );
      expect(container.firstChild).toHaveAttribute("tabIndex", "0");
    });

    it("should have tabIndex -1 when not interactive", () => {
      const { container } = render(
        <Chip {...defaultProps} interactive={false} />,
      );
      expect(container.firstChild).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Disabled State", () => {
    it("should apply disabled class when disabled", () => {
      const { container } = render(<Chip {...defaultProps} disabled={true} />);
      expect(container.firstChild).toHaveClass(styles.disabled);
    });

    it("should set aria-disabled when disabled", () => {
      const { container } = render(<Chip {...defaultProps} disabled={true} />);
      expect(container.firstChild).toHaveAttribute("aria-disabled", "true");
    });

    it("should not render remove button when disabled and interactive", () => {
      render(<Chip {...defaultProps} disabled={true} interactive={true} />);
      expect(
        screen.queryByTestId("chip-remove-button"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("should render leading icon when provided", () => {
      const leadingIcon = <span data-testid="leading-icon">Leading</span>;
      render(<Chip {...defaultProps} leadingIcon={leadingIcon} />);
      expect(screen.getByTestId("leading-icon")).toBeInTheDocument();
    });

    it("should render trailing icon when provided", () => {
      const trailingIcon = <span data-testid="trailing-icon">Trailing</span>;
      render(<Chip {...defaultProps} trailingIcon={trailingIcon} />);
      expect(screen.getByTestId("trailing-icon")).toBeInTheDocument();
    });

    it("should apply icon classes when icons are present", () => {
      const { container } = render(
        <Chip {...defaultProps} leadingIcon={<span>Icon</span>} />,
      );
      expect(container.firstChild).toHaveClass(styles.chip_with_icon);
    });

    it("should use correct icon size based on chip size", () => {
      render(
        <Chip {...defaultProps} interactive={true} size={CHIP_SIZES.SMALL} />,
      );
      expect(screen.getByTestId("icon-clear_icon")).toHaveAttribute(
        "data-size",
        "16",
      );
    });

    it("should use medium icon size for medium chip", () => {
      render(
        <Chip {...defaultProps} interactive={true} size={CHIP_SIZES.MEDIUM} />,
      );
      expect(screen.getByTestId("icon-clear_icon")).toHaveAttribute(
        "data-size",
        "20",
      );
    });

    it("should use large icon size for large chip", () => {
      render(
        <Chip {...defaultProps} interactive={true} size={CHIP_SIZES.LARGE} />,
      );
      expect(screen.getByTestId("icon-clear_icon")).toHaveAttribute(
        "data-size",
        "24",
      );
    });
  });

  describe("Accessibility", () => {
    it("should apply aria-label when provided", () => {
      const { container } = render(
        <Chip {...defaultProps} ariaLabel="Custom aria label" />,
      );
      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "Custom aria label",
      );
    });

    it("should have proper aria-label on remove button", () => {
      render(<Chip {...defaultProps} interactive={true} />);
      expect(screen.getByTestId("chip-remove-button")).toHaveAttribute(
        "aria-label",
        "delete chip",
      );
    });
  });

  describe("CSS Classes", () => {
    it("should apply interactive classes when interactive and not disabled", () => {
      const { container } = render(
        <Chip {...defaultProps} interactive={true} disabled={false} />,
      );
      expect(container.firstChild).toHaveClass(styles.chip_with_button);
    });

    it("should not apply interactive classes when disabled", () => {
      const { container } = render(
        <Chip {...defaultProps} interactive={true} disabled={true} />,
      );
      expect(container.firstChild).not.toHaveClass("chip_with_button");
    });

    it("should always include base classes", () => {
      const { container } = render(<Chip {...defaultProps} />);
      expect(container.firstChild).toHaveClass(styles.chipContainer);
      expect(container.firstChild).toHaveClass(styles.chip);
    });
  });
});

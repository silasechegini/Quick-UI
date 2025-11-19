import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import IconAvatar from "../IconAvatar";
import { AVATAR_VARIANTS } from "../../Avatar.types";
import styles from "../../styles.module.scss";
import { combineClasses } from "../../../../utils";

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

describe("IconAvatar Renderer", () => {
  const TestIcon = () => <span data-testid="test-icon">👤</span>;

  const defaultProps = {
    variant: AVATAR_VARIANTS.ICON as const,
    icon: <TestIcon />,
    avatarClasses: combineClasses(
      styles.avatar,
      styles["size-md"],
      styles["shape-circle"],
      styles["variant-icon"],
    ),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render icon avatar with provided icon", () => {
      render(<IconAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("aria-label", "Icon avatar");

      const icon = screen.getByTestId("test-icon");
      expect(icon).toBeInTheDocument();
      expect(icon.parentElement).toHaveClass(styles.icon);
    });

    it("should render with string icon", () => {
      const props = { ...defaultProps, icon: "🚀" };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(screen.getByText("🚀")).toBeInTheDocument();
    });

    it("should render with React element icon", () => {
      const CustomIcon = () => (
        <svg data-testid="custom-svg" width="24" height="24">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
      const props = { ...defaultProps, icon: <CustomIcon /> };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(screen.getByTestId("custom-svg")).toBeInTheDocument();
    });

    it("should use custom ariaLabel when provided", () => {
      const props = { ...defaultProps, ariaLabel: "User profile icon" };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByLabelText("User profile icon");
      expect(avatar).toBeInTheDocument();
    });

    it("should handle null icon gracefully", () => {
      const props = { ...defaultProps, icon: null };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
    });

    it("should handle undefined icon gracefully", () => {
      const props = { ...defaultProps, icon: undefined };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Color Customization", () => {
    it("should apply default background color", () => {
      render(<IconAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("background-color: var(--gray-200)");
    });

    it("should apply default icon color", () => {
      render(<IconAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("color: var(--gray-600)");
    });

    it("should apply custom background color", () => {
      const props = { ...defaultProps, backgroundColor: "#FF0000" };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("background-color: #FF0000");
    });

    it("should apply custom icon color", () => {
      const props = { ...defaultProps, iconColor: "#00FF00" };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("color: #00FF00");
    });

    it("should apply both custom background and icon colors", () => {
      const props = {
        ...defaultProps,
        backgroundColor: "#FF0000",
        iconColor: "#FFFFFF",
      };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("background-color: #FF0000");
      expect(avatar).toHaveStyle("color: #FFFFFF");
    });
  });

  describe("Style and Class Handling", () => {
    it("should apply provided avatar classes", () => {
      const customClasses = "custom-class another-class";
      const props = { ...defaultProps, avatarClasses: customClasses };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("custom-class", "another-class");
    });

    it("should merge custom styles with generated styles", () => {
      const customStyle = {
        border: "2px solid red",
        padding: "10px",
      };
      const props = {
        ...defaultProps,
        style: customStyle,
        backgroundColor: "#0000FF",
      };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute(
        "style",
        expect.stringContaining("border: 2px solid red"),
      );
      expect(avatar).toHaveAttribute(
        "style",
        expect.stringContaining("padding: 10px"),
      );
      expect(avatar).toHaveAttribute(
        "style",
        expect.stringContaining("background-color: rgb(0, 0, 255)"),
      );
    });

    it("should allow custom style properties to override generated ones", () => {
      const customStyle = {
        border: "1px solid blue",
        margin: "5px",
      };
      const props = {
        ...defaultProps,
        style: customStyle,
      };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      // Custom style should be applied
      expect(avatar).toHaveAttribute(
        "style",
        expect.stringContaining("border: 1px solid blue"),
      );
      expect(avatar).toHaveAttribute(
        "style",
        expect.stringContaining("margin: 5px"),
      );
    });

    it("should apply icon wrapper styles", () => {
      render(<IconAvatar {...defaultProps} />);

      const iconWrapper = screen.getByTestId("test-icon").parentElement;
      expect(iconWrapper).toHaveClass(styles.icon);
    });
  });

  describe("Icon Content Handling", () => {
    it("should render FontAwesome-style icon classes", () => {
      const props = {
        ...defaultProps,
        icon: <i className="fas fa-user" data-testid="fa-icon" />,
      };
      render(<IconAvatar {...props} />);

      const icon = screen.getByTestId("fa-icon");
      expect(icon).toHaveClass("fas", "fa-user");
    });

    it("should render Material-UI icons", () => {
      const MaterialIcon = () => (
        <span className="material-icons" data-testid="material-icon">
          person
        </span>
      );
      const props = { ...defaultProps, icon: <MaterialIcon /> };
      render(<IconAvatar {...props} />);

      const icon = screen.getByTestId("material-icon");
      expect(icon).toHaveClass("material-icons");
      expect(icon).toHaveTextContent("person");
    });

    it("should render complex nested icon structures", () => {
      const ComplexIcon = () => (
        <div data-testid="complex-icon">
          <span>Nested</span>
          <span>Icon</span>
        </div>
      );
      const props = { ...defaultProps, icon: <ComplexIcon /> };
      render(<IconAvatar {...props} />);

      const icon = screen.getByTestId("complex-icon");
      expect(icon).toBeInTheDocument();
      expect(screen.getByText("Nested")).toBeInTheDocument();
      expect(screen.getByText("Icon")).toBeInTheDocument();
    });
  });

  describe("Props Forwarding", () => {
    it("should forward additional HTML attributes", () => {
      const props = {
        ...defaultProps,
        "data-testid": "custom-icon-avatar",
        title: "Hover tooltip",
        onClick: vi.fn(),
      };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByTestId("custom-icon-avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("title", "Hover tooltip");
    });

    it("should handle click events", () => {
      const onClick = vi.fn();
      const props = { ...defaultProps, onClick };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      avatar.click();

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events", () => {
      const onKeyDown = vi.fn();
      const props = { ...defaultProps, onKeyDown, tabIndex: 0 };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("tabindex", "0");
    });
  });

  describe("Accessibility", () => {
    it("should have proper role attribute", () => {
      render(<IconAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("role", "img");
    });

    it("should use ariaLabel when provided", () => {
      const props = { ...defaultProps, ariaLabel: "Profile settings" };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByLabelText("Profile settings");
      expect(avatar).toBeInTheDocument();
    });

    it("should provide default aria-label", () => {
      render(<IconAvatar {...defaultProps} />);

      const avatar = screen.getByLabelText("Icon avatar");
      expect(avatar).toBeInTheDocument();
    });

    it("should be keyboard accessible when tabIndex is provided", () => {
      const props = { ...defaultProps, tabIndex: 0 };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("tabindex", "0");
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero value icon", () => {
      const props = { ...defaultProps, icon: 0 };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should handle boolean icon values", () => {
      const props = { ...defaultProps, icon: false };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
    });

    it("should handle empty string icon", () => {
      const props = { ...defaultProps, icon: "" };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
    });

    it("should handle array of icons (renders first element)", () => {
      const icons = [<span key="1">First</span>, <span key="2">Second</span>];
      const props = { ...defaultProps, icon: icons };
      render(<IconAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
    });
  });
});

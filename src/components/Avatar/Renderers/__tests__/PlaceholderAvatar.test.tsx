import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PlaceholderAvatar from "../PlaceholderAvatar";
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

describe("PlaceholderAvatar Renderer", () => {
  const defaultProps = {
    variant: AVATAR_VARIANTS.PLACEHOLDER as const,
    avatarClasses: combineClasses(
      styles.avatar,
      styles["size-md"],
      styles["shape-circle"],
      styles["variant-placeholder"],
    ),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render placeholder avatar", () => {
      render(<PlaceholderAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("aria-label", "Avatar placeholder");
    });

    it("should render with minimal props", () => {
      const minimalProps = {
        avatarClasses: styles.avatar,
      };
      render(<PlaceholderAvatar {...minimalProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
    });

    it("should use custom ariaLabel when provided", () => {
      const props = { ...defaultProps, ariaLabel: "Empty user avatar" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByLabelText("Empty user avatar");
      expect(avatar).toBeInTheDocument();
    });

    it("should use alt text in aria-label when provided", () => {
      const props = { ...defaultProps, alt: "Profile picture placeholder" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByLabelText("Profile picture placeholder");
      expect(avatar).toBeInTheDocument();
    });

    it("should prioritize ariaLabel over alt text", () => {
      const props = {
        ...defaultProps,
        ariaLabel: "Custom label",
        alt: "Alt text",
      };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByLabelText("Custom label");
      expect(avatar).toBeInTheDocument();
      expect(screen.queryByLabelText("Alt text")).not.toBeInTheDocument();
    });
  });

  describe("Background Customization", () => {
    it("should not apply background gradient when no backgroundColor provided", () => {
      render(<PlaceholderAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      // Should not have a linear-gradient style when no backgroundColor is provided
      const computedStyle = window.getComputedStyle(avatar);
      expect(computedStyle.background).not.toMatch(/linear-gradient/);
    });

    it("should apply background gradient when backgroundColor is provided", () => {
      const props = { ...defaultProps, backgroundColor: "#FF0000" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle(
        "background: linear-gradient(135deg, #FF0000, #FF0000dd)",
      );
    });

    it("should create gradient with opacity variant", () => {
      const props = { ...defaultProps, backgroundColor: "#3B82F6" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle(
        "background: linear-gradient(135deg, #3B82F6, #3B82F6dd)",
      );
    });

    it("should handle hex color codes", () => {
      const props = { ...defaultProps, backgroundColor: "#ABCDEF" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle(
        "background: linear-gradient(135deg, #ABCDEF, #ABCDEFdd)",
      );
    });

    it("should handle RGB color values", () => {
      const props = { ...defaultProps, backgroundColor: "rgb(255, 0, 0)" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle(
        "background: linear-gradient(135deg, rgb(255, 0, 0), rgb(255, 0, 0)dd)",
      );
    });

    it("should handle named colors", () => {
      const props = { ...defaultProps, backgroundColor: "red" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle(
        "background: linear-gradient(135deg, red, reddd)",
      );
    });
  });

  describe("Style and Class Handling", () => {
    it("should apply provided avatar classes", () => {
      const customClasses = "custom-class another-class";
      const props = { ...defaultProps, avatarClasses: customClasses };
      render(<PlaceholderAvatar {...props} />);

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
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("border: 2px solid red");
      expect(avatar).toHaveStyle("padding: 10px");
      expect(avatar).toHaveStyle(
        "background: linear-gradient(135deg, #0000FF, #0000FFdd)",
      );
    });

    it("should allow custom style properties to override generated ones", () => {
      const customStyle = {
        border: "1px solid black",
        padding: "5px",
      };
      const props = {
        ...defaultProps,
        style: customStyle,
      };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      // Custom style should be applied (but backgroundColor gradient takes precedence over background)
      expect(avatar).toHaveStyle("border: 1px solid black");
      expect(avatar).toHaveStyle("padding: 5px");
    });

    it("should handle empty style object", () => {
      const props = { ...defaultProps, style: {} };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Props Forwarding", () => {
    it("should forward additional HTML attributes", () => {
      const props = {
        ...defaultProps,
        "data-testid": "custom-placeholder-avatar",
        title: "Hover tooltip",
        onClick: vi.fn(),
      };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByTestId("custom-placeholder-avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("title", "Hover tooltip");
    });

    it("should handle click events", () => {
      const onClick = vi.fn();
      const props = { ...defaultProps, onClick };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      avatar.click();

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events", () => {
      const onKeyDown = vi.fn();
      const props = { ...defaultProps, onKeyDown, tabIndex: 0 };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("tabindex", "0");
    });

    it("should exclude backgroundColor from forwarded props", () => {
      const props = {
        ...defaultProps,
        backgroundColor: "#FF0000",
        "data-testid": "test-avatar",
      };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByTestId("test-avatar");
      expect(avatar).not.toHaveAttribute("backgroundColor");
      expect(avatar).not.toHaveAttribute("background-color", "#FF0000");
    });

    it("should forward custom data attributes", () => {
      const props = {
        ...defaultProps,
        "data-user-id": "123",
        "data-theme": "dark",
      };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("data-user-id", "123");
      expect(avatar).toHaveAttribute("data-theme", "dark");
    });
  });

  describe("Accessibility", () => {
    it("should have proper role attribute", () => {
      render(<PlaceholderAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("role", "img");
    });

    it("should use ariaLabel when provided", () => {
      const props = { ...defaultProps, ariaLabel: "Loading avatar" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByLabelText("Loading avatar");
      expect(avatar).toBeInTheDocument();
    });

    it("should fallback to alt text for aria-label", () => {
      const props = { ...defaultProps, alt: "User placeholder" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByLabelText("User placeholder");
      expect(avatar).toBeInTheDocument();
    });

    it("should provide default aria-label when neither ariaLabel nor alt provided", () => {
      render(<PlaceholderAvatar {...defaultProps} />);

      const avatar = screen.getByLabelText("Avatar placeholder");
      expect(avatar).toBeInTheDocument();
    });

    it("should be keyboard accessible when tabIndex is provided", () => {
      const props = { ...defaultProps, tabIndex: 0 };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("tabindex", "0");
    });

    it("should support focus events", () => {
      const onFocus = vi.fn();
      const props = { ...defaultProps, onFocus, tabIndex: 0 };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      avatar.focus();

      expect(onFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle null backgroundColor", () => {
      const props = { ...defaultProps, backgroundColor: undefined };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      const computedStyle = window.getComputedStyle(avatar);
      expect(computedStyle.background).not.toMatch(/linear-gradient/);
    });

    it("should handle undefined backgroundColor", () => {
      const props = { ...defaultProps, backgroundColor: undefined };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      const computedStyle = window.getComputedStyle(avatar);
      expect(computedStyle.background).not.toMatch(/linear-gradient/);
    });

    it("should handle empty string backgroundColor", () => {
      const props = { ...defaultProps, backgroundColor: "" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      const computedStyle = window.getComputedStyle(avatar);
      expect(computedStyle.background).not.toMatch(/linear-gradient/);
    });

    it("should render without any optional props", () => {
      const minimalProps = {
        avatarClasses: "minimal-avatar",
      };
      render(<PlaceholderAvatar {...minimalProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("minimal-avatar");
      expect(avatar).toHaveAttribute("aria-label", "Avatar placeholder");
    });

    it("should handle empty avatarClasses", () => {
      const props = { ...defaultProps, avatarClasses: "" };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
    });

    it("should handle complex CSS custom properties", () => {
      const props = {
        ...defaultProps,
        backgroundColor: "var(--custom-color)",
      };
      render(<PlaceholderAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle(
        "background: linear-gradient(135deg, var(--custom-color), var(--custom-color)dd)",
      );
    });
  });
});

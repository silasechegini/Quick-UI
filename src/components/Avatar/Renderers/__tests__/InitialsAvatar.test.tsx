import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import InitialsAvatar from "../InitialsAvatar";
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

describe("InitialsAvatar Renderer", () => {
  const defaultProps = {
    variant: AVATAR_VARIANTS.INITIALS as const,
    initials: "JD",
    avatarClasses: combineClasses(
      styles.avatar,
      styles["size-md"],
      styles["shape-circle"],
      styles["variant-initials"],
    ),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render initials avatar with provided initials", () => {
      render(<InitialsAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("aria-label", "Avatar with initials JD");
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should truncate initials to 2 characters", () => {
      const props = { ...defaultProps, initials: "ABCD" };
      render(<InitialsAvatar {...props} />);

      expect(screen.getByText("AB")).toBeInTheDocument();
      expect(screen.queryByText("ABCD")).not.toBeInTheDocument();
    });

    it("should convert initials to uppercase", () => {
      const props = { ...defaultProps, initials: "ab" };
      render(<InitialsAvatar {...props} />);

      expect(screen.getByText("AB")).toBeInTheDocument();
    });

    it("should handle single character initials", () => {
      const props = { ...defaultProps, initials: "A" };
      render(<InitialsAvatar {...props} />);

      expect(screen.getByText("A")).toBeInTheDocument();
    });

    it("should handle empty initials gracefully", () => {
      const props = { ...defaultProps, initials: "" };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar.textContent).toBe("");
    });

    it("should use custom ariaLabel when provided", () => {
      const props = { ...defaultProps, ariaLabel: "Custom avatar label" };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByLabelText("Custom avatar label");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Color Customization", () => {
    it("should apply custom background color", () => {
      const props = { ...defaultProps, backgroundColor: "#FF0000" };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("background-color: #FF0000");
    });

    it("should apply custom text color", () => {
      const props = { ...defaultProps, textColor: "#00FF00" };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("color: #00FF00");
    });

    it("should apply both custom background and text colors", () => {
      const props = {
        ...defaultProps,
        backgroundColor: "#FF0000",
        textColor: "#FFFFFF",
      };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("background-color: #FF0000");
      expect(avatar).toHaveStyle("color: #FFFFFF");
    });

    it("should use default white text color when not specified", () => {
      render(<InitialsAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("color: var(--color-white)");
    });

    it("should generate automatic background color when not specified", () => {
      render(<InitialsAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      const backgroundColor = window.getComputedStyle(avatar).backgroundColor;

      // Should have some background color (not empty or transparent)
      expect(backgroundColor).not.toBe("");
      expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
      expect(backgroundColor).not.toBe("transparent");
    });

    it("should generate consistent colors for same initials", () => {
      const { rerender } = render(<InitialsAvatar {...defaultProps} />);
      const firstAvatar = screen.getByRole("img");
      const firstBgColor = window.getComputedStyle(firstAvatar).backgroundColor;

      rerender(<InitialsAvatar {...defaultProps} />);
      const secondAvatar = screen.getByRole("img");
      const secondBgColor =
        window.getComputedStyle(secondAvatar).backgroundColor;

      expect(firstBgColor).toBe(secondBgColor);
    });

    it("should generate different colors for different initials", () => {
      const { rerender } = render(
        <InitialsAvatar {...defaultProps} initials="John" />,
      );
      const firstAvatar = screen.getByRole("img");
      const firstBgColor = window.getComputedStyle(firstAvatar).backgroundColor;

      rerender(<InitialsAvatar {...defaultProps} initials="Alice" />);
      const secondAvatar = screen.getByRole("img");
      const secondBgColor =
        window.getComputedStyle(secondAvatar).backgroundColor;

      expect(firstBgColor).not.toBe(secondBgColor);
    });
  });

  describe("Style and Class Handling", () => {
    it("should apply provided avatar classes", () => {
      const customClasses = "custom-class another-class";
      const props = { ...defaultProps, avatarClasses: customClasses };
      render(<InitialsAvatar {...props} />);

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
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("border: 2px solid red");
      expect(avatar).toHaveStyle("padding: 10px");
      expect(avatar).toHaveStyle("background-color: #0000FF");
    });

    it("should custom style properties override generated ones", () => {
      const customStyle = {
        border: "2px solid red",
        padding: "10px",
      };
      const props = {
        ...defaultProps,
        style: customStyle,
      };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByRole("img");
      // Custom style should be applied
      expect(avatar).toHaveStyle("border: 2px solid red");
      expect(avatar).toHaveStyle("padding: 10px");
    });
  });

  describe("Props Forwarding", () => {
    it("should forward additional HTML attributes", () => {
      const props = {
        ...defaultProps,
        "data-testid": "custom-initials-avatar",
        title: "Hover tooltip",
        onClick: vi.fn(),
      };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByTestId("custom-initials-avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("title", "Hover tooltip");
    });

    it("should handle click events", () => {
      const onClick = vi.fn();
      const props = { ...defaultProps, onClick };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByRole("img");
      avatar.click();

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should have proper role attribute", () => {
      render(<InitialsAvatar {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("role", "img");
    });

    it("should use ariaLabel when provided", () => {
      const props = {
        ...defaultProps,
        ariaLabel: "Custom accessibility label",
      };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByLabelText("Custom accessibility label");
      expect(avatar).toBeInTheDocument();
    });

    it("should generate default aria-label from initials", () => {
      const props = { ...defaultProps, initials: "XY" };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByLabelText("Avatar with initials XY");
      expect(avatar).toBeInTheDocument();
    });

    it("should be keyboard accessible", () => {
      const onKeyDown = vi.fn();
      const props = { ...defaultProps, onKeyDown, tabIndex: 0 };
      render(<InitialsAvatar {...props} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("tabindex", "0");
    });
  });

  describe("Edge Cases", () => {
    it("should handle special characters in initials", () => {
      const props = { ...defaultProps, initials: "@#" };
      render(<InitialsAvatar {...props} />);

      expect(screen.getByText("@#")).toBeInTheDocument();
    });

    it("should handle numbers in initials", () => {
      const props = { ...defaultProps, initials: "12" };
      render(<InitialsAvatar {...props} />);

      expect(screen.getByText("12")).toBeInTheDocument();
    });

    it("should handle whitespace in initials", () => {
      const props = { ...defaultProps, initials: " A " };
      const { container } = render(<InitialsAvatar {...props} />);

      // Should get first 2 characters with whitespace preserved
      const avatarDiv = container.querySelector('[role="img"]');
      expect(avatarDiv).toBeInTheDocument();
      expect(avatarDiv?.textContent).toBe(" A");
    });
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ImageAvatar from "../ImageAvatar";
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

describe("ImageAvatar Renderer", () => {
  const defaultProps = {
    variant: AVATAR_VARIANTS.IMAGE as const,
    src: "/test-image.jpg",
    alt: "Test avatar",
    avatarClasses: combineClasses(
      styles.avatar,
      styles["size-md"],
      styles["shape-circle"],
      styles["variant-image"],
    ),
    imageError: false,
    setImageError: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render image avatar with provided src", () => {
      render(<ImageAvatar {...defaultProps} />);

      // Check for the avatar container (wrapper div)
      const avatar = screen.getByLabelText("Test avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("role", "img");

      // Check for the actual img element
      const image = screen.getByAltText("Test avatar");
      expect(image).toHaveAttribute("src", "/test-image.jpg");
      expect(image).toHaveClass(styles.image);
    });

    it("should use default alt text when not provided", () => {
      const props = { ...defaultProps, alt: undefined };
      render(<ImageAvatar {...props} />);

      const image = screen.getByAltText("Avatar");
      expect(image).toBeInTheDocument();
    });

    it("should use ariaLabel when provided", () => {
      const props = { ...defaultProps, ariaLabel: "Custom avatar label" };
      render(<ImageAvatar {...props} />);

      const avatar = screen.getByLabelText("Custom avatar label");
      expect(avatar).toBeInTheDocument();
    });

    it("should apply custom styles", () => {
      const customStyle = { border: "2px solid red" };
      const props = { ...defaultProps, style: customStyle };
      render(<ImageAvatar {...props} />);

      const avatar = screen.getByLabelText("Test avatar");
      expect(avatar).toHaveStyle("border: 2px solid red");
    });

    it("should forward additional props", () => {
      const props = {
        ...defaultProps,
        "data-testid": "custom-image-avatar",
        title: "Hover tooltip",
      };
      render(<ImageAvatar {...props} />);

      const avatar = screen.getByTestId("custom-image-avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("title", "Hover tooltip");
    });
  });

  describe("Error Handling", () => {
    it("should call setImageError when image fails to load", () => {
      const setImageError = vi.fn();
      const props = { ...defaultProps, setImageError };
      render(<ImageAvatar {...props} />);

      const image = screen.getByAltText("Test avatar");
      fireEvent.error(image);

      expect(setImageError).toHaveBeenCalledWith(true);
    });

    it("should call onImageError callback when provided", () => {
      const onImageError = vi.fn();
      const setImageError = vi.fn();
      const props = { ...defaultProps, onImageError, setImageError };
      render(<ImageAvatar {...props} />);

      const image = screen.getByAltText("Test avatar");
      fireEvent.error(image);

      expect(onImageError).toHaveBeenCalledTimes(1);
      expect(setImageError).toHaveBeenCalledWith(true);
    });

    it("should not crash when onImageError is not provided", () => {
      const setImageError = vi.fn();
      const props = { ...defaultProps, setImageError };
      render(<ImageAvatar {...props} />);

      const image = screen.getByAltText("Test avatar");

      expect(() => {
        fireEvent.error(image);
      }).not.toThrow();

      expect(setImageError).toHaveBeenCalledWith(true);
    });
  });

  describe("Fallback Rendering", () => {
    it("should render fallback initials when imageError is true", () => {
      const props = {
        ...defaultProps,
        imageError: true,
        fallback: "John Doe",
        avatarClasses: combineClasses(
          styles.avatar,
          styles["size-md"],
          styles["shape-circle"],
          styles["variant-initials"],
        ),
      };
      render(<ImageAvatar {...props} />);

      // Should show initials instead of image
      expect(screen.getByText("JD")).toBeInTheDocument();

      // Should have initials variant class
      const avatar = screen.getByLabelText("Test avatar");
      expect(avatar).toHaveClass(styles["variant-initials"]);
    });

    it("should use fallback name in aria-label when in error state", () => {
      const props = {
        ...defaultProps,
        imageError: true,
        fallback: "John Doe",
        ariaLabel: undefined,
        alt: undefined,
      };
      render(<ImageAvatar {...props} />);

      const avatar = screen.getByLabelText("Avatar for John Doe");
      expect(avatar).toBeInTheDocument();
    });

    it("should apply white text color for fallback initials", () => {
      const props = {
        ...defaultProps,
        imageError: true,
        fallback: "Test User",
      };
      render(<ImageAvatar {...props} />);

      const avatar = screen.getByLabelText("Test avatar");
      expect(avatar).toHaveStyle("color: var(--color-white)");
    });

    it("should generate consistent background color for fallback", () => {
      const props1 = {
        ...defaultProps,
        imageError: true,
        fallback: "Same User",
      };

      const { rerender } = render(<ImageAvatar {...props1} />);
      const firstAvatar = screen.getByLabelText("Test avatar");
      const firstBgColor = window.getComputedStyle(firstAvatar).backgroundColor;

      const props2 = {
        ...defaultProps,
        imageError: true,
        fallback: "Same User",
      };
      rerender(<ImageAvatar {...props2} />);
      const secondAvatar = screen.getByLabelText("Test avatar");
      const secondBgColor =
        window.getComputedStyle(secondAvatar).backgroundColor;

      expect(firstBgColor).toBe(secondBgColor);
    });

    it("should not show fallback when imageError is false", () => {
      const props = {
        ...defaultProps,
        imageError: false,
        fallback: "John Doe",
      };
      render(<ImageAvatar {...props} />);

      // Should not show initials
      expect(screen.queryByText("JD")).not.toBeInTheDocument();

      // Should show the actual image
      const image = screen.getByAltText("Test avatar");
      expect(image).toBeInTheDocument();
    });

    it("should not show fallback when no fallback is provided even if imageError is true", () => {
      const props = {
        ...defaultProps,
        imageError: true,
        fallback: undefined,
      };
      render(<ImageAvatar {...props} />);

      // Should still show the image even with error
      const image = screen.getByAltText("Test avatar");
      expect(image).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper role attribute", () => {
      render(<ImageAvatar {...defaultProps} />);

      const avatar = screen.getByLabelText("Test avatar");
      expect(avatar).toHaveAttribute("role", "img");
    });

    it("should prioritize ariaLabel over alt text", () => {
      const props = {
        ...defaultProps,
        ariaLabel: "Custom label",
        alt: "Alt text",
      };
      render(<ImageAvatar {...props} />);

      const avatar = screen.getByLabelText("Custom label");
      expect(avatar).toBeInTheDocument();
    });

    it("should fallback to default aria-label when neither ariaLabel nor alt provided", () => {
      const props = {
        ...defaultProps,
        ariaLabel: undefined,
        alt: undefined,
      };
      render(<ImageAvatar {...props} />);

      const avatar = screen.getByLabelText("User avatar");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Style Classes", () => {
    it("should apply provided avatar classes", () => {
      const customClasses = "custom-class another-class";
      const props = { ...defaultProps, avatarClasses: customClasses };
      render(<ImageAvatar {...props} />);

      const avatar = screen.getByLabelText("Test avatar");
      expect(avatar).toHaveClass("custom-class", "another-class");
    });

    it("should merge custom styles with component styles", () => {
      const customStyle = {
        border: "2px solid red",
        padding: "10px",
      };
      const props = { ...defaultProps, style: customStyle };
      render(<ImageAvatar {...props} />);

      const avatar = screen.getByLabelText("Test avatar");
      expect(avatar).toHaveStyle("border: 2px solid red");
      expect(avatar).toHaveStyle("padding: 10px");
    });
  });
});

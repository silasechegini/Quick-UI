import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Avatar from "../Avatar";
import { AVATAR_SIZES, AVATAR_SHAPES, AVATAR_VARIANTS } from "../Avatar.types";

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

describe("Avatar Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<Avatar />);
      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("avatar", "size-md", "shape-circle");
    });

    it("should render with custom className", () => {
      render(<Avatar className="custom-avatar" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("custom-avatar");
    });

    it("should render with custom style", () => {
      const customStyle = { border: "2px solid red" };
      render(<Avatar style={customStyle} />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("border: 2px solid red");
    });

    it("should render with custom aria label", () => {
      render(<Avatar ariaLabel="Custom avatar label" />);
      const avatar = screen.getByLabelText("Custom avatar label");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should apply extra small size class", () => {
      render(<Avatar size="xs" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("size-xs");
    });

    it("should apply small size class", () => {
      render(<Avatar size="sm" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("size-sm");
    });

    it("should apply medium size class by default", () => {
      render(<Avatar />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("size-md");
    });

    it("should apply large size class", () => {
      render(<Avatar size="lg" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("size-lg");
    });

    it("should apply extra large size class", () => {
      render(<Avatar size="xl" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("size-xl");
    });

    it("should apply double extra large size class", () => {
      render(<Avatar size="xxl" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("size-xxl");
    });
  });

  describe("Shapes", () => {
    it("should apply circle shape class by default", () => {
      render(<Avatar />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("shape-circle");
    });

    it("should apply square shape class", () => {
      render(<Avatar shape="square" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("shape-square");
    });

    it("should apply rounded shape class", () => {
      render(<Avatar shape="rounded" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("shape-rounded");
    });
  });

  describe("Image Variant", () => {
    it("should render image avatar", () => {
      render(
        <Avatar variant="image" src="/test-image.jpg" alt="Test avatar" />,
      );

      const avatar = screen.getByRole("img", { name: "User avatar" });
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("variant-image");

      const image = screen.getByRole("img", { name: "Test avatar" });
      expect(image).toHaveAttribute("src", "/test-image.jpg");
    });

    it("should handle image error with fallback initials", () => {
      render(
        <Avatar
          variant="image"
          src="/invalid-image.jpg"
          fallback="John Doe"
          alt="Test avatar"
        />,
      );

      const image = screen.getByRole("img", { name: "Test avatar" });
      fireEvent.error(image);

      // After error, should show initials fallback
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should call onImageError callback when image fails", () => {
      const onImageError = vi.fn();
      render(
        <Avatar
          variant="image"
          src="/invalid-image.jpg"
          onImageError={onImageError}
          alt="Test avatar"
        />,
      );

      const image = screen.getByRole("img", { name: "Test avatar" });
      fireEvent.error(image);

      expect(onImageError).toHaveBeenCalledTimes(1);
    });
  });

  describe("Initials Variant", () => {
    it("should render initials avatar", () => {
      render(<Avatar variant="initials" initials="AB" />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("variant-initials");
      expect(screen.getByText("AB")).toBeInTheDocument();
    });

    it("should truncate initials to 2 characters", () => {
      render(<Avatar variant="initials" initials="ABCD" />);

      expect(screen.getByText("AB")).toBeInTheDocument();
    });

    it("should convert initials to uppercase", () => {
      render(<Avatar variant="initials" initials="ab" />);

      expect(screen.getByText("AB")).toBeInTheDocument();
    });

    it("should apply custom background and text colors", () => {
      render(
        <Avatar
          variant="initials"
          initials="AB"
          backgroundColor="#FF0000"
          textColor="#FFFFFF"
        />,
      );

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("background-color: #FF0000");
      expect(avatar).toHaveStyle("color: #FFFFFF");
    });

    it("should generate consistent colors for same initials", () => {
      const { rerender } = render(<Avatar variant="initials" initials="XY" />);

      const firstAvatar = screen.getByRole("img");
      const firstStyle = window.getComputedStyle(firstAvatar);

      rerender(<Avatar variant="initials" initials="XY" />);

      const secondAvatar = screen.getByRole("img");
      const secondStyle = window.getComputedStyle(secondAvatar);

      expect(firstStyle.backgroundColor).toBe(secondStyle.backgroundColor);
    });
  });

  describe("Icon Variant", () => {
    it("should render icon avatar", () => {
      const TestIcon = () => <span data-testid="test-icon">👤</span>;

      render(<Avatar variant="icon" icon={<TestIcon />} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("variant-icon");
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("should apply custom background and icon colors", () => {
      const TestIcon = () => <span data-testid="test-icon">👤</span>;

      render(
        <Avatar
          variant="icon"
          icon={<TestIcon />}
          backgroundColor="#00FF00"
          iconColor="#000000"
        />,
      );

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle("background-color: #00FF00");
      expect(avatar).toHaveStyle("color: #000000");
    });
  });

  describe("Placeholder Variant", () => {
    it("should render placeholder avatar by default", () => {
      render(<Avatar />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("aria-label", "Avatar placeholder");
    });

    it("should render explicit placeholder variant", () => {
      render(<Avatar variant="placeholder" />);

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("aria-label", "Avatar placeholder");
    });

    it("should apply custom background color to placeholder", () => {
      render(<Avatar variant="placeholder" backgroundColor="#FF00FF" />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveStyle(
        "background: linear-gradient(135deg, #FF00FF, #FF00FFdd)",
      );
    });
  });

  describe("Enums", () => {
    it("should work with AVATAR_SIZES enum", () => {
      render(<Avatar size={AVATAR_SIZES.LARGE} />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("size-lg");
    });

    it("should work with AVATAR_SHAPES enum", () => {
      render(<Avatar shape={AVATAR_SHAPES.SQUARE} />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("shape-square");
    });

    it("should work with AVATAR_VARIANTS enum", () => {
      render(<Avatar variant={AVATAR_VARIANTS.INITIALS} initials="TE" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("variant-initials");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<Avatar alt="User profile picture" />);
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("role", "img");
    });

    it("should use alt text for aria-label when provided", () => {
      render(<Avatar alt="Profile picture" />);
      const avatar = screen.getByLabelText("Profile picture");
      expect(avatar).toBeInTheDocument();
    });

    it("should use ariaLabel when provided", () => {
      render(<Avatar ariaLabel="Custom accessibility label" />);
      const avatar = screen.getByLabelText("Custom accessibility label");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Props Forwarding", () => {
    it("should forward additional HTML attributes", () => {
      render(<Avatar data-testid="custom-avatar" title="Hover tooltip" />);

      const avatar = screen.getByTestId("custom-avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("title", "Hover tooltip");
    });
  });
});

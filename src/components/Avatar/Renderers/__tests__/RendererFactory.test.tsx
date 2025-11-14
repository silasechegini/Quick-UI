import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  createAvatarRenderer,
  isVariantSupported,
  getSupportedVariants,
} from "../RendererFactory";
import {
  AVATAR_VARIANTS,
  AvatarVariants,
  ImageAvatarProps,
  InitialsAvatarProps,
  IconAvatarProps,
  PlaceholderAvatarProps,
} from "../../Avatar.types";
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

describe("RendererFactory", () => {
  const baseAvatarClasses = combineClasses(
    styles.avatar,
    styles["size-md"],
    styles["shape-circle"],
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createAvatarRenderer", () => {
    describe("Image Variant", () => {
      const imageProps: ImageAvatarProps = {
        variant: AVATAR_VARIANTS.IMAGE,
        src: "/test-image.jpg",
        alt: "Test image",
        fallback: "Test User",
      };

      it("should create ImageAvatar renderer", () => {
        const setImageError = vi.fn();
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.IMAGE,
          imageProps,
          `${baseAvatarClasses} ${styles["variant-image"]}`,
          false,
          setImageError,
        );

        render(element);

        const avatar = screen.getByLabelText("Test image");
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveClass(styles["variant-image"]);
        expect(screen.getByAltText("Test image")).toBeInTheDocument();
      });

      it("should pass imageError state to ImageAvatar", () => {
        const setImageError = vi.fn();
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.IMAGE,
          imageProps,
          baseAvatarClasses,
          true,
          setImageError,
        );

        render(element);

        // When imageError is true and fallback exists, should show initials
        expect(screen.getByText("TU")).toBeInTheDocument();
      });

      it("should require setImageError for image variant", () => {
        expect(() => {
          createAvatarRenderer(
            AVATAR_VARIANTS.IMAGE,
            imageProps,
            baseAvatarClasses,
            false,
            undefined,
          );
        }).toThrow();
      });

      it("should handle image variant without fallback", () => {
        const propsWithoutFallback = { ...imageProps, fallback: undefined };
        const setImageError = vi.fn();
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.IMAGE,
          propsWithoutFallback,
          baseAvatarClasses,
          false,
          setImageError,
        );

        render(element);

        const avatar = screen.getByLabelText("Test image");
        expect(avatar).toBeInTheDocument();
      });
    });

    describe("Initials Variant", () => {
      const initialsProps: InitialsAvatarProps = {
        variant: AVATAR_VARIANTS.INITIALS,
        initials: "AB",
        backgroundColor: "#FF0000",
        textColor: "#FFFFFF",
      };

      it("should create InitialsAvatar renderer", () => {
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.INITIALS,
          initialsProps,
          `${baseAvatarClasses} ${styles["variant-initials"]}`,
        );

        render(element);

        const avatar = screen.getByRole("img");
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveClass(styles["variant-initials"]);
        expect(screen.getByText("AB")).toBeInTheDocument();
        expect(avatar).toHaveStyle("background-color: #FF0000");
        expect(avatar).toHaveStyle("color: #FFFFFF");
      });

      it("should not require imageError parameters for initials variant", () => {
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.INITIALS,
          initialsProps,
          baseAvatarClasses,
        );

        render(element);

        expect(screen.getByText("AB")).toBeInTheDocument();
      });

      it("should handle initials variant with minimal props", () => {
        const minimalProps: InitialsAvatarProps = {
          variant: AVATAR_VARIANTS.INITIALS,
          initials: "XY",
        };
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.INITIALS,
          minimalProps,
          baseAvatarClasses,
        );

        render(element);

        expect(screen.getByText("XY")).toBeInTheDocument();
      });
    });

    describe("Icon Variant", () => {
      const TestIcon = () => <span data-testid="test-icon">👤</span>;
      const iconProps: IconAvatarProps = {
        variant: AVATAR_VARIANTS.ICON,
        icon: <TestIcon />,
        backgroundColor: "#00FF00",
        iconColor: "#000000",
      };

      it("should create IconAvatar renderer", () => {
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.ICON,
          iconProps,
          `${baseAvatarClasses} ${styles["variant-icon"]}`,
        );

        render(element);

        const avatar = screen.getByRole("img");
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveClass(styles["variant-icon"]);
        expect(screen.getByTestId("test-icon")).toBeInTheDocument();
        expect(avatar).toHaveStyle("background-color: #00FF00");
        expect(avatar).toHaveStyle("color: #000000");
      });

      it("should handle string icons", () => {
        const stringIconProps: IconAvatarProps = {
          variant: AVATAR_VARIANTS.ICON,
          icon: "🚀",
        };
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.ICON,
          stringIconProps,
          baseAvatarClasses,
        );

        render(element);

        expect(screen.getByText("🚀")).toBeInTheDocument();
      });

      it("should handle null/undefined icons", () => {
        const nullIconProps: IconAvatarProps = {
          variant: AVATAR_VARIANTS.ICON,
          icon: null,
        };
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.ICON,
          nullIconProps,
          baseAvatarClasses,
        );

        render(element);

        const avatar = screen.getByRole("img");
        expect(avatar).toBeInTheDocument();
      });
    });

    describe("Placeholder Variant", () => {
      const placeholderProps: PlaceholderAvatarProps = {
        variant: AVATAR_VARIANTS.PLACEHOLDER,
        backgroundColor: "#0000FF",
      };

      it("should create PlaceholderAvatar renderer", () => {
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.PLACEHOLDER,
          placeholderProps,
          `${baseAvatarClasses} ${styles["variant-placeholder"]}`,
        );

        render(element);

        const avatar = screen.getByRole("img");
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveClass(styles["variant-placeholder"]);
        expect(avatar).toHaveStyle(
          "background: linear-gradient(135deg, #0000FF, #0000FFdd)",
        );
      });

      it("should handle placeholder variant with minimal props", () => {
        const minimalProps: PlaceholderAvatarProps = {
          variant: AVATAR_VARIANTS.PLACEHOLDER,
        };
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.PLACEHOLDER,
          minimalProps,
          baseAvatarClasses,
        );

        render(element);

        const avatar = screen.getByRole("img");
        expect(avatar).toBeInTheDocument();
      });

      it("should handle optional variant property", () => {
        const optionalVariantProps: PlaceholderAvatarProps = {
          backgroundColor: "#PURPLE",
        };
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.PLACEHOLDER,
          optionalVariantProps,
          baseAvatarClasses,
        );

        render(element);

        const avatar = screen.getByRole("img");
        expect(avatar).toBeInTheDocument();
      });
    });

    describe("Error Handling", () => {
      it("should throw error for unsupported variant", () => {
        const invalidProps = {
          variant: "invalid",
        };

        expect(() => {
          createAvatarRenderer(
            "invalid" as unknown as AvatarVariants,
            invalidProps as unknown as ImageAvatarProps,
            baseAvatarClasses,
          );
        }).toThrow("Unsupported avatar variant: invalid");
      });

      it("should handle undefined variant gracefully", () => {
        expect(() => {
          createAvatarRenderer(
            undefined as unknown as AvatarVariants,
            {} as unknown as ImageAvatarProps,
            baseAvatarClasses,
          );
        }).toThrow("Unsupported avatar variant: undefined");
      });

      it("should handle null variant gracefully", () => {
        expect(() => {
          createAvatarRenderer(
            null as unknown as AvatarVariants,
            {} as unknown as ImageAvatarProps,
            baseAvatarClasses,
          );
        }).toThrow("Unsupported avatar variant: null");
      });
    });

    describe("Props Forwarding", () => {
      it("should forward common props to all variants", () => {
        const commonProps = {
          "data-testid": "test-avatar",
          title: "Test tooltip",
          className: "custom-class",
        };

        const imageProps = {
          ...commonProps,
          variant: AVATAR_VARIANTS.IMAGE,
          src: "/test.jpg",
        } as ImageAvatarProps;

        const setImageError = vi.fn();
        const element = createAvatarRenderer(
          AVATAR_VARIANTS.IMAGE,
          imageProps,
          baseAvatarClasses,
          false,
          setImageError,
        );

        render(element);

        const avatar = screen.getByTestId("test-avatar");
        expect(avatar).toHaveAttribute("title", "Test tooltip");
      });

      it("should maintain type safety for variant-specific props", () => {
        // This test ensures TypeScript compiler catches type mismatches
        const initialsProps: InitialsAvatarProps = {
          variant: AVATAR_VARIANTS.INITIALS,
          initials: "TS", // This should be required for initials variant
        };

        const element = createAvatarRenderer(
          AVATAR_VARIANTS.INITIALS,
          initialsProps,
          baseAvatarClasses,
        );

        render(element);
        expect(screen.getByText("TS")).toBeInTheDocument();
      });
    });
  });

  describe("isVariantSupported", () => {
    it("should return true for supported variants", () => {
      expect(isVariantSupported(AVATAR_VARIANTS.IMAGE)).toBe(true);
      expect(isVariantSupported(AVATAR_VARIANTS.INITIALS)).toBe(true);
      expect(isVariantSupported(AVATAR_VARIANTS.ICON)).toBe(true);
      expect(isVariantSupported(AVATAR_VARIANTS.PLACEHOLDER)).toBe(true);
    });

    it("should return true for string values of supported variants", () => {
      expect(isVariantSupported("image")).toBe(true);
      expect(isVariantSupported("initials")).toBe(true);
      expect(isVariantSupported("icon")).toBe(true);
      expect(isVariantSupported("placeholder")).toBe(true);
    });

    it("should return false for unsupported variants", () => {
      expect(isVariantSupported("invalid")).toBe(false);
      expect(isVariantSupported("")).toBe(false);
      expect(isVariantSupported("IMAGE")).toBe(false); // Case sensitive
      expect(isVariantSupported("video")).toBe(false);
    });

    it("should handle edge cases", () => {
      expect(isVariantSupported(null as unknown as string)).toBe(false);
      expect(isVariantSupported(undefined as unknown as string)).toBe(false);
      expect(isVariantSupported(123 as unknown as string)).toBe(false);
      expect(isVariantSupported({} as unknown as string)).toBe(false);
      expect(isVariantSupported([] as unknown as string)).toBe(false);
    });

    it("should provide type narrowing", () => {
      const userInput = "image" as string;

      if (isVariantSupported(userInput)) {
        // TypeScript should now know userInput is AvatarVariants
        const element = createAvatarRenderer(
          userInput,
          { variant: userInput, src: "/test.jpg" } as ImageAvatarProps,
          baseAvatarClasses,
          false,
          vi.fn(),
        );
        expect(element).toBeDefined();
      }
    });
  });

  describe("getSupportedVariants", () => {
    it("should return all supported variants", () => {
      const variants = getSupportedVariants();

      expect(variants).toContain(AVATAR_VARIANTS.IMAGE);
      expect(variants).toContain(AVATAR_VARIANTS.INITIALS);
      expect(variants).toContain(AVATAR_VARIANTS.ICON);
      expect(variants).toContain(AVATAR_VARIANTS.PLACEHOLDER);
      expect(variants).toHaveLength(4);
    });

    it("should return variants in consistent order", () => {
      const variants1 = getSupportedVariants();
      const variants2 = getSupportedVariants();

      expect(variants1).toEqual(variants2);
    });

    it("should return array of strings", () => {
      const variants = getSupportedVariants();

      variants.forEach((variant) => {
        expect(typeof variant).toBe("string");
      });
    });

    it("should return variants that pass isVariantSupported check", () => {
      const variants = getSupportedVariants();

      variants.forEach((variant) => {
        expect(isVariantSupported(variant)).toBe(true);
      });
    });

    it("should be usable for validation logic", () => {
      const supportedVariants = getSupportedVariants();
      const testInputs = ["image", "invalid", "initials", "video"];

      const validInputs = testInputs.filter((input) =>
        supportedVariants.includes(input as AvatarVariants),
      );

      expect(validInputs).toEqual(["image", "initials"]);
    });
  });

  describe("Integration Tests", () => {
    it("should work together for validation workflow", () => {
      const userInput = "initials";

      // Check if input is supported
      expect(isVariantSupported(userInput)).toBe(true);

      // Get all supported variants for reference
      const allVariants = getSupportedVariants();
      expect(allVariants).toContain(userInput);

      // Create renderer if supported
      if (isVariantSupported(userInput)) {
        const props: InitialsAvatarProps = {
          variant: userInput,
          initials: "IT",
        };

        const element = createAvatarRenderer(
          userInput,
          props,
          baseAvatarClasses,
        );

        render(element);
        expect(screen.getByText("IT")).toBeInTheDocument();
      }
    });

    it("should handle complete avatar creation workflow", () => {
      const avatarConfigs = [
        {
          variant: AVATAR_VARIANTS.IMAGE,
          props: {
            variant: AVATAR_VARIANTS.IMAGE,
            src: "/user1.jpg",
            alt: "User 1",
          } as ImageAvatarProps,
          expectedLabel: "User 1",
          requiresImageError: true,
        },
        {
          variant: AVATAR_VARIANTS.INITIALS,
          props: {
            variant: AVATAR_VARIANTS.INITIALS,
            initials: "U2",
          } as InitialsAvatarProps,
          expectedText: "U2",
          requiresImageError: false,
        },
        {
          variant: AVATAR_VARIANTS.PLACEHOLDER,
          props: {
            variant: AVATAR_VARIANTS.PLACEHOLDER,
          } as PlaceholderAvatarProps,
          expectedLabel: "Avatar placeholder",
          requiresImageError: false,
        },
      ];

      avatarConfigs.forEach((config) => {
        const { container } = render(
          <div data-testid={`container-${config.variant}`}>
            {config.requiresImageError
              ? createAvatarRenderer(
                  config.variant,
                  config.props,
                  baseAvatarClasses,
                  false,
                  vi.fn(),
                )
              : createAvatarRenderer(
                  config.variant,
                  config.props,
                  baseAvatarClasses,
                )}
          </div>,
        );

        const avatarContainer = screen.getByTestId(
          `container-${config.variant}`,
        );
        expect(avatarContainer).toBeInTheDocument();

        if (config.expectedText) {
          expect(screen.getByText(config.expectedText)).toBeInTheDocument();
        }
        if (config.expectedLabel) {
          expect(
            screen.getByLabelText(config.expectedLabel),
          ).toBeInTheDocument();
        }

        // Clean up for next iteration
        container.remove();
      });
    });
  });
});

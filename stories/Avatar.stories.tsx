import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "../src/components/Avatar/Avatar";
import {
  AVATAR_SIZES,
  AVATAR_SHAPES,
  AVATAR_VARIANTS,
} from "../src/components/Avatar/Avatar.types";

// Example user icon for icon variant
const UserIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Avatar component displays user profile pictures, initials, icons, or placeholder representations. 
It supports multiple sizes, shapes, and variants with built-in accessibility features.

## Features
- **Multiple Variants**: Image, initials, icon, and placeholder
- **Flexible Sizing**: Six size options from xs to xxl
- **Shape Options**: Circle, square, and rounded variants
- **Fallback Support**: Automatic fallback from image to initials
- **Color Customization**: Custom colors for initials and icons
- **Accessibility**: Full ARIA support and keyboard navigation
- **Auto-generated Colors**: Consistent colors based on initials
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(AVATAR_VARIANTS),
      description: "The type of avatar to display",
    },
    size: {
      control: "select",
      options: Object.values(AVATAR_SIZES),
      description: "Size of the avatar",
    },
    shape: {
      control: "select",
      options: Object.values(AVATAR_SHAPES),
      description: "Shape of the avatar",
    },
    src: {
      control: "text",
      description: "Image source URL (for image variant)",
      if: { arg: "variant", eq: "image" },
    },
    fallback: {
      control: "text",
      description: "Fallback text when image fails to load",
      if: { arg: "variant", eq: "image" },
    },
    initials: {
      control: "text",
      description: "Initials to display (for initials variant)",
      if: { arg: "variant", eq: "initials" },
    },
    backgroundColor: {
      control: "color",
      description: "Custom background color",
    },
    textColor: {
      control: "color",
      description: "Custom text color (for initials variant)",
      if: { arg: "variant", eq: "initials" },
    },
    iconColor: {
      control: "color",
      description: "Custom icon color (for icon variant)",
      if: { arg: "variant", eq: "icon" },
    },
    alt: {
      control: "text",
      description: "Alt text for accessibility",
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default placeholder avatar
export const Default: Story = {
  args: {},
};

// Image avatar with fallback
export const ImageAvatar: Story = {
  args: {
    variant: AVATAR_VARIANTS.IMAGE,
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    alt: "John Doe",
    size: AVATAR_SIZES.LARGE,
  },
};

// Image avatar with fallback demonstration
export const ImageWithFallback: Story = {
  args: {
    variant: AVATAR_VARIANTS.IMAGE,
    src: "https://invalid-url-to-trigger-fallback.jpg",
    fallback: "Jane Smith",
    alt: "Jane Smith",
    size: AVATAR_SIZES.LARGE,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This demonstrates the fallback behavior when an image fails to load. The avatar automatically shows initials instead.",
      },
    },
  },
};

// Initials avatar
export const InitialsAvatar: Story = {
  args: {
    variant: AVATAR_VARIANTS.INITIALS,
    initials: "AB",
    size: AVATAR_SIZES.LARGE,
  },
};

// Initials with custom colors
export const CustomColorInitials: Story = {
  args: {
    variant: AVATAR_VARIANTS.INITIALS,
    initials: "JD",
    backgroundColor: "#4F46E5",
    textColor: "#FFFFFF",
    size: AVATAR_SIZES.LARGE,
  },
};

// Icon avatar
export const IconAvatar: Story = {
  args: {
    variant: AVATAR_VARIANTS.ICON,
    icon: <UserIcon />,
    size: AVATAR_SIZES.LARGE,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Icon avatars are useful for system accounts, bots, or when representing non-person entities.",
      },
    },
  },
};

// Icon with custom colors
export const CustomColorIcon: Story = {
  args: {
    variant: AVATAR_VARIANTS.ICON,
    icon: <UserIcon />,
    backgroundColor: "#22C55E",
    iconColor: "#FFFFFF",
    size: AVATAR_SIZES.LARGE,
  },
};

// Size variations
export const SizeVariations: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Avatar
        size={AVATAR_SIZES.EXTRA_SMALL}
        variant={AVATAR_VARIANTS.INITIALS}
        initials="XS"
      />
      <Avatar
        size={AVATAR_SIZES.SMALL}
        variant={AVATAR_VARIANTS.INITIALS}
        initials="SM"
      />
      <Avatar
        size={AVATAR_SIZES.MEDIUM}
        variant={AVATAR_VARIANTS.INITIALS}
        initials="MD"
      />
      <Avatar
        size={AVATAR_SIZES.LARGE}
        variant={AVATAR_VARIANTS.INITIALS}
        initials="LG"
      />
      <Avatar
        size={AVATAR_SIZES.EXTRA_LARGE}
        variant={AVATAR_VARIANTS.INITIALS}
        initials="XL"
      />
      <Avatar
        size={AVATAR_SIZES.DOUBLE_EXTRA_LARGE}
        variant={AVATAR_VARIANTS.INITIALS}
        initials="XXL"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar component supports six different sizes from extra small (xs) to double extra large (xxl).",
      },
    },
  },
};

// Shape variations
export const ShapeVariations: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Avatar
        shape={AVATAR_SHAPES.CIRCLE}
        variant={AVATAR_VARIANTS.INITIALS}
        initials="CI"
        size={AVATAR_SIZES.LARGE}
      />
      <Avatar
        shape={AVATAR_SHAPES.ROUNDED}
        variant={AVATAR_VARIANTS.INITIALS}
        initials="RO"
        size={AVATAR_SIZES.LARGE}
      />
      <Avatar
        shape={AVATAR_SHAPES.SQUARE}
        variant={AVATAR_VARIANTS.INITIALS}
        initials="SQ"
        size={AVATAR_SIZES.LARGE}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three shape variants: circle (default), rounded corners, and square.",
      },
    },
  },
};

// Variant showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{ textAlign: "center" }}>
        <Avatar
          variant="image"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          alt="Profile"
          size={AVATAR_SIZES.LARGE}
        />
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          Image
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          variant={AVATAR_VARIANTS.INITIALS}
          initials="AB"
          size={AVATAR_SIZES.LARGE}
        />
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          Initials
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          variant={AVATAR_VARIANTS.ICON}
          icon={<UserIcon />}
          size={AVATAR_SIZES.LARGE}
        />
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          Icon
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          variant={AVATAR_VARIANTS.PLACEHOLDER}
          size={AVATAR_SIZES.LARGE}
        />
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          Placeholder
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All four avatar variants: image, initials, icon, and placeholder.",
      },
    },
  },
};

// Color consistency demonstration
export const ColorConsistency: Story = {
  render: () => (
    <div>
      <h4>Same initials generate consistent colors:</h4>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Avatar
          variant={AVATAR_VARIANTS.INITIALS}
          initials="AB"
          size={AVATAR_SIZES.MEDIUM}
        />
        <Avatar
          variant={AVATAR_VARIANTS.INITIALS}
          initials="AB"
          size={AVATAR_SIZES.LARGE}
        />
        <Avatar
          variant={AVATAR_VARIANTS.INITIALS}
          initials="AB"
          size={AVATAR_SIZES.EXTRA_LARGE}
          shape={AVATAR_SHAPES.SQUARE}
        />
      </div>
      <h4>Different initials get different colors:</h4>
      <div style={{ display: "flex", gap: "16px" }}>
        <Avatar
          variant={AVATAR_VARIANTS.INITIALS}
          initials="JD"
          size={AVATAR_SIZES.LARGE}
        />
        <Avatar
          variant={AVATAR_VARIANTS.INITIALS}
          initials="SM"
          size={AVATAR_SIZES.LARGE}
        />
        <Avatar
          variant={AVATAR_VARIANTS.INITIALS}
          initials="RW"
          size={AVATAR_SIZES.LARGE}
        />
        <Avatar
          variant={AVATAR_VARIANTS.INITIALS}
          initials="KL"
          size={AVATAR_SIZES.LARGE}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar automatically generates consistent, distinct colors based on the initials to help users identify different people.",
      },
    },
  },
};

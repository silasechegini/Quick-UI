import type { Meta, StoryObj } from "@storybook/react";
import {
  Badge,
  BADGE_VARIANTS,
  BADGE_SIZES,
  BADGE_POSITIONS,
  BADGE_TYPES,
} from "../src/components/Badge";
import { Icon } from "../src/components/Icon";
import { ICONS } from "../src/assets/iconType";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "number" },
      description: "Numeric count to display",
    },
    max: {
      control: { type: "number" },
      description: "Maximum count before showing max+",
    },
    showZero: {
      control: { type: "boolean" },
      description: "Show badge when count is 0",
    },
    variant: {
      control: { type: "select" },
      options: Object.values(BADGE_VARIANTS),
      description: "Color variant",
    },
    size: {
      control: { type: "select" },
      options: Object.values(BADGE_SIZES),
      description: "Size of the badge",
    },
    position: {
      control: { type: "select" },
      options: Object.values(BADGE_POSITIONS),
      description: "Position relative to children",
    },
    type: {
      control: { type: "select" },
      options: Object.values(BADGE_TYPES),
      description: "Badge type: standard or dot",
    },
    pulse: {
      control: { type: "boolean" },
      description: "Add pulse animation",
    },
    invisible: {
      control: { type: "boolean" },
      description: "Hide the badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ========================================
// BASIC EXAMPLES
// ========================================

export const Default: Story = {
  args: {
    count: 5,
    position: "inline",
  },
};

export const WithIcon: Story = {
  args: {
    count: 3,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.DASHBOARD_ICON} size={32} />
    </Badge>
  ),
};

export const DotBadge: Story = {
  args: {
    type: "dot",
    variant: "success",
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.USER_ICON} size={32} />
    </Badge>
  ),
};

// ========================================
// VARIANTS (COLORS)
// ========================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <Badge variant="primary" count={5} position="inline" />
      <Badge variant="secondary" count={5} position="inline" />
      <Badge variant="success" count={5} position="inline" />
      <Badge variant="error" count={5} position="inline" />
      <Badge variant="warning" count={5} position="inline" />
      <Badge variant="info" count={5} position="inline" />
      <Badge variant="neutral" count={5} position="inline" />
    </div>
  ),
};

export const Primary: Story = {
  args: {
    variant: "primary",
    count: 5,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.ANALYTICS_ICON} size={32} />
    </Badge>
  ),
};

export const Success: Story = {
  args: {
    variant: "success",
    count: 12,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.CHECKMARK_ICON} size={32} />
    </Badge>
  ),
};

export const Error: Story = {
  args: {
    variant: "error",
    count: 99,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.DASHBOARD_ICON} size={32} />
    </Badge>
  ),
};

export const Warning: Story = {
  args: {
    variant: "warning",
    count: 7,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.EXCLAMATION_ICON} size={32} />
    </Badge>
  ),
};

// ========================================
// SIZES
// ========================================

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <Badge size="sm" count={5}>
        <Icon name={ICONS.ANALYTICS_ICON} size={24} />
      </Badge>
      <Badge size="md" count={5}>
        <Icon name={ICONS.ANALYTICS_ICON} size={32} />
      </Badge>
      <Badge size="lg" count={5}>
        <Icon name={ICONS.ANALYTICS_ICON} size={40} />
      </Badge>
    </div>
  ),
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    count: 3,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.DASHBOARD_ICON} size={24} />
    </Badge>
  ),
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    count: 88,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.DASHBOARD_ICON} size={40} />
    </Badge>
  ),
};

// ========================================
// POSITIONS
// ========================================

export const AllPositions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          Top Right
        </p>
        <Badge position="top-right" count={5}>
          <Icon name={ICONS.ANALYTICS_ICON} size={40} />
        </Badge>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>Top Left</p>
        <Badge position="top-left" count={5}>
          <Icon name={ICONS.ANALYTICS_ICON} size={40} />
        </Badge>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          Bottom Right
        </p>
        <Badge position="bottom-right" count={5}>
          <Icon name={ICONS.ANALYTICS_ICON} size={40} />
        </Badge>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          Bottom Left
        </p>
        <Badge position="bottom-left" count={5}>
          <Icon name={ICONS.ANALYTICS_ICON} size={40} />
        </Badge>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>Inline</p>
        <Badge position="inline" count={5} />
      </div>
    </div>
  ),
};

// ========================================
// MAX COUNT
// ========================================

export const MaxCount: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <Badge count={99}>
        <Icon name={ICONS.DASHBOARD_ICON} size={32} />
      </Badge>
      <Badge count={100} max={99}>
        <Icon name={ICONS.DASHBOARD_ICON} size={32} />
      </Badge>
      <Badge count={1000} max={999}>
        <Icon name={ICONS.DASHBOARD_ICON} size={32} />
      </Badge>
    </div>
  ),
};

// ========================================
// DOT BADGES
// ========================================

export const DotBadges: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <Badge type="dot" variant="success" position="bottom-right">
        <Icon name={ICONS.USER_ICON} size={40} />
      </Badge>
      <Badge type="dot" variant="error" position="bottom-right">
        <Icon name={ICONS.USER_ICON} size={40} />
      </Badge>
      <Badge type="dot" variant="warning" position="bottom-right">
        <Icon name={ICONS.USER_ICON} size={40} />
      </Badge>
      <Badge type="dot" variant="neutral" position="bottom-right">
        <Icon name={ICONS.USER_ICON} size={40} />
      </Badge>
    </div>
  ),
};

// ========================================
// PULSE ANIMATION
// ========================================

export const PulseAnimation: Story = {
  args: {
    count: 5,
    pulse: true,
    variant: "error",
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.ANALYTICS_ICON} size={32} />
    </Badge>
  ),
};

export const PulseDot: Story = {
  args: {
    type: "dot",
    pulse: true,
    variant: "success",
    position: "bottom-right",
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.USER_ICON} size={40} />
    </Badge>
  ),
};

// ========================================
// CUSTOM CONTENT
// ========================================

export const CustomContent: Story = {
  args: {
    content: "NEW",
    variant: "error",
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.SETTINGS_ICON} size={32} />
    </Badge>
  ),
};

export const CustomTextContent: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <Badge content="NEW" variant="error" position="inline" />
      <Badge content="HOT" variant="warning" position="inline" />
      <Badge content="!" variant="error" position="inline" />
      <Badge content="★" variant="warning" position="inline" />
    </div>
  ),
};

// ========================================
// SHOW ZERO
// ========================================

export const ShowZero: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          Hidden (default)
        </p>
        <Badge count={0} showZero={false}>
          <Icon name={ICONS.DASHBOARD_ICON} size={32} />
        </Badge>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>Shown</p>
        <Badge count={0} showZero={true}>
          <Icon name={ICONS.DASHBOARD_ICON} size={32} />
        </Badge>
      </div>
    </div>
  ),
};

// ========================================
// REAL-WORLD EXAMPLES
// ========================================

export const EmailInbox: Story = {
  render: () => (
    <Badge count={12} variant="primary" max={99}>
      <Icon name={ICONS.MAIL_ICON} size={32} />
    </Badge>
  ),
};

export const ShoppingCart: Story = {
  render: () => (
    <Badge count={3} variant="error" pulse>
      <Icon name={ICONS.SHOPPING_CART_ICON} size={32} />
    </Badge>
  ),
};

export const NotificationBell: Story = {
  render: () => (
    <Badge count={99} variant="error" pulse max={99}>
      <Icon name={ICONS.BELL_ICON} size={32} />
    </Badge>
  ),
};

export const OnlineStatus: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem" }}>
      <Badge type="dot" variant="success" position="bottom-right">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          👤
        </div>
      </Badge>
      <Badge type="dot" variant="warning" position="bottom-right">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          👤
        </div>
      </Badge>
      <Badge type="dot" variant="neutral" position="bottom-right">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          👤
        </div>
      </Badge>
    </div>
  ),
};

// ========================================
// INTERACTIVE PLAYGROUND
// ========================================

export const Playground: Story = {
  args: {
    count: 5,
    max: 99,
    showZero: false,
    variant: "primary",
    size: "md",
    position: "top-right",
    type: "standard",
    pulse: false,
    invisible: false,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.ANALYTICS_ICON} size={40} />
    </Badge>
  ),
};

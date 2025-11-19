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
    position: BADGE_POSITIONS.INLINE,
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
    type: BADGE_TYPES.DOT,
    variant: BADGE_VARIANTS.SUCCESS,
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
      <Badge
        variant={BADGE_VARIANTS.PRIMARY}
        count={5}
        position={BADGE_POSITIONS.INLINE}
      />
      <Badge
        variant={BADGE_VARIANTS.SECONDARY}
        count={5}
        position={BADGE_POSITIONS.INLINE}
      />
      <Badge
        variant={BADGE_VARIANTS.SUCCESS}
        count={5}
        position={BADGE_POSITIONS.INLINE}
      />
      <Badge
        variant={BADGE_VARIANTS.ERROR}
        count={5}
        position={BADGE_POSITIONS.INLINE}
      />
      <Badge
        variant={BADGE_VARIANTS.WARNING}
        count={5}
        position={BADGE_POSITIONS.INLINE}
      />
      <Badge
        variant={BADGE_VARIANTS.INFO}
        count={5}
        position={BADGE_POSITIONS.INLINE}
      />
      <Badge
        variant={BADGE_VARIANTS.NEUTRAL}
        count={5}
        position={BADGE_POSITIONS.INLINE}
      />
    </div>
  ),
};

export const Primary: Story = {
  args: {
    variant: BADGE_VARIANTS.PRIMARY,
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
    variant: BADGE_VARIANTS.SUCCESS,
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
    variant: BADGE_VARIANTS.ERROR,
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
    variant: BADGE_VARIANTS.WARNING,
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
      <Badge size={BADGE_SIZES.SMALL} count={5}>
        <Icon name={ICONS.ANALYTICS_ICON} size={24} />
      </Badge>
      <Badge size={BADGE_SIZES.MEDIUM} count={5}>
        <Icon name={ICONS.ANALYTICS_ICON} size={32} />
      </Badge>
      <Badge size={BADGE_SIZES.LARGE} count={5}>
        <Icon name={ICONS.ANALYTICS_ICON} size={40} />
      </Badge>
    </div>
  ),
};

export const SmallSize: Story = {
  args: {
    size: BADGE_SIZES.SMALL,
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
    size: BADGE_SIZES.LARGE,
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
        <Badge position={BADGE_POSITIONS.TOP_RIGHT} count={5}>
          <Icon name={ICONS.ANALYTICS_ICON} size={40} />
        </Badge>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>Top Left</p>
        <Badge position={BADGE_POSITIONS.TOP_LEFT} count={5}>
          <Icon name={ICONS.ANALYTICS_ICON} size={40} />
        </Badge>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          Bottom Right
        </p>
        <Badge position={BADGE_POSITIONS.BOTTOM_RIGHT} count={5}>
          <Icon name={ICONS.ANALYTICS_ICON} size={40} />
        </Badge>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>
          Bottom Left
        </p>
        <Badge position={BADGE_POSITIONS.BOTTOM_LEFT} count={5}>
          <Icon name={ICONS.ANALYTICS_ICON} size={40} />
        </Badge>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem" }}>Inline</p>
        <Badge position={BADGE_POSITIONS.INLINE} count={5} />
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
      <Badge
        type={BADGE_TYPES.DOT}
        variant={BADGE_VARIANTS.SUCCESS}
        position={BADGE_POSITIONS.BOTTOM_RIGHT}
      >
        <Icon name={ICONS.USER_ICON} size={40} />
      </Badge>
      <Badge
        type={BADGE_TYPES.DOT}
        variant={BADGE_VARIANTS.ERROR}
        position={BADGE_POSITIONS.BOTTOM_RIGHT}
      >
        <Icon name={ICONS.USER_ICON} size={40} />
      </Badge>
      <Badge
        type={BADGE_TYPES.DOT}
        variant={BADGE_VARIANTS.WARNING}
        position={BADGE_POSITIONS.BOTTOM_RIGHT}
      >
        <Icon name={ICONS.USER_ICON} size={40} />
      </Badge>
      <Badge
        type={BADGE_TYPES.DOT}
        variant={BADGE_VARIANTS.NEUTRAL}
        position={BADGE_POSITIONS.BOTTOM_RIGHT}
      >
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
    variant: BADGE_VARIANTS.ERROR,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.ANALYTICS_ICON} size={32} />
    </Badge>
  ),
};

export const PulseDot: Story = {
  args: {
    type: BADGE_TYPES.DOT,
    pulse: true,
    variant: BADGE_VARIANTS.SUCCESS,
    position: BADGE_POSITIONS.BOTTOM_RIGHT,
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
    variant: BADGE_VARIANTS.ERROR,
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
      <Badge
        content="NEW"
        variant={BADGE_VARIANTS.ERROR}
        position={BADGE_POSITIONS.INLINE}
      />
      <Badge
        content="HOT"
        variant={BADGE_VARIANTS.WARNING}
        position={BADGE_POSITIONS.INLINE}
      />
      <Badge
        content="!"
        variant={BADGE_VARIANTS.ERROR}
        position={BADGE_POSITIONS.INLINE}
      />
      <Badge
        content="★"
        variant={BADGE_VARIANTS.WARNING}
        position={BADGE_POSITIONS.INLINE}
      />
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
    <Badge count={12} variant={BADGE_VARIANTS.PRIMARY} max={99}>
      <Icon name={ICONS.MAIL_ICON} size={32} />
    </Badge>
  ),
};

export const ShoppingCart: Story = {
  render: () => (
    <Badge count={3} variant={BADGE_VARIANTS.ERROR} pulse>
      <Icon name={ICONS.SHOPPING_CART_ICON} size={32} />
    </Badge>
  ),
};

export const NotificationBell: Story = {
  render: () => (
    <Badge count={99} variant={BADGE_VARIANTS.ERROR} pulse max={99}>
      <Icon name={ICONS.BELL_ICON} size={32} />
    </Badge>
  ),
};

export const OnlineStatus: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem" }}>
      <Badge
        type={BADGE_TYPES.DOT}
        variant={BADGE_VARIANTS.SUCCESS}
        position={BADGE_POSITIONS.BOTTOM_RIGHT}
      >
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
      <Badge
        type={BADGE_TYPES.DOT}
        variant={BADGE_VARIANTS.WARNING}
        position={BADGE_POSITIONS.BOTTOM_RIGHT}
      >
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
      <Badge
        type={BADGE_TYPES.DOT}
        variant={BADGE_VARIANTS.NEUTRAL}
        position={BADGE_POSITIONS.BOTTOM_RIGHT}
      >
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
    variant: BADGE_VARIANTS.PRIMARY,
    size: BADGE_SIZES.MEDIUM,
    position: BADGE_POSITIONS.TOP_RIGHT,
    type: BADGE_TYPES.STANDARD,
    pulse: false,
    invisible: false,
  },
  render: (args) => (
    <Badge {...args}>
      <Icon name={ICONS.ANALYTICS_ICON} size={40} />
    </Badge>
  ),
};

import { Meta, StoryObj } from "@storybook/react";

import { Icon, IconProps } from "../src/components/Icon";
import { ICONS } from "../src/assets/iconType";

import { iconSvgMapping as Icons } from "../src/assets";

// Filter out private Thunderbolt icons for public Storybook
const iconNames = Object.keys(Icons).filter(
  (iconName) => !iconName.includes("thunderbolt"),
) as IconProps["name"][];

// Reusable helper component for icon display with label
const IconWithLabel = ({
  iconName,
  size = 32,
  label,
  ...iconProps
}: {
  iconName: IconProps["name"];
  size?: string | number;
  label: string;
} & Partial<IconProps>) => {
  const iconSize = typeof size === "string" ? parseInt(size, 10) : size;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Icon name={iconName} size={iconSize} {...iconProps} />
      <p style={{ fontSize: "0.875rem", color: "#666", textAlign: "center" }}>
        {label}
      </p>
    </div>
  );
};

const meta: Meta<typeof Icon> = {
  title: "Assets/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: iconNames,
    },
    size: {
      control: "number",
    },
    color: {
      control: "color",
    },
    className: {
      control: false,
    },
    style: {
      control: false,
    },
  },
  args: {
    name: iconNames.length > 0 ? iconNames[0] : undefined,
    size: 24,
    color: "#000000",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // inherited from meta.args
  },
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {iconNames.map((name) => (
        <div
          key={name as string}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "2rem",
            padding: "2rem",
            maxWidth: "600px",
          }}
        >
          <IconWithLabel
            iconName={name}
            size={32}
            label={name.replace(/_/g, " ") as string}
          />
        </div>
      ))}
    </div>
  ),
  args: {
    size: 32,
    color: "#1e90ff",
  },
};

// ========================================
// DIFFERENT SIZES
// ========================================

export const IconSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Mail Icon - Different Sizes</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Icon name={ICONS.MAIL_ICON} size={16} />
          <Icon name={ICONS.MAIL_ICON} size={24} />
          <Icon name={ICONS.MAIL_ICON} size={32} />
          <Icon name={ICONS.MAIL_ICON} size={48} />
          <Icon name={ICONS.MAIL_ICON} size={64} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Bell Icon - Different Sizes</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Icon name={ICONS.BELL_ICON} size={16} />
          <Icon name={ICONS.BELL_ICON} size={24} />
          <Icon name={ICONS.BELL_ICON} size={32} />
          <Icon name={ICONS.BELL_ICON} size={48} />
          <Icon name={ICONS.BELL_ICON} size={64} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>
          Shopping Cart - Different Sizes
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Icon name={ICONS.SHOPPING_CART_ICON} size={16} />
          <Icon name={ICONS.SHOPPING_CART_ICON} size={24} />
          <Icon name={ICONS.SHOPPING_CART_ICON} size={32} />
          <Icon name={ICONS.SHOPPING_CART_ICON} size={48} />
          <Icon name={ICONS.SHOPPING_CART_ICON} size={64} />
        </div>
      </div>
    </div>
  ),
};

// ========================================
// WITH COLORS
// ========================================

export const ColoredIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Icon name={ICONS.MAIL_ICON} size={32} style={{ color: "#3b82f6" }} />
        <Icon name={ICONS.BELL_ICON} size={32} style={{ color: "#ef4444" }} />
        <Icon
          name={ICONS.SHOPPING_CART_ICON}
          size={32}
          style={{ color: "#10b981" }}
        />
        <Icon
          name={ICONS.MAIL_OPEN_ICON}
          size={32}
          style={{ color: "#f59e0b" }}
        />
      </div>
    </div>
  ),
};

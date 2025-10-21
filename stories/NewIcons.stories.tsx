import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../src/components/Icon";
import { ICONS } from "../src/assets/iconType";

const meta: Meta<typeof Icon> = {
  title: "Components/Icons/New Icons",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

// ========================================
// EMAIL ICONS
// ========================================

export const MailClosed: Story = {
  args: {
    name: ICONS.MAIL_ICON,
    size: 32,
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Icon {...args} />
      <p style={{ fontSize: "0.875rem", color: "#666" }}>Mail (Closed)</p>
    </div>
  ),
};

export const MailOpen: Story = {
  args: {
    name: ICONS.MAIL_OPEN_ICON,
    size: 32,
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Icon {...args} />
      <p style={{ fontSize: "0.875rem", color: "#666" }}>Mail (Open)</p>
    </div>
  ),
};

// ========================================
// NOTIFICATION & SHOPPING ICONS
// ========================================

export const NotificationBell: Story = {
  args: {
    name: ICONS.BELL_ICON,
    size: 32,
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Icon {...args} />
      <p style={{ fontSize: "0.875rem", color: "#666" }}>Notification Bell</p>
    </div>
  ),
};

export const ShoppingCart: Story = {
  args: {
    name: ICONS.SHOPPING_CART_ICON,
    size: 32,
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Icon {...args} />
      <p style={{ fontSize: "0.875rem", color: "#666" }}>Shopping Cart</p>
    </div>
  ),
};

// ========================================
// ALL NEW ICONS SHOWCASE
// ========================================

export const AllNewIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: "2rem",
        padding: "2rem",
        maxWidth: "600px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Icon name={ICONS.MAIL_ICON} size={32} />
        <p style={{ fontSize: "0.875rem", color: "#666", textAlign: "center" }}>
          Mail
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Icon name={ICONS.MAIL_OPEN_ICON} size={32} />
        <p style={{ fontSize: "0.875rem", color: "#666", textAlign: "center" }}>
          Mail Open
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Icon name={ICONS.BELL_ICON} size={32} />
        <p style={{ fontSize: "0.875rem", color: "#666", textAlign: "center" }}>
          Bell
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Icon name={ICONS.SHOPPING_CART_ICON} size={32} />
        <p style={{ fontSize: "0.875rem", color: "#666", textAlign: "center" }}>
          Shopping Cart
        </p>
      </div>
    </div>
  ),
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

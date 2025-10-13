import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../src/components/Header";
import { HamburgerMenuItem } from "../src/components/Header/Header.types";
import { ICONS } from "@assets/iconType";

const meta: Meta<typeof Header> = {
  title: "components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "minimal", "compact"],
    },
    position: {
      control: { type: "select" },
      options: ["static", "sticky", "fixed"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Custom hamburger menu items for different scenarios
const customMenuItems: HamburgerMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ICONS.CALENDAR_ICON,
    onClick: () => console.log("Dashboard clicked"),
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: ICONS.SEARCH_ICON,
    onClick: () => console.log("Analytics clicked"),
  },
  {
    id: "team",
    label: "Team Management",
    icon: ICONS.USER_ICON,
    onClick: () => console.log("Team clicked"),
  },
  {
    id: "divider1",
    label: "",
    divider: true,
  },
  {
    id: "settings",
    label: "Settings",
    icon: ICONS.SETTINGS_ICON,
    onClick: () => console.log("Settings clicked"),
  },
  {
    id: "help",
    label: "Help & Support",
    onClick: () => console.log("Help clicked"),
  },
  {
    id: "divider2",
    label: "",
    divider: true,
  },
  {
    id: "logout",
    label: "Sign Out",
    onClick: () => console.log("Logout clicked"),
  },
];

const adminMenuItems: HamburgerMenuItem[] = [
  {
    id: "users",
    label: "User Management",
    icon: ICONS.USER_ICON,
    onClick: () => console.log("Users clicked"),
  },
  {
    id: "system",
    label: "System Settings",
    icon: ICONS.SETTINGS_ICON,
    onClick: () => console.log("System clicked"),
  },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: ICONS.EYE_ICON,
    onClick: () => console.log("Monitoring clicked"),
  },
  {
    id: "disabled-feature",
    label: "Disabled Feature",
    icon: ICONS.CLOSE_ICON,
    onClick: () => console.log("This should not fire"),
    disabled: true,
  },
  {
    id: "divider",
    label: "",
    divider: true,
  },
  {
    id: "logout",
    label: "Logout",
    onClick: () => console.log("Admin logout"),
  },
];

export const LoggedOut: Story = {
  args: {
    brandName: "Quick UI",
    onLogin: () => console.log("Login clicked"),
    onCreateAccount: () => console.log("Create account clicked"),
  },
};

export const LoggedInDefault: Story = {
  args: {
    brandName: "Quick UI",
    user: {
      name: "Jane Doe",
      email: "jane@example.com",
    },
    onLogout: () => console.log("Logout clicked"),
    onProfileClick: () => console.log("Profile clicked"),
  },
};

export const LoggedInWithAvatar: Story = {
  args: {
    brandName: "Quick UI",
    user: {
      name: "John Smith",
      email: "john@example.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format",
    },
    onLogout: () => console.log("Logout clicked"),
    onProfileClick: () => console.log("Profile clicked"),
  },
};

export const CustomHamburgerMenu: Story = {
  args: {
    brandName: "Quick UI",
    user: {
      name: "Jane Doe",
      email: "jane@example.com",
    },
    hamburgerMenuItems: customMenuItems,
    onLogout: () => console.log("Logout clicked"),
  },
};

export const AdminHamburgerMenu: Story = {
  args: {
    brandName: "Admin Panel",
    user: {
      name: "Admin User",
      email: "admin@example.com",
      role: "Administrator",
    },
    hamburgerMenuItems: adminMenuItems,
    onLogout: () => console.log("Admin logout clicked"),
  },
};

export const WithLogo: Story = {
  args: {
    logo: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#0066cc" />
        <path d="M8 16h16m-8-8v16" stroke="white" strokeWidth="2" />
      </svg>
    ),
    brandName: "Quick UI",
    user: {
      name: "Jane Doe",
    },
    hamburgerMenuItems: customMenuItems,
  },
};

export const MinimalVariant: Story = {
  args: {
    variant: "minimal",
    brandName: "Quick UI",
    user: {
      name: "Jane Doe",
    },
    showAuth: false,
    hamburgerMenuItems: [
      {
        id: "about",
        label: "About",
        onClick: () => console.log("About clicked"),
      },
      {
        id: "contact",
        label: "Contact",
        onClick: () => console.log("Contact clicked"),
      },
    ],
  },
};

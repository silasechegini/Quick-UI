import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Input } from "../src/components/Input";
import { ICONS } from "@assets/iconType";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "success"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "s", "m", "l", "xl"],
    },
    startIcon: {
      control: { type: "select" },
      options: ["", ICONS.SEARCH_ICON, ICONS.USER_ICON, ICONS.CALENDAR_ICON],
    },
    endIcon: {
      control: { type: "select" },
      options: ["", ICONS.SEARCH_ICON, ICONS.CLEAR_ICON, ICONS.EYE_ICON],
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email...",
    type: "email",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
    helperText: "Must be at least 8 characters long",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username...",
    error: true,
    errorMessage: "This username is already taken",
    value: "invalid-user",
  },
};

export const SuccessState: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username...",
    variant: "success",
    value: "valid-user",
  },
};

export const WithStartIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search for anything...",
    startIcon: ICONS.SEARCH_ICON,
  },
};

export const WithEndIcon: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
    endIcon: ICONS.EYE_ICON,
  },
};

export const Loading: Story = {
  args: {
    label: "Processing...",
    placeholder: "Please wait...",
    loading: true,
    value: "Processing your request",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This is disabled...",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    placeholder: "This takes full width...",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
      }}
    >
      <Input size="xs" placeholder="Extra Small (xs)" />
      <Input size="s" placeholder="Small (s)" />
      <Input size="m" placeholder="Medium (m)" />
      <Input size="l" placeholder="Large (l)" />
      <Input size="xl" placeholder="Extra Large (xl)" />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
      }}
    >
      <Input variant="primary" placeholder="Primary variant" />
      <Input variant="secondary" placeholder="Secondary variant" />
      <Input variant="error" placeholder="Error variant" />
      <Input variant="success" placeholder="Success variant" />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const SearchExample: Story = {
  args: {
    label: "Search Products",
    placeholder: "Search for products...",
    startIcon: ICONS.SEARCH_ICON,
    endIcon: ICONS.CLEAR_ICON,
    helperText: "Search across all categories",
  },
};

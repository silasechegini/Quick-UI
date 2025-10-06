import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Input } from "../src/components/Input";

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
      options: ["", "search_icon", "user_icon", "calendar_icon"],
    },
    endIcon: {
      control: { type: "select" },
      options: ["", "search_icon", "clear_icon", "eye_icon"],
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
    startIcon: "search_icon",
  },
};

export const WithEndIcon: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
    endIcon: "eye_icon",
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
    startIcon: "search_icon",
    endIcon: "clear_icon",
    helperText: "Search across all categories",
  },
};

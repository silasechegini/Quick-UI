import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
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

export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState("Sample text to clear");

    return (
      <div style={{ width: "300px" }}>
        <Input
          label="Input with Clear Button"
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clearable
          onClear={() => console.log("Clear button clicked!")}
          helperText="Clear button appears when you have text"
        />
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

export const ClearButtonSizes: Story = {
  render: () => {
    const [values, setValues] = useState({
      xs: "Extra Small",
      s: "Small",
      m: "Medium",
      l: "Large",
      xl: "Extra Large",
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "400px",
        }}
      >
        <Input
          size="xs"
          placeholder="Extra Small with clear"
          value={values.xs}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, xs: e.target.value }))
          }
          clearable
          startIcon="search_icon"
        />
        <Input
          size="s"
          placeholder="Small with clear"
          value={values.s}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, s: e.target.value }))
          }
          clearable
          startIcon="search_icon"
        />
        <Input
          size="m"
          placeholder="Medium with clear"
          value={values.m}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, m: e.target.value }))
          }
          clearable
          startIcon="search_icon"
        />
        <Input
          size="l"
          placeholder="Large with clear"
          value={values.l}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, l: e.target.value }))
          }
          clearable
          startIcon="search_icon"
        />
        <Input
          size="xl"
          placeholder="Extra Large with clear"
          value={values.xl}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, xl: e.target.value }))
          }
          clearable
          startIcon="search_icon"
        />
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

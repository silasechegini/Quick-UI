import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "../src/components/Page";

const meta: Meta<typeof Page> = {
  title: "Components/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "centered", "fullwidth", "sidebar"],
    },
    spacing: {
      control: { type: "select" },
      options: ["compact", "normal", "spacious"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Default Page Layout",
    description: "A standard page layout with header and centered content",
    children: "Page content goes here",
    header: {
      show: true,
      brandName: "Quick UI",
      onLogin: () => console.log("Login clicked"),
      onLogout: () => console.log("Logout clicked"),
    },
  },
};

export const Centered: Story = {
  args: {
    variant: "centered",
    title: "Centered Layout",
    description:
      "Content is centered with a maximum width for better readability",
    children: "This content is centered on the page",
    header: {
      show: true,
      brandName: "Quick UI",
    },
  },
};

export const FullWidth: Story = {
  args: {
    variant: "fullwidth",
    title: "Full Width Layout",
    description: "Content spans the full width of the container",
    children: "This content spans the full width",
    header: {
      show: true,
      brandName: "Quick UI",
    },
  },
};

export const LoadingState: Story = {
  args: {
    title: "Loading Page",
    description: "Demonstrates the loading state",
    children: "Content will appear when loaded",
    isLoading: true,
    header: {
      show: true,
      brandName: "Quick UI",
    },
  },
};

export const ErrorState: Story = {
  args: {
    title: "Error Page",
    description: "Demonstrates the error state",
    children: "This content will not show due to error",
    error: "Failed to load page content. Please try again later.",
    header: {
      show: true,
      brandName: "Quick UI",
    },
  },
};

export const WithoutHeader: Story = {
  args: {
    title: "Page Without Header",
    description: "Sometimes you might want a page without the header",
    children: "This page has no header",
    header: {
      show: false,
    },
  },
};

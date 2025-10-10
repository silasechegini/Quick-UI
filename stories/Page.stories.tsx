import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { Page } from "../src/components/Page";
import { HamburgerMenuItem } from "../src/components/Header/Header.types";

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

// Sample hamburger menu items
const sampleMenuItems: HamburgerMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "calendar_icon",
    onClick: () => console.log("Dashboard clicked"),
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings_icon",
    onClick: () => console.log("Settings clicked"),
  },
  {
    id: "divider",
    label: "",
    divider: true,
  },
  {
    id: "logout",
    label: "Sign Out",
    onClick: () => console.log("Logout clicked"),
  },
];

// Sample content component
const SampleContent = () => (
  <div>
    <h2>Welcome to Quick UI</h2>
    <p>
      This is a sample page content area. You can put any React components or
      content here. The page component provides a flexible layout system with
      different variants and spacing options.
    </p>
    <div style={{ marginTop: "32px" }}>
      <h3>Features</h3>
      <ul>
        <li>Configurable header with hamburger menu</li>
        <li>
          Multiple layout variants (default, centered, fullwidth, sidebar)
        </li>
        <li>Flexible spacing options</li>
        <li>Built-in loading and error states</li>
        <li>Responsive design</li>
        <li>Collapsible sidebar support</li>
      </ul>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    title: "Default Page Layout",
    description: "A standard page layout with header and centered content",
    children: <SampleContent />,
    header: {
      show: true,
      brandName: "Quick UI",
      user: {
        name: "Jane Doe",
        email: "jane@example.com",
      },
      hamburgerMenuItems: sampleMenuItems,
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
    children: <SampleContent />,
    header: {
      show: true,
      brandName: "Quick UI",
      hamburgerMenuItems: sampleMenuItems,
    },
  },
};

export const FullWidth: Story = {
  args: {
    variant: "fullwidth",
    title: "Full Width Layout",
    description: "Content spans the full width of the container",
    children: <SampleContent />,
    header: {
      show: true,
      brandName: "Quick UI",
      hamburgerMenuItems: sampleMenuItems,
    },
  },
};

export const WithSidebar: Story = {
  args: {
    variant: "sidebar",
    title: "Sidebar Layout",
    description: "Layout with a collapsible sidebar",
    children: <SampleContent />,
    header: {
      show: true,
      brandName: "Quick UI",
      hamburgerMenuItems: sampleMenuItems,
    },
    sidebar: {
      position: "left",
      width: "280px",
      collapsible: true,
      content: (
        <div>
          <h3>Navigation</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ padding: "8px 0" }}>
              <a href="#" style={{ textDecoration: "none", color: "#333" }}>
                Home
              </a>
            </li>
            <li style={{ padding: "8px 0" }}>
              <a href="#" style={{ textDecoration: "none", color: "#333" }}>
                Products
              </a>
            </li>
            <li style={{ padding: "8px 0" }}>
              <a href="#" style={{ textDecoration: "none", color: "#333" }}>
                Services
              </a>
            </li>
            <li style={{ padding: "8px 0" }}>
              <a href="#" style={{ textDecoration: "none", color: "#333" }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      ),
    },
  },
};

export const WithRightSidebar: Story = {
  args: {
    variant: "sidebar",
    title: "Right Sidebar Layout",
    description: "Layout with sidebar positioned on the right",
    children: <SampleContent />,
    header: {
      show: true,
      brandName: "Quick UI",
      hamburgerMenuItems: sampleMenuItems,
    },
    sidebar: {
      position: "right",
      width: "320px",
      collapsible: true,
      content: (
        <div>
          <h3>Recent Activity</h3>
          <div style={{ fontSize: "14px", color: "#666" }}>
            <p>User logged in</p>
            <p>Settings updated</p>
            <p>New message received</p>
          </div>
        </div>
      ),
    },
  },
};

export const LoadingState: Story = {
  args: {
    title: "Loading Page",
    description: "Demonstrates the loading state",
    children: <SampleContent />,
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
    children: <SampleContent />,
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
    children: <SampleContent />,
    header: {
      show: false,
    },
  },
};

export const WithFooter: Story = {
  args: {
    title: "Page With Footer",
    description: "Example of a page with footer content",
    children: <SampleContent />,
    header: {
      show: true,
      brandName: "Quick UI",
      hamburgerMenuItems: sampleMenuItems,
    },
    footer: (
      <div>
        <p>&copy; 2025 Quick UI. All rights reserved.</p>
        <div style={{ marginTop: "8px" }}>
          <a href="#" style={{ margin: "0 8px", color: "#666" }}>
            Privacy
          </a>
          <a href="#" style={{ margin: "0 8px", color: "#666" }}>
            Terms
          </a>
          <a href="#" style={{ margin: "0 8px", color: "#666" }}>
            Support
          </a>
        </div>
      </div>
    ),
  },
};

export const SpacingVariants: Story = {
  args: {
    spacing: "spacious",
    title: "Spacious Layout",
    description: "Example with spacious padding",
    children: <SampleContent />,
    header: {
      show: true,
      brandName: "Quick UI",
    },
  },
};

// Interaction test
export const InteractiveTest: Story = {
  args: {
    variant: "sidebar",
    title: "Interactive Test",
    description: "Test page interactions",
    children: <SampleContent />,
    header: {
      show: true,
      brandName: "Quick UI",
      hamburgerMenuItems: sampleMenuItems,
    },
    sidebar: {
      position: "left",
      width: "280px",
      collapsible: true,
      content: (
        <div>
          <h3>Sidebar Content</h3>
          <p>This sidebar can be collapsed.</p>
        </div>
      ),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that page loads
    await expect(canvas.getByTestId("page")).toBeInTheDocument();
    await expect(canvas.getByText("Interactive Test")).toBeInTheDocument();

    // Test sidebar toggle if present
    const sidebarToggle = canvas.queryByLabelText("Collapse sidebar");
    if (sidebarToggle) {
      await userEvent.click(sidebarToggle);
      await expect(canvas.getByLabelText("Expand sidebar")).toBeInTheDocument();
    }
  },
};

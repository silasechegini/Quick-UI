import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Toggle } from "../src/components/Toggle";
import { useState } from "react";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toggle component that provides an on/off switch interface. Supports multiple sizes, controlled/uncontrolled modes, and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "The size of the toggle",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether the toggle is checked (controlled mode)",
    },
    defaultChecked: {
      control: { type: "boolean" },
      description: "Default checked state (uncontrolled mode)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the toggle is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: { type: "text" },
      description: "Label text for the toggle",
    },
    description: {
      control: { type: "text" },
      description: "Description text shown below the label",
    },
    error: {
      control: { type: "boolean" },
      description: "Whether there's an error state",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    errorMessage: {
      control: { type: "text" },
      description: "Error message to display",
    },
    onChange: {
      action: "changed",
      description: "Callback function called when the toggle state changes",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: "Toggle option",
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toggle size="small" label="Small toggle" />
      <Toggle size="medium" label="Medium toggle" />
      <Toggle size="large" label="Large toggle" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toggle component supports three different sizes: small, medium (default), and large.",
      },
    },
  },
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toggle label="Unchecked toggle" checked={false} />
      <Toggle label="Checked toggle" checked={true} />
      <Toggle label="Disabled unchecked" disabled checked={false} />
      <Toggle label="Disabled checked" disabled checked={true} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toggle component supports different states: unchecked, checked, disabled unchecked, and disabled checked.",
      },
    },
  },
};

// With descriptions
export const WithDescription: Story = {
  args: {
    label: "Enable notifications",
    description: "Receive email notifications when someone mentions you",
  },
};

// Error state
export const ErrorState: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toggle
        label="Accept terms"
        description="You must accept the terms and conditions"
        error={true}
        errorMessage="Please accept the terms to continue"
      />
      <Toggle
        label="Enable feature"
        error={true}
        errorMessage="This feature is currently unavailable"
        disabled
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toggle component can display error states with custom error messages.",
      },
    },
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    "aria-label": "Toggle setting",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Toggle can be used without a visible label, but should include aria-label for accessibility.",
      },
    },
  },
};

// Controlled vs Uncontrolled
export const ControlledVsUncontrolled: Story = {
  render: () => {
    const [controlled, setControlled] = useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Toggle
          label="Controlled toggle"
          description="This toggle's state is controlled by React state"
          checked={controlled}
          onChange={(checked) => setControlled(checked)}
        />
        <Toggle
          label="Uncontrolled toggle"
          description="This toggle manages its own state internally"
          defaultChecked={false}
        />
        <button onClick={() => setControlled(!controlled)}>
          Toggle controlled programmatically
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Toggle component supports both controlled (with checked prop) and uncontrolled (with defaultChecked prop) modes.",
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    size: "medium",
    label: "Toggle option",
    description: "This is a description",
    checked: false,
    disabled: false,
    error: false,
    errorMessage: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test different combinations of props.",
      },
    },
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      notifications: true,
      marketing: false,
      analytics: true,
    });

    const handleToggleChange = (key: string) => (checked: boolean) => {
      setFormData((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0" }}>Preferences</h3>

        <Toggle
          label="Email notifications"
          description="Receive notifications about account activity"
          checked={formData.notifications}
          onChange={handleToggleChange("notifications")}
        />

        <Toggle
          label="Marketing emails"
          description="Receive promotional emails and updates"
          checked={formData.marketing}
          onChange={handleToggleChange("marketing")}
        />

        <Toggle
          label="Analytics tracking"
          description="Help us improve by sharing anonymous usage data"
          checked={formData.analytics}
          onChange={handleToggleChange("analytics")}
        />

        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          <strong>Form State:</strong>
          <pre style={{ margin: "0.5rem 0 0 0", fontSize: "0.875rem" }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example of using Toggle components in a form with state management.",
      },
    },
  },
};

// Accessibility example
export const AccessibilityFeatures: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toggle
        label="Keyboard accessible"
        description="Try using Tab to focus and Space/Enter to toggle"
      />
      <Toggle
        label="Screen reader friendly"
        description="Includes proper ARIA attributes and semantic markup"
        error={true}
        errorMessage="This demonstrates error announcement"
      />
      <Toggle
        label="Focus visible"
        description="Shows clear focus indicators for keyboard navigation"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toggle component includes comprehensive accessibility features including keyboard navigation, ARIA attributes, and screen reader support.",
      },
    },
  },
};

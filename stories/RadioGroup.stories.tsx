import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup } from "../src/components";
import { RadioOption } from "../src/components/Radio/Radio.type";
import { ICONS } from "../src/assets/iconType";
import Icon from "../src/components/Icon/Icon";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A RadioGroup component that allows users to select a single option from multiple choices.
Supports both controlled and uncontrolled patterns, with accessibility features and error handling.
        `.trim(),
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description: "Name attribute for the radio group",
    },
    value: {
      control: "text",
      description: "Controlled value (makes component controlled)",
    },
    defaultValue: {
      control: "text",
      description: "Default selected value (for uncontrolled usage)",
    },
    radioItems: {
      control: "object",
      description: "Array of radio options",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when selection changes",
    },
    disabled: {
      control: "boolean",
      description: "Disable the entire radio group",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    description: {
      control: "text",
      description: "Descriptive text for the radio group",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// Basic radio options
const basicOptions: RadioOption[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

// Options with descriptions
const optionsWithDescriptions: RadioOption[] = [
  {
    label: "Free Plan",
    value: "free",
    description: "Perfect for personal projects and small teams",
  },
  {
    label: "Pro Plan",
    value: "pro",
    description: "Advanced features for growing businesses",
  },
  {
    label: "Enterprise Plan",
    value: "enterprise",
    description: "Custom solutions for large organizations",
  },
];

// Options with icons
const optionsWithIcons: RadioOption[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <Icon name={ICONS.DASHBOARD_ICON} size="small" />,
  },
  {
    label: "Analytics",
    value: "analytics",
    icon: <Icon name={ICONS.ANALYTICS_ICON} size="small" />,
  },
  {
    label: "Teams",
    value: "teams",
    icon: <Icon name={ICONS.TEAMS_ICON} size="small" />,
  },
];

// Mixed state options
const mixedOptions: RadioOption[] = [
  { label: "Available Option", value: "available" },
  {
    label: "Disabled Option",
    value: "disabled",
    disabled: true,
    description: "This option is currently unavailable",
  },
  { label: "Another Available Option", value: "available2" },
  {
    label: "Another Disabled Option",
    value: "disabled2",
    disabled: true,
  },
];

export const Default: Story = {
  args: {
    name: "default-radio-group",
    radioItems: basicOptions,
    defaultValue: "option1",
  },
};

export const WithDescription: Story = {
  args: {
    name: "described-radio-group",
    radioItems: basicOptions,
    description: "Please select your preferred option from the choices below:",
    defaultValue: "option2",
  },
};

export const WithDetailedOptions: Story = {
  args: {
    name: "detailed-radio-group",
    radioItems: optionsWithDescriptions,
    description: "Choose the plan that best fits your needs:",
    defaultValue: "pro",
  },
};

export const WithIcons: Story = {
  args: {
    name: "icon-radio-group",
    radioItems: optionsWithIcons,
    description: "Select your preferred view:",
    defaultValue: "dashboard",
  },
};

export const WithError: Story = {
  args: {
    name: "error-radio-group",
    radioItems: basicOptions,
    error: "Please select an option to continue",
    description: "This field is required:",
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled-radio-group",
    radioItems: basicOptions,
    disabled: true,
    defaultValue: "option2",
    description: "This radio group is disabled:",
  },
};

export const MixedStates: Story = {
  args: {
    name: "mixed-radio-group",
    radioItems: mixedOptions,
    description: "Some options may be disabled:",
    defaultValue: "available",
  },
};

export const NumberValues: Story = {
  args: {
    name: "number-radio-group",
    radioItems: [
      { label: "Small (1-10)", value: 1 },
      { label: "Medium (11-50)", value: 2 },
      { label: "Large (51-100)", value: 3 },
      { label: "Enterprise (100+)", value: 4 },
    ],
    description: "Select your team size:",
    defaultValue: 2,
  },
};

// Interactive controlled example
export const ControlledExample: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string | number>("pro");
    const [showError, setShowError] = useState(false);

    const handleChange = (value: string | number) => {
      setSelectedValue(value);
      setShowError(false);
    };

    const handleSubmit = () => {
      if (!selectedValue) {
        setShowError(true);
      } else {
        alert(`Selected plan: ${selectedValue}`);
      }
    };

    return (
      <div>
        <RadioGroup
          name="controlled-radio-group"
          value={selectedValue}
          radioItems={optionsWithDescriptions}
          onChange={handleChange}
          description="Select a subscription plan:"
          error={showError ? "Please select a plan" : undefined}
        />
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
          <button
            onClick={() => setSelectedValue("")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
          >
            Clear Selection
          </button>
        </div>
        <p style={{ marginTop: "1rem", color: "#6c757d" }}>
          Current selection: <strong>{selectedValue || "None"}</strong>
        </p>
      </div>
    );
  },
};

// Multiple radio groups example
export const MultipleGroups: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      theme: "light",
      notifications: "email",
      privacy: "friends",
    });

    const handlePreferenceChange = (key: string, value: string | number) => {
      setPreferences((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <RadioGroup
          name="theme-preference"
          value={preferences.theme}
          radioItems={[
            { label: "Light Theme", value: "light" },
            { label: "Dark Theme", value: "dark" },
            { label: "System Default", value: "system" },
          ]}
          onChange={(value) => handlePreferenceChange("theme", value)}
          description="Choose your preferred theme:"
        />

        <RadioGroup
          name="notification-preference"
          value={preferences.notifications}
          radioItems={[
            {
              label: "Email Notifications",
              value: "email",
              description: "Receive updates via email",
            },
            {
              label: "Push Notifications",
              value: "push",
              description: "Receive browser notifications",
            },
            {
              label: "No Notifications",
              value: "none",
              description: "Turn off all notifications",
            },
          ]}
          onChange={(value) => handlePreferenceChange("notifications", value)}
          description="How would you like to receive notifications?"
        />

        <RadioGroup
          name="privacy-preference"
          value={preferences.privacy}
          radioItems={[
            { label: "Public", value: "public" },
            { label: "Friends Only", value: "friends" },
            { label: "Private", value: "private" },
          ]}
          onChange={(value) => handlePreferenceChange("privacy", value)}
          description="Who can see your profile?"
        />

        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            marginTop: "1rem",
          }}
        >
          <h4>Current Preferences:</h4>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(preferences, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const LongList: Story = {
  args: {
    name: "long-radio-group",
    radioItems: [
      { label: "Afghanistan", value: "AF" },
      { label: "Albania", value: "AL" },
      { label: "Algeria", value: "DZ" },
      { label: "Argentina", value: "AR" },
      { label: "Australia", value: "AU" },
      { label: "Austria", value: "AT" },
      { label: "Belgium", value: "BE" },
      { label: "Brazil", value: "BR" },
      { label: "Canada", value: "CA" },
      { label: "China", value: "CN" },
      { label: "Denmark", value: "DK" },
      { label: "Egypt", value: "EG" },
      { label: "France", value: "FR" },
      { label: "Germany", value: "DE" },
      { label: "India", value: "IN" },
      { label: "Japan", value: "JP" },
      { label: "United Kingdom", value: "GB" },
      { label: "United States", value: "US" },
    ],
    description: "Select your country:",
    defaultValue: "US",
  },
};

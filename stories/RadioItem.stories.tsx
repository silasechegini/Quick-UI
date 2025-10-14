import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { useState } from "react";
import { RadioItem } from "../src/components/Radio";

const meta: Meta<typeof RadioItem> = {
  title: "Components/RadioItem",
  component: RadioItem,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable radio button component with support for labels, descriptions, error states, and disabled state.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The label text or content for the radio button",
    },
    value: {
      control: "text",
      description: "The value of the radio button",
    },
    name: {
      control: "text",
      description: "The name attribute for grouping radio buttons",
    },
    checked: {
      control: "boolean",
      description: "Whether the radio button is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio button is disabled",
    },
    description: {
      control: "text",
      description: "Additional description text shown below the label",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
    },
    labelClassName: {
      control: "text",
      description: "Additional CSS classes for the label",
    },
    inputClassName: {
      control: "text",
      description: "Additional CSS classes for the input element",
    },
    onChange: {
      action: "changed",
      description: "Callback function when the radio button state changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story
export const Default: Story = {
  args: {
    label: "Option 1",
    value: "option1",
    name: "default-radio",
    onChange: fn(),
  },
};

// Checked state
export const Checked: Story = {
  args: {
    label: "Selected Option",
    value: "selected",
    name: "checked-radio",
    checked: true,
    onChange: fn(),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Disabled Option",
    value: "disabled",
    name: "disabled-radio",
    disabled: true,
    onChange: fn(),
  },
};

// Disabled and Checked
export const DisabledChecked: Story = {
  args: {
    label: "Disabled Selected",
    value: "disabled-checked",
    name: "disabled-checked-radio",
    checked: true,
    disabled: true,
    onChange: fn(),
  },
};

// With description
export const WithDescription: Story = {
  args: {
    label: "Option with Description",
    value: "with-desc",
    name: "desc-radio",
    description:
      "This is additional information about this option to help users understand what it does.",
    onChange: fn(),
  },
};

// With error
export const WithError: Story = {
  args: {
    label: "Option with Error",
    value: "with-error",
    name: "error-radio",
    error: "This option has an error message",
    onChange: fn(),
  },
};

// Long label
export const LongLabel: Story = {
  args: {
    label:
      "This is a very long label that demonstrates how the radio button component handles longer text content and wrapping",
    value: "long-label",
    name: "long-label-radio",
    description:
      "Even with a long label, the description should still be properly aligned and readable.",
    onChange: fn(),
  },
};

// Interactive group example
export const InteractiveGroup: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string>("react");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          minWidth: "300px",
        }}
      >
        <h3
          style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600" }}
        >
          Choose your favorite framework:
        </h3>
        <RadioItem
          label="React"
          value="react"
          name="framework"
          checked={selectedValue === "react"}
          description="A JavaScript library for building user interfaces"
          onChange={handleChange}
        />
        <RadioItem
          label="Vue.js"
          value="vue"
          name="framework"
          checked={selectedValue === "vue"}
          description="The progressive JavaScript framework"
          onChange={handleChange}
        />
        <RadioItem
          label="Angular"
          value="angular"
          name="framework"
          checked={selectedValue === "angular"}
          description="Platform for building mobile and desktop web applications"
          onChange={handleChange}
        />
        <RadioItem
          label="Svelte"
          value="svelte"
          name="framework"
          checked={selectedValue === "svelte"}
          description="Cybernetically enhanced web apps"
          onChange={handleChange}
        />
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          Selected: <strong>{selectedValue}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "An interactive example showing multiple RadioItem components working together as a group. Click different options to see the selection change.",
      },
    },
  },
};

// Mixed states group
export const MixedStatesGroup: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: "300px",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600" }}>
        Various States Demo:
      </h3>
      <RadioItem
        label="Normal Option"
        value="normal"
        name="mixed-states"
        description="This is a normal radio button option"
        onChange={fn()}
      />
      <RadioItem
        label="Checked Option"
        value="checked"
        name="mixed-states"
        checked={true}
        description="This option is currently selected"
        onChange={fn()}
      />
      <RadioItem
        label="Disabled Option"
        value="disabled"
        name="mixed-states"
        disabled={true}
        description="This option is disabled and cannot be selected"
        onChange={fn()}
      />
      <RadioItem
        label="Error Option"
        value="error"
        name="mixed-states"
        error="Something went wrong with this option"
        onChange={fn()}
      />
      <RadioItem
        label="Disabled & Checked"
        value="disabled-checked"
        name="mixed-states"
        checked={true}
        disabled={true}
        description="This option is both selected and disabled"
        onChange={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A demonstration of all possible states: normal, checked, disabled, error, and combinations thereof.",
      },
    },
  },
};

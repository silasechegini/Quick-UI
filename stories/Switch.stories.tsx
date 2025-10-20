import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../src/components/Switch";
import { ICONS } from "../src/assets/iconType";
import {
  SWITCH_LABEL_POSITIONS,
  SWITCH_SIZES,
  SWITCH_VARIANTS,
} from "@components/Switch/Switch.types";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the switch",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "danger"],
      description: "Color variant of the switch",
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state (uncontrolled)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    label: {
      control: "text",
      description: "Label text for the switch",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the label",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Enable notifications",
    defaultChecked: false,
  },
};

export const WithLabelLeft: Story = {
  args: {
    label: "Dark mode",
    labelPosition: SWITCH_LABEL_POSITIONS.LEFT,
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Switch size={SWITCH_SIZES.SMALL} label="Small" defaultChecked />
      <Switch size={SWITCH_SIZES.MEDIUM} label="Medium" defaultChecked />
      <Switch size={SWITCH_SIZES.LARGE} label="Large" defaultChecked />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Switch
        variant={SWITCH_VARIANTS.PRIMARY}
        label="Primary"
        defaultChecked
      />
      <Switch
        variant={SWITCH_VARIANTS.SECONDARY}
        label="Secondary"
        defaultChecked
      />
      <Switch
        variant={SWITCH_VARIANTS.SUCCESS}
        label="Success"
        defaultChecked
      />
      <Switch variant={SWITCH_VARIANTS.DANGER} label="Danger" defaultChecked />
    </div>
  ),
};

export const AllVariantsUnchecked: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Switch
        variant={SWITCH_VARIANTS.PRIMARY}
        label="Primary"
        defaultChecked={false}
      />
      <Switch
        variant={SWITCH_VARIANTS.SECONDARY}
        label="Secondary"
        defaultChecked={false}
      />
      <Switch
        variant={SWITCH_VARIANTS.SUCCESS}
        label="Success"
        defaultChecked={false}
      />
      <Switch
        variant={SWITCH_VARIANTS.DANGER}
        label="Danger"
        defaultChecked={false}
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const handleChange = (checked: boolean) => {
      console.log("Switch changed:", checked);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Switch label="Wifi" onChange={handleChange} />
        <Switch label="Bluetooth" onChange={handleChange} />
        <Switch label="Airplane Mode" onChange={handleChange} />
      </div>
    );
  },
};

export const AllSizesAndVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Small</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Switch
            size={SWITCH_SIZES.SMALL}
            variant={SWITCH_VARIANTS.PRIMARY}
            defaultChecked
          />
          <Switch
            size={SWITCH_SIZES.SMALL}
            variant={SWITCH_VARIANTS.SECONDARY}
            defaultChecked
          />
          <Switch
            size={SWITCH_SIZES.SMALL}
            variant={SWITCH_VARIANTS.SUCCESS}
            defaultChecked
          />
          <Switch
            size={SWITCH_SIZES.SMALL}
            variant={SWITCH_VARIANTS.DANGER}
            defaultChecked
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Medium</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Switch
            size={SWITCH_SIZES.MEDIUM}
            variant={SWITCH_VARIANTS.PRIMARY}
            defaultChecked
          />
          <Switch
            size={SWITCH_SIZES.MEDIUM}
            variant={SWITCH_VARIANTS.SECONDARY}
            defaultChecked
          />
          <Switch
            size={SWITCH_SIZES.MEDIUM}
            variant={SWITCH_VARIANTS.SUCCESS}
            defaultChecked
          />
          <Switch
            size={SWITCH_SIZES.MEDIUM}
            variant={SWITCH_VARIANTS.DANGER}
            defaultChecked
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Large</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Switch
            size={SWITCH_SIZES.LARGE}
            variant={SWITCH_VARIANTS.PRIMARY}
            defaultChecked
          />
          <Switch
            size={SWITCH_SIZES.LARGE}
            variant={SWITCH_VARIANTS.SECONDARY}
            defaultChecked
          />
          <Switch
            size={SWITCH_SIZES.LARGE}
            variant={SWITCH_VARIANTS.SUCCESS}
            defaultChecked
          />
          <Switch
            size={SWITCH_SIZES.LARGE}
            variant={SWITCH_VARIANTS.DANGER}
            defaultChecked
          />
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Switch
        label="Checkmark Icon"
        checkedIcon={ICONS.CHECKMARK_ICON}
        defaultChecked
      />
      <Switch
        label="Eye Icon"
        checkedIcon={ICONS.EYE_ICON}
        uncheckedIcon={ICONS.EYE_OFF_ICON}
        checkedIconColor="white"
        defaultChecked={false}
      />
      <Switch
        label="Custom Icons"
        checkedIcon={ICONS.CHECKMARK_ICON}
        uncheckedIcon={ICONS.CLOSE_ICON}
        defaultChecked
      />
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Switch
        size={SWITCH_SIZES.SMALL}
        label="Small with Icon"
        checkedIcon={ICONS.CHECKMARK_ICON}
        defaultChecked
      />
      <Switch
        size={SWITCH_SIZES.MEDIUM}
        label="Medium with Icon"
        checkedIcon={ICONS.CHECKMARK_ICON}
        defaultChecked
      />
      <Switch
        size={SWITCH_SIZES.LARGE}
        label="Large with Icon"
        checkedIcon={ICONS.CHECKMARK_ICON}
        defaultChecked
      />
    </div>
  ),
};

export const IconVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Switch
        variant={SWITCH_VARIANTS.PRIMARY}
        label="Primary with Icon"
        checkedIcon={ICONS.CHECKMARK_ICON}
        defaultChecked
      />
      <Switch
        variant={SWITCH_VARIANTS.SECONDARY}
        label="Secondary with Icon"
        checkedIcon={ICONS.CHECKMARK_ICON}
        defaultChecked
      />
      <Switch
        variant={SWITCH_VARIANTS.SUCCESS}
        label="Success with Icon"
        checkedIcon={ICONS.CHECKMARK_ICON}
        defaultChecked
      />
      <Switch
        variant={SWITCH_VARIANTS.DANGER}
        label="Danger with Icon"
        checkedIcon={ICONS.CLOSE_ICON}
        defaultChecked
      />
    </div>
  ),
};

export const CustomIconSize: Story = {
  args: {
    label: "Custom icon size",
    checkedIcon: ICONS.CHECKMARK_ICON,
    iconSize: 18,
    defaultChecked: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "../src/components/Slider";

const meta = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "300px", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: { control: "object" },
    defaultValue: { control: "object" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof RangeSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [20, 80],
    min: 0,
    max: 100,
    step: 1,
  },
};

export const Controlled: Story = {
  args: {
    value: [30, 70],
    min: 0,
    max: 100,
    step: 5,
    onChange: (val: [number, number]) => console.log("Controlled range:", val),
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [40, 60],
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    defaultValue: [20, 80],
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    defaultValue: [20, 80],
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    defaultValue: [20, 80],
    size: "large",
  },
};

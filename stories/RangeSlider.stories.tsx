import type { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "../src/components/Slider";

const meta = {
  title: "Example/RangeSlider",
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

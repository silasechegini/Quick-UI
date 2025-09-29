import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../src/components/Slider";

const meta = {
  title: "Example/Slider",
  component: Slider,
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
    value: { control: "number" },
    defaultValue: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Slider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 40,
    min: 0,
    max: 100,
    step: 1,
  },
};

export const Controlled: Story = {
  args: {
    value: 70,
    min: 0,
    max: 100,
    step: 5,
    onChange: (val: number) => console.log("Controlled value:", val),
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 50,
    disabled: true,
  },
};

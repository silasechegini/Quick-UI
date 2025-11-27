import type { Meta, StoryObj } from "@storybook/react";
import { Slider, SLIDER_SIZES } from "@components/Slider";

const meta = {
  title: "Components/Slider",
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
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
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

export const Small: Story = {
  args: {
    defaultValue: 40,
    size: SLIDER_SIZES.SMALL,
  },
};

export const Medium: Story = {
  args: {
    defaultValue: 40,
    size: SLIDER_SIZES.MEDIUM,
  },
};

export const Large: Story = {
  args: {
    defaultValue: 40,
    size: SLIDER_SIZES.LARGE,
  },
};

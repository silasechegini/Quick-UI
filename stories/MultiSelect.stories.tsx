import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect, MultiSelectOption } from "../src/components/MultiSelect";
import { fn } from "storybook/test";

const meta = {
  title: "Example/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  args: {
    placeholder: "Select your options",
    options: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ] as MultiSelectOption[],
    onChange: fn(),
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const WithDefaultValues: Story = {
  args: {
    defaultValue: ["vue", "react"],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

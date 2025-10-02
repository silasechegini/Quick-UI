import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { ComboBox, ComboBoxOption } from "../src/components/ComboBox";
import { fn } from "storybook/test";

const options: ComboBoxOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
];

const meta = {
  title: "Components/ComboBox",
  component: ComboBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Select a fruit...",
    options,
    onChange: fn(),
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof ComboBox>;

export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>("banana");
    return (
      <ComboBox
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange?.(val);
        }}
      />
    );
  },
};

export const Searchable: Story = {
  render: (args) => {
    const [inputOptions, setInputOptions] = useState(options);
    return (
      <ComboBox
        {...args}
        options={inputOptions}
        onSearch={(input) => {
          const filtered = options.filter((opt) =>
            opt.label.toLowerCase().includes(input.toLowerCase()),
          );
          setInputOptions(filtered);
        }}
      />
    );
  },
};

export const AsyncLoading: Story = {
  render: (args) => {
    const [results, setResults] = useState<ComboBoxOption[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOptions = async (input: string): Promise<ComboBoxOption[]> => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000));
      const filtered = options.filter((opt) =>
        opt.label.toLowerCase().includes(input.toLowerCase()),
      );
      setResults(filtered);
      setLoading(false);
      return filtered;
    };

    return (
      <ComboBox
        {...args}
        options={results}
        isLoading={loading}
        onSearch={fetchOptions}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "apple",
  },
};

export const CustomRender: Story = {
  args: {
    renderOption: (option, isActive) => (
      <div style={{ fontWeight: isActive ? "bold" : "normal" }}>
        🍇 {option.label}
      </div>
    ),
  },
};

export const EmptyState: Story = {
  args: {
    options: [],
    onSearch: () => {},
  },
};

export const CustomDebounce: Story = {
  args: {
    debounceDelay: 1000,
  },
};

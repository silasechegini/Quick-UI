import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Icon from "../src/components/Icon/Icon";
import { IconProps } from "../src/components/Icon/Icon.types";

import { iconSvgMapping as Icons } from "../src/assets";

const iconNames = Object.keys(Icons) as IconProps["name"][];

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: iconNames,
    },
    size: {
      control: "number",
    },
    color: {
      control: "color",
    },
    className: {
      control: false,
    },
    style: {
      control: false,
    },
  },
  args: {
    name: iconNames.length > 0 ? iconNames[0] : undefined,
    size: 24,
    color: "#000000",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // inherited from meta.args
  },
};

export const AllIcons: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {iconNames.map((name) => (
        <div
          key={name as string}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Icon {...args} name={name} />
          <small style={{ fontSize: 10, marginTop: 4 }}>{name as string}</small>
        </div>
      ))}
    </div>
  ),
  args: {
    size: 32,
    color: "#1e90ff",
  },
};

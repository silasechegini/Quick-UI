import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import { Chip, Icon } from "../src";
import {
  CHIP_SIZES,
  CHIP_STATUSES,
  CHIP_VARIANTS,
} from "@components/Chip/Chip.types";
import styles from "./chip.module.scss";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    variant: CHIP_VARIANTS.OUTLINE,
    size: CHIP_SIZES.MEDIUM,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Chip",
  },
};

export const Clickable: Story = {
  args: {
    text: "Clickable Chip",
    interactive: true,
    size: CHIP_SIZES.MEDIUM,
  },
};

export const Small: Story = {
  args: {
    text: "Small Chip",
    size: CHIP_SIZES.SMALL,
  },
};

export const Large: Story = {
  args: {
    text: "Large Chip",
    size: CHIP_SIZES.LARGE,
  },
};

export const SolidVariant: Story = {
  args: {
    text: "Solid Chip",
    variant: CHIP_VARIANTS.SOLID,
  },
};

export const StatusWarning: Story = {
  args: {
    text: "Warning",
    status: CHIP_STATUSES.WARNING,
  },
};

export const StatusSuccess: Story = {
  args: {
    text: "Success",
    status: CHIP_STATUSES.SUCCESS,
  },
};

export const StatusError: Story = {
  args: {
    text: "Error",
    status: CHIP_STATUSES.ERROR,
  },
};

export const StatusCustom: Story = {
  args: {
    text: "Custom Status",
    status: { name: "", class: styles["custom-status"] },
  },
};
export const Disabled: Story = {
  args: {
    text: "Disabled Chip",
    disabled: true,
  },
};

export const WithChildren: Story = {
  args: {
    text: "With Children",
    children: <span style={{ padding: "0 8px" }}>Custom Child</span>,
  },
};

export const WithCustomStyle: Story = {
  args: {
    text: "Custom Style",
    style: { backgroundColor: "#e0f7fa", color: "#006064" },
  },
};

export const WithLeadingIcon: Story = {
  args: {
    text: "Leading Icon",
    leadingIcon: <Icon name="chevron_left_icon" size={16} />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    text: "Trailing Icon",
    trailingIcon: <Icon name="chevron_right_icon" size={16} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    text: "Both Icons",
    leadingIcon: <Icon name="chevron_left_icon" size={16} />,
    trailingIcon: <Icon name="chevron_right_icon" size={16} />,
  },
};

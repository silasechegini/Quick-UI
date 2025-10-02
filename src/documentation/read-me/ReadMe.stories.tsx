import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ReadMePage from "./ReadMePage";

const meta = {
  title: "Documentation/ReadMePage",
  component: ReadMePage,
} satisfies Meta<typeof ReadMePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ReadMePage />,
};

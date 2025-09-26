import { Meta, StoryObj } from "@storybook/react";
import { Flyout } from "../src/components/Flyout/Flyout";

const meta = {
  title: "Example/Flyout",
  component: Flyout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    width: "400px",
    height: "100vh",
    role: "dialog",
  },
} satisfies Meta<typeof Flyout>;

export default meta;

type Story = StoryObj<typeof Flyout>;

export const Default: Story = {
  render: () => (
    <Flyout ariaLabelledBy="flyout-title">
      <Flyout.Header>
        <h2 id="flyout-title">Panel Title</h2>
      </Flyout.Header>
      <Flyout.Body>
        <p>Some long content that will make the body scroll...</p>
        {[...Array(30)].map((_, i) => (
          <p key={i}>Line {i + 1}</p>
        ))}
      </Flyout.Body>
      <Flyout.Footer>
        <button>Close</button>
      </Flyout.Footer>
    </Flyout>
  ),
};

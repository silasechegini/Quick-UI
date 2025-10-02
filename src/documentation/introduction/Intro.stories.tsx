import { Meta, StoryObj } from "@storybook/react";
import IntroPage from "./IntroPage";

const meta = {
  title: "Documentation/Introduction",
  component: IntroPage,
} satisfies Meta<typeof IntroPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Introduction: Story = {
  render: () => <IntroPage />,
  parameters: {
    docs: {
      description: {
        story:
          "This story renders the IntroPage component as the introduction to the documentation.",
      },
    },
  },
};

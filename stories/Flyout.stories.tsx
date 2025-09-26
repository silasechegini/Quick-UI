import { Meta, StoryObj } from "@storybook/react";
import { Flyout } from "../src/components/Flyout";
import {
  Button,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "../src/components/Button";
import { useState } from "react";

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
    isOpen: true,
    showBackdrop: true,
    closeOnBackdropClick: true,
  },
} satisfies Meta<typeof Flyout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [openFlyout, setOpenFlyout] = useState<boolean>(true);

    return (
      <>
        <Button size={BUTTON_SIZES.MEDIUM} onClick={() => setOpenFlyout(true)}>
          Open Flyout
        </Button>
        <Flyout
          {...args}
          ariaLabelledBy="flyout-title"
          headerChildren={<h2 id="flyout-title">Panel Title</h2>}
          bodyChildren={
            <>
              <p>Some long content that will make the body scroll...</p>{" "}
              {[...Array(30)].map((_, i) => (
                <p key={i}>Line {i + 1}</p>
              ))}
            </>
          }
          footerChildren={
            <Button
              size={BUTTON_SIZES.SMALL}
              variant={BUTTON_VARIANTS.TERTIARY}
              onClick={() => setOpenFlyout(false)}
            >
              Close
            </Button>
          }
          isOpen={openFlyout}
          showBackdrop={openFlyout}
          onClose={() => setOpenFlyout(false)}
        />
      </>
    );
  },
};

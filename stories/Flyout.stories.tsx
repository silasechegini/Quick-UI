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
          headerChildren={
            <h2 id="flyout-title" style={{ margin: 0 }}>
              Panel Title
            </h2>
          }
          bodyChildren={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <p>Some normal content</p>
            </div>
          }
          footerChildren={<h2 id="flyout-footer">Panel Footer</h2>}
          isOpen={openFlyout}
          showBackdrop={openFlyout}
          onClose={() => setOpenFlyout(false)}
        />
      </>
    );
  },
};

export const withScrollableBody: Story = {
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
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                size={BUTTON_SIZES.MEDIUM}
                variant={BUTTON_VARIANTS.SECONDARY}
              >
                Cancel
              </Button>
              <Button
                size={BUTTON_SIZES.MEDIUM}
                variant={BUTTON_VARIANTS.PRIMARY}
                style={{ marginLeft: "8px" }}
              >
                Save
              </Button>
            </div>
          }
          isOpen={openFlyout}
          showBackdrop={openFlyout}
          onClose={() => setOpenFlyout(false)}
        />
      </>
    );
  },
};

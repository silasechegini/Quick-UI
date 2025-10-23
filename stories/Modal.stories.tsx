import type { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  MODAL_SIZES,
  MODAL_VARIANTS,
  ModalProps,
} from "../src/components/Modal";
import { Button } from "../src/components/Button";
import { useState } from "react";
import "../src/styles/index.scss";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the modal is visible",
    },
    title: {
      control: "text",
      description: "Modal title (can be string or ReactNode)",
    },
    children: {
      control: "text",
      description: "Modal body content",
    },
    footer: {
      control: "text",
      description: "Footer content (typically buttons)",
    },
    size: {
      control: "select",
      options: Object.values(MODAL_SIZES),
      description: "Modal size variant",
    },
    variant: {
      control: "select",
      options: Object.values(MODAL_VARIANTS),
      description: "Modal animation variant",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "Allow closing by clicking the overlay",
    },
    closeOnEsc: {
      control: "boolean",
      description: "Allow closing with ESC key",
    },
    showCloseButton: {
      control: "boolean",
      description: "Show close button in header",
    },
    scrollable: {
      control: "boolean",
      description: "Make modal body scrollable",
    },
    preventBodyScroll: {
      control: "boolean",
      description: "Prevent body scroll when modal is open",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Helper component to handle state for stories
const ModalWrapper = (props: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Modal Title",
    children: "This is the modal content. You can put any content here.",
    footer: (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    ),
  },
};

export const SmallSize: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Small Modal",
    size: MODAL_SIZES.SMALL,
    children: "This is a small modal (400px width).",
  },
};

export const MediumSize: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Medium Modal",
    size: MODAL_SIZES.MEDIUM,
    children: "This is a medium modal (600px width). This is the default size.",
  },
};

export const LargeSize: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Large Modal",
    size: MODAL_SIZES.LARGE,
    children: "This is a large modal (800px width).",
  },
};

export const ExtraLargeSize: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Extra Large Modal",
    size: MODAL_SIZES.EXTRA_LARGE,
    children: "This is an extra large modal (1200px width).",
  },
};

export const FullSize: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Full Size Modal",
    size: MODAL_SIZES.FULL,
    children:
      "This modal takes up the full viewport size with some padding around the edges.",
  },
};

export const CenteredVariant: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Centered Animation",
    variant: MODAL_VARIANTS.CENTERED,
    children: "This modal fades in without any scale animation.",
  },
};

export const SlideUpVariant: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Slide Up Animation",
    variant: MODAL_VARIANTS.SLIDE_UP,
    children: "This modal slides up from the bottom of the screen.",
  },
};

export const SlideRightVariant: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Side Panel",
    variant: MODAL_VARIANTS.SLIDE_RIGHT,
    size: MODAL_SIZES.MEDIUM,
    children:
      "This modal slides in from the right side, perfect for side panels and drawers.",
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "No Close Button",
    showCloseButton: false,
    children:
      "This modal has no close button. You can still close it by clicking the overlay or pressing ESC.",
  },
};

export const WithoutOverlayClose: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Click Outside Disabled",
    closeOnOverlayClick: false,
    children:
      "You cannot close this modal by clicking the overlay. Use the close button or ESC key.",
  },
};

export const WithoutEscClose: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "ESC Key Disabled",
    closeOnEsc: false,
    children:
      "You cannot close this modal with the ESC key. Use the close button or click outside.",
  },
};

export const ScrollableContent: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Scrollable Modal",
    scrollable: true,
    children: (
      <div>
        <p>This modal has scrollable content.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
        <p>You can scroll to see all the content.</p>
      </div>
    ),
  },
};

export const ConfirmationDialog: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Delete Item",
    size: MODAL_SIZES.SMALL,
    children: (
      <div>
        <p>Are you sure you want to delete this item?</p>
        <p style={{ color: "#dc3545", fontWeight: "bold" }}>
          This action cannot be undone.
        </p>
      </div>
    ),
    footer: (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Delete</Button>
      </div>
    ),
  },
};

export const FormExample: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Create New User",
    size: MODAL_SIZES.MEDIUM,
    children: (
      <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "4px" }}
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "4px" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="role"
            style={{ display: "block", marginBottom: "4px" }}
          >
            Role
          </label>
          <select
            id="role"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option>User</option>
            <option>Admin</option>
            <option>Manager</option>
          </select>
        </div>
      </form>
    ),
    footer: (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Create User</Button>
      </div>
    ),
  },
};

export const WithoutHeader: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    children: (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2 style={{ marginTop: 0 }}>Custom Content</h2>
        <p>This modal has no header, only body content.</p>
      </div>
    ),
    footer: (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>Close</Button>
      </div>
    ),
  },
};

export const WithoutFooter: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Information",
    children: (
      <div>
        <p>This modal has no footer.</p>
        <p>You can close it using the close button or by clicking outside.</p>
      </div>
    ),
  },
};

export const CustomStyling: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Custom Styled Modal",
    className: "custom-modal",
    headerClassName: "custom-header",
    bodyClassName: "custom-body",
    children: (
      <div>
        <p>This modal demonstrates custom styling capabilities.</p>
        <p>
          You can use className, headerClassName, bodyClassName,
          footerClassName, contentClassName, and overlayClassName props to
          customize the appearance.
        </p>
      </div>
    ),
  },
};

export const Playground: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Playground Modal",
    children:
      "Use the controls panel to experiment with different modal configurations!",
    footer: (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    ),
    size: MODAL_SIZES.MEDIUM,
    variant: MODAL_VARIANTS.DEFAULT,
    closeOnOverlayClick: true,
    closeOnEsc: true,
    showCloseButton: true,
    scrollable: true,
    preventBodyScroll: true,
  },
};

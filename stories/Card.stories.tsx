import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Card, Button } from "../src/components";
import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
} from "../src/components/Button/Button.types";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A flexible Card component that provides a container with optional header, footer, and customizable styling options.
Supports different elevation levels, borders, hover effects, and rich content.
        `.trim(),
      },
    },
  },
  argTypes: {
    header: {
      control: "text",
      description: "Optional header content, can be a string or ReactNode",
    },
    footer: {
      control: "text",
      description: "Optional footer content, can be a string or ReactNode",
    },
    children: {
      control: "text",
      description: "Main content of the card",
    },
    elevation: {
      control: { type: "select" },
      options: [0, 1, 2, 3, 4],
      description: "Card elevation (shadow) level",
    },
    bordered: {
      control: "boolean",
      description: "If true, adds a border to the card",
    },
    hoverable: {
      control: "boolean",
      description: "If true, makes the card hoverable with enhanced shadow",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
    style: {
      control: "object",
      description: "Custom inline styles",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic card
export const Default: Story = {
  args: {
    children: "This is a simple card with default settings.",
  },
};

// Card with header
export const WithHeader: Story = {
  args: {
    header: "Card Header",
    children:
      "This card has a header section that stands out from the main content.",
  },
};

// Card with footer
export const WithFooter: Story = {
  args: {
    children:
      "This card has a footer section for additional actions or information.",
    footer: "Card Footer",
  },
};

// Complete card with header and footer
export const Complete: Story = {
  args: {
    header: "Complete Card",
    children:
      "This card demonstrates all sections: header, body, and footer working together.",
    footer: "Footer with actions",
  },
};

// Different elevation levels
export const ElevationLevels: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
      }}
    >
      {[0, 1, 2, 3, 4].map((elevation) => (
        <Card
          key={elevation}
          elevation={elevation as 0 | 1 | 2 | 3 | 4}
          header={`Elevation ${elevation}`}
        >
          This card has elevation level {elevation}
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of all available elevation levels from 0 (no shadow) to 4 (maximum shadow).",
      },
    },
  },
};

// Bordered card
export const Bordered: Story = {
  args: {
    bordered: true,
    header: "Bordered Card",
    children: "This card has a border for additional visual definition.",
  },
};

// Hoverable card
export const Hoverable: Story = {
  args: {
    hoverable: true,
    header: "Hoverable Card",
    children: "Hover over this card to see the enhanced shadow effect.",
    footer: "Try hovering!",
  },
};

// Rich content examples
export const RichContent: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
      }}
    >
      {/* Product card */}
      <Card
        header={
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#3b82f6",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              P
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "16px" }}>Product Name</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                $29.99
              </p>
            </div>
          </div>
        }
        elevation={2}
        hoverable
      >
        <p style={{ margin: "0 0 16px 0" }}>
          This is a detailed product description that explains the key features
          and benefits.
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "#f3f4f6",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            Feature 1
          </span>
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "#f3f4f6",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            Feature 2
          </span>
        </div>
      </Card>

      {/* User profile card */}
      <Card header="User Profile" elevation={1} bordered>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            JD
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px" }}>John Doe</h3>
            <p style={{ margin: 0, color: "#666" }}>Software Engineer</p>
            <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>
              john.doe@example.com
            </p>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5" }}>
          Experienced developer with expertise in React, TypeScript, and modern
          web technologies.
        </p>
      </Card>

      {/* Stats card */}
      <Card
        header="Analytics Dashboard"
        footer={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.SMALL}>
              View Details
            </Button>
            <Button
              variant={BUTTON_VARIANTS.SECONDARY}
              size={BUTTON_SIZES.SMALL}
            >
              Export
            </Button>
          </div>
        }
        elevation={3}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#3b82f6",
              }}
            >
              1,234
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Total Users</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#10b981",
              }}
            >
              98.5%
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Uptime</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#f59e0b",
              }}
            >
              $12,345
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Revenue</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#ef4444",
              }}
            >
              23
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>Issues</div>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples of cards with rich content including product cards, user profiles, and analytics dashboards.",
      },
    },
  },
};

// Interactive example
export const InteractiveCard: Story = {
  render: () => {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    return (
      <Card
        header={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0 }}>Interactive Card</h3>
            <span style={{ fontSize: "14px", color: "#666" }}>2 min read</span>
          </div>
        }
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <Button
                onClick={() => setLiked(!liked)}
                variant={BUTTON_VARIANTS.TERTIARY}
                size={BUTTON_SIZES.SMALL}
                style={{
                  backgroundColor: liked ? "#ef4444" : undefined,
                  borderColor: "#ef4444",
                  color: liked ? "white" : "#ef4444",
                }}
              >
                ♥ {liked ? "Liked" : "Like"}
              </Button>
              <Button
                onClick={() => setSaved(!saved)}
                variant={BUTTON_VARIANTS.TERTIARY}
                size={BUTTON_SIZES.SMALL}
                style={{
                  backgroundColor: saved ? "#3b82f6" : undefined,
                  borderColor: "#3b82f6",
                  color: saved ? "white" : "#3b82f6",
                }}
              >
                ★ {saved ? "Saved" : "Save"}
              </Button>
            </div>
            <span style={{ fontSize: "14px", color: "#666" }}>
              {liked ? "Thanks!" : "Show some love"}
            </span>
          </div>
        }
        elevation={2}
        hoverable
      >
        <p style={{ margin: "0 0 16px 0", lineHeight: "1.6" }}>
          This interactive card demonstrates how you can build engaging user
          interfaces with the Card component. Click the buttons below to see the
          state changes!
        </p>
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f8fafc",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#475569",
          }}
        >
          <strong>Status:</strong> Liked: {liked ? "Yes" : "No"} | Saved:{" "}
          {saved ? "Yes" : "No"}
        </div>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "An interactive card example showing how to integrate state management and user interactions.",
      },
    },
  },
};

// Card grid layout
export const CardGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
      }}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <Card
          key={i}
          header={`Card ${i + 1}`}
          elevation={1}
          hoverable
          bordered={i % 2 === 0}
        >
          <p style={{ margin: 0 }}>
            This is card number {i + 1} in a responsive grid layout.
          </p>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of cards in a responsive grid layout, perfect for dashboards and listing pages.",
      },
    },
  },
};

// Custom styling example
export const CustomStyling: Story = {
  args: {
    header: "Custom Styled Card",
    children: "This card demonstrates custom styling capabilities.",
    footer: "Custom footer styling",
    elevation: 2,
    style: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
    },
    className: "custom-card",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example of custom styling using the style prop and className for advanced customization.",
      },
    },
  },
};

// Button showcase in cards
export const ButtonShowcase: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
      }}
    >
      {/* Primary actions card */}
      <Card
        header="Primary Actions"
        footer={
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.SMALL}>
              Save Changes
            </Button>
            <Button
              variant={BUTTON_VARIANTS.SECONDARY}
              size={BUTTON_SIZES.SMALL}
            >
              Cancel
            </Button>
          </div>
        }
        elevation={2}
      >
        <p style={{ margin: 0 }}>
          This card demonstrates primary and secondary button combinations for
          common actions like save/cancel workflows.
        </p>
      </Card>

      {/* Action menu card */}
      <Card
        header="Action Menu"
        footer={
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.SMALL}>
              Edit
            </Button>
            <Button
              variant={BUTTON_VARIANTS.TERTIARY}
              size={BUTTON_SIZES.SMALL}
            >
              Share
            </Button>
            <Button variant={BUTTON_VARIANTS.PLAIN} size={BUTTON_SIZES.SMALL}>
              Delete
            </Button>
          </div>
        }
        elevation={1}
        bordered
      >
        <p style={{ margin: 0 }}>
          Showcase of different button variants: primary for main actions,
          tertiary for secondary actions, and plain for destructive actions.
        </p>
      </Card>

      {/* Loading states card */}
      <Card
        header="Loading States"
        footer={
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button
              variant={BUTTON_VARIANTS.PRIMARY}
              size={BUTTON_SIZES.SMALL}
              isLoading={true}
            >
              Processing...
            </Button>
            <Button
              variant={BUTTON_VARIANTS.SECONDARY}
              size={BUTTON_SIZES.SMALL}
            >
              Cancel
            </Button>
          </div>
        }
        elevation={2}
      >
        <p style={{ margin: 0 }}>
          Example of loading states in action buttons, useful for forms and
          async operations within cards.
        </p>
      </Card>

      {/* Size variations card */}
      <Card
        header="Button Sizes"
        footer={
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Button
              variant={BUTTON_VARIANTS.PRIMARY}
              size={BUTTON_SIZES.EXTRASMALL}
            >
              XS
            </Button>
            <Button variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.SMALL}>
              Small
            </Button>
            <Button
              variant={BUTTON_VARIANTS.PRIMARY}
              size={BUTTON_SIZES.MEDIUM}
            >
              Medium
            </Button>
          </div>
        }
        elevation={1}
      >
        <p style={{ margin: 0 }}>
          Different button sizes working harmoniously within card layouts, from
          extra small to medium sizes.
        </p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive showcase of your custom Button component integrated within Card layouts, demonstrating different variants, sizes, and states.",
      },
    },
  },
};

// Long content example
export const LongContent: Story = {
  args: {
    header: "Article Card",
    children: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    `,
    footer: "Published on October 14, 2025",
    elevation: 1,
    bordered: true,
  },
};

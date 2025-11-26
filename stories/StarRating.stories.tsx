import type { Meta, StoryObj } from "@storybook/react";
import { StarRating } from "../src/components";
import { useState } from "react";
import { FaHeart, FaThumbsUp } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

const meta = {
  title: "Components/StarRating",
  component: StarRating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum number of stars",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "extraLarge"],
      description: "Size of the star icons",
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "rounded"],
      description: "Visual style variant",
    },
    allowHalf: {
      control: { type: "boolean" },
      description: "Allow half-star ratings",
    },
    showValue: {
      control: { type: "boolean" },
      description: "Show numeric rating value",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable user interaction",
    },
    readOnly: {
      control: { type: "boolean" },
      description: "Make rating read-only",
    },
    defaultValue: {
      control: { type: "number", min: 0, max: 5, step: 0.5 },
      description: "Default rating value",
    },
    inactiveColor: {
      control: { type: "color" },
      description: "Color for empty stars",
    },
    activeColor: {
      control: { type: "color" },
      description: "Color for filled stars",
    },
    hoverColor: {
      control: { type: "color" },
      description: "Color for hovered stars",
    },
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    count: 5,
    size: "medium",
  },
};

// With default value
export const WithDefaultValue: Story = {
  args: {
    count: 5,
    defaultValue: 3,
    size: "medium",
  },
};

// Show numeric value
export const WithValue: Story = {
  args: {
    count: 5,
    defaultValue: 4.5,
    showValue: true,
    allowHalf: true,
    size: "medium",
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <div>
        <label>Small: </label>
        <StarRating size="small" defaultValue={3} />
      </div>
      <div>
        <label>Medium: </label>
        <StarRating size="medium" defaultValue={3} />
      </div>
      <div>
        <label>Large: </label>
        <StarRating size="large" defaultValue={3} />
      </div>
      <div>
        <label>Extra Large: </label>
        <StarRating size="extra-large" defaultValue={3} />
      </div>
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <div>
        <label>Filled (default): </label>
        <StarRating variant="filled" defaultValue={3} />
      </div>
      <div>
        <label>Outlined: </label>
        <StarRating variant="outlined" defaultValue={3} />
      </div>
      <div>
        <label>Rounded: </label>
        <StarRating variant="rounded" defaultValue={3} />
      </div>
    </div>
  ),
};

// Half ratings
export const HalfRatings: Story = {
  args: {
    count: 5,
    allowHalf: true,
    defaultValue: 3.5,
    showValue: true,
    size: "large",
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    count: 5,
    defaultValue: 3,
    inactiveColor: "#e0e7ff",
    activeColor: "#6366f1",
    hoverColor: "#4f46e5",
    size: "large",
  },
};

// Custom icons
export const CustomIcons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <div>
        <label>Hearts: </label>
        <StarRating
          defaultValue={3}
          filledIcon={FaHeart}
          emptyIcon={FaHeart}
          activeColor="#ec4899"
          inactiveColor="#fce7f3"
        />
      </div>
      <div>
        <label>Thumbs Up: </label>
        <StarRating
          defaultValue={4}
          filledIcon={FaThumbsUp}
          emptyIcon={FaThumbsUp}
          activeColor="#10b981"
          inactiveColor="#d1fae5"
        />
      </div>
      <div>
        <label>Like Icons: </label>
        <StarRating
          defaultValue={2}
          filledIcon={AiFillLike}
          emptyIcon={AiFillLike}
          activeColor="#3b82f6"
          inactiveColor="#dbeafe"
        />
      </div>
    </div>
  ),
};

// Read-only states
export const ReadOnly: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <div>
        <label>Read-only with value: </label>
        <StarRating readOnly defaultValue={4.5} allowHalf showValue />
      </div>
      <div>
        <label>Disabled: </label>
        <StarRating disabled defaultValue={3} />
      </div>
    </div>
  ),
};

// Interactive examples
export const Interactive: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        alignItems: "flex-start",
      }}
    >
      <div>
        <label>Allow clear (click current rating to clear): </label>
        <StarRating defaultValue={3} showValue />
      </div>
      <div>
        <label>Highlight selected only: </label>
        <StarRating defaultValue={2} />
      </div>
      <div>
        <label>Custom tooltip: </label>
        <StarRating defaultValue={3} showValue />
      </div>
    </div>
  ),
};

// Controlled component
export const Controlled: Story = {
  render: () => {
    const [rating, setRating] = useState<number>(2.5);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        <div>
          <label>Controlled Rating (current: {rating}): </label>
          <StarRating
            value={rating}
            onChange={(value) => setRating(value)}
            allowHalf
            showValue
          />
        </div>
        <button onClick={() => setRating(0)}>Clear Rating</button>
        <button onClick={() => setRating(5)}>Set to 5 Stars</button>
      </div>
    );
  },
};

// With custom content
export const WithChildren: Story = {
  args: {
    count: 5,
    defaultValue: 4,
    showValue: true,
    children: (
      <span style={{ marginLeft: "8px", color: "#6b7280" }}>out of 5</span>
    ),
  },
};

// Event handling
export const WithEvents: Story = {
  render: () => {
    const [events, setEvents] = useState<string[]>([]);

    const addEvent = (event: string) => {
      setEvents((prev) => [
        ...prev.slice(-4),
        `${new Date().toLocaleTimeString()}: ${event}`,
      ]);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        <StarRating
          defaultValue={2}
          onChange={(value) => addEvent(`Changed to ${value}`)}
          onStarHover={(_index, value) => addEvent(`Hovered  ${value}`)}
          onStarClick={(_index, value) => addEvent(`Clicked ${value}`)}
          showValue
          allowHalf
        />

        <div style={{ marginTop: "16px" }}>
          <h4>Events:</h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            {events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};

// Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <div>
        <label id="rating-label">Product Rating:</label>
        <StarRating
          aria-labelledby="rating-label"
          defaultValue={4}
          showValue
          allowHalf
        />
      </div>
      <div>
        <label>With description:</label>
        <StarRating
          aria-label="Rate this product from 1 to 5 stars"
          aria-describedby="rating-desc"
          defaultValue={3}
        />
        <div
          id="rating-desc"
          style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}
        >
          Use arrow keys to navigate, Enter or Space to select
        </div>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../src/components/Accordion";
import {
  AccordionItemData,
  ACCORDION_VARIANTS,
  ACCORDION_SIZES,
  EXPAND_MODES,
  ACCORDION_ICON_POSITIONS,
} from "../src/components/Accordion/Accordion.types";
import { useState } from "react";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A robust, accessible accordion component with advanced features:

- **Multiple Expansion Modes**: Single or multiple items can be expanded
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Home, End, Enter, Space)
- **Smooth Animations**: Dynamic height calculations for seamless transitions
- **Multiple Variants**: Default, Outlined, Filled, Glass, and Gradient styles 
- **Loading & Disabled States**: Built-in support for loading and disabled items
- **Customizable**: Icons, sizes, and positions are fully customizable
- **Lifecycle Callbacks**: Before/after expand and collapse hooks
- **Controlled & Uncontrolled**: Supports both modes
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(ACCORDION_VARIANTS),
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: Object.values(ACCORDION_SIZES),
      description: "Size of the accordion",
    },
    expandMode: {
      control: "select",
      options: Object.values(EXPAND_MODES),
      description: "Single or multiple expansion mode",
    },
    iconPosition: {
      control: "select",
      options: Object.values(ACCORDION_ICON_POSITIONS),
      description: "Position of the expand icon",
    },
    showDividers: {
      control: "boolean",
      description: "Show dividers between items",
    },
    elevateExpanded: {
      control: "boolean",
      description: "Elevate expanded items with shadow",
    },
    disabled: {
      control: "boolean",
      description: "Disable all items",
    },
    allowToggle: {
      control: "boolean",
      description: "Allow collapsing expanded items",
    },
    transitionDuration: {
      control: "number",
      description: "Animation duration in milliseconds",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const basicItems: AccordionItemData[] = [
  {
    id: "panel1",
    title: "What is Quick-UI?",
    content:
      "Quick-UI is a modern, accessible React component library designed to help developers build beautiful user interfaces quickly and efficiently. It features a comprehensive set of customizable components with excellent TypeScript support.",
  },
  {
    id: "panel2",
    title: "How do I get started?",
    content:
      "Getting started is easy! Simply install the package via npm, import the components you need, and start building. Check out our comprehensive documentation and examples to learn more about each component's features and props.",
  },
  {
    id: "panel3",
    title: "Is it accessible?",
    content:
      "Absolutely! Accessibility is a core principle of Quick-UI. All components follow WAI-ARIA guidelines, support keyboard navigation, screen readers, and include proper semantic HTML. We test extensively to ensure everyone can use your applications.",
  },
  {
    id: "panel4",
    title: "Can I customize the styling?",
    content:
      "Yes! Quick-UI components are highly customizable. You can override styles using CSS modules, pass custom class names, or use our built-in variant system. The component library is designed to adapt to your design system.",
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.DEFAULT,
    size: ACCORDION_SIZES.MEDIUM,
    expandMode: EXPAND_MODES.SINGLE,
    iconPosition: ACCORDION_ICON_POSITIONS.END,
    showDividers: true,
    allowToggle: true,
  },
};

export const Outlined: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.OUTLINED,
    size: ACCORDION_SIZES.MEDIUM,
  },
};

export const Filled: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.FILLED,
    size: ACCORDION_SIZES.MEDIUM,
  },
};

export const Glass: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.GLASS,
    size: ACCORDION_SIZES.MEDIUM,
  },
  parameters: {
    backgrounds: {
      default: "gradient",
      values: [
        {
          name: "gradient",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
      ],
    },
  },
};

export const Gradient: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.GRADIENT,
    size: ACCORDION_SIZES.MEDIUM,
    elevateExpanded: true,
  },
};

export const MultipleExpansion: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.OUTLINED,
    expandMode: EXPAND_MODES.MULTIPLE,
    defaultExpanded: ["panel1", "panel2"],
  },
};

export const WithSubtitles: Story = {
  args: {
    items: [
      {
        id: "feature1",
        title: "Advanced Typography",
        subtitle: "Beautiful text rendering",
        content:
          "Our typography system ensures your text looks great across all devices with responsive sizing, proper line heights, and optimized font stacks.",
      },
      {
        id: "feature2",
        title: "Dark Mode Support",
        subtitle: "Seamless theme switching",
        content:
          "Built-in dark mode support with smooth transitions. All components automatically adapt to your theme preferences.",
      },
      {
        id: "feature3",
        title: "Performance Optimized",
        subtitle: "Lightning fast rendering",
        content:
          "Optimized for performance with minimal re-renders, code splitting, and efficient bundle sizes. Your apps will be blazingly fast.",
      },
    ],
    variant: ACCORDION_VARIANTS.GRADIENT,
    size: ACCORDION_SIZES.LARGE,
  },
};

const DocumentIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4C4 2.89543 4.89543 2 6 2H11.1716C11.702 2 12.2107 2.21071 12.5858 2.58579L15.4142 5.41421C15.7893 5.78929 16 6.29799 16 6.82843V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 10H12M8 14H12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M16.5 10C16.5 10.4 16.4 10.8 16.3 11.1L17.8 12.3L16.3 14.7L14.5 14C14 14.5 13.5 14.9 12.9 15.1L12.5 17H10L9.6 15.1C9 14.9 8.5 14.5 8 14L6.2 14.7L4.7 12.3L6.2 11.1C6.1 10.8 6 10.4 6 10C6 9.6 6.1 9.2 6.2 8.9L4.7 7.7L6.2 5.3L8 6C8.5 5.5 9 5.1 9.6 4.9L10 3H12.5L12.9 4.9C13.5 5.1 14 5.5 14.5 6L16.3 5.3L17.8 7.7L16.3 8.9C16.4 9.2 16.5 9.6 16.5 10Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: "docs",
        title: "Documentation",
        icon: <DocumentIcon />,
        content:
          "Access comprehensive documentation with examples, API references, and best practices for all components.",
      },
      {
        id: "settings",
        title: "Settings",
        icon: <SettingsIcon />,
        content:
          "Configure your preferences, customize themes, and manage application settings all in one place.",
      },
      {
        id: "profile",
        title: "User Profile",
        icon: <UserIcon />,
        content:
          "Manage your account information, update your profile picture, and control your privacy settings.",
      },
    ],
    variant: ACCORDION_VARIANTS.OUTLINED,
    iconPosition: ACCORDION_ICON_POSITIONS.START,
  },
};

export const SmallSize: Story = {
  args: {
    items: basicItems.slice(0, 2),
    size: ACCORDION_SIZES.SMALL,
    variant: ACCORDION_VARIANTS.DEFAULT,
  },
};

export const LargeSize: Story = {
  args: {
    items: basicItems.slice(0, 2),
    size: ACCORDION_SIZES.LARGE,
    variant: ACCORDION_VARIANTS.GRADIENT,
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        id: "available1",
        title: "Available Feature",
        content: "This feature is available and ready to use.",
      },
      {
        id: "disabled1",
        title: "Coming Soon",
        content: "This feature is not yet available.",
        disabled: true,
      },
      {
        id: "available2",
        title: "Another Available Feature",
        content: "This feature is also available.",
      },
      {
        id: "disabled2",
        title: "Premium Feature",
        subtitle: "Upgrade to access",
        content: "This is a premium feature.",
        disabled: true,
      },
    ],
    variant: ACCORDION_VARIANTS.OUTLINED,
  },
};

export const WithLoadingState: Story = {
  args: {
    items: [
      {
        id: "loaded",
        title: "Loaded Content",
        content: "This content is loaded and ready.",
      },
      {
        id: "loading",
        title: "Loading Content",
        content: "This content is currently loading...",
        isLoading: true,
      },
    ],
    variant: ACCORDION_VARIANTS.FILLED,
  },
};

export const NoToggle: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.OUTLINED,
    allowToggle: false,
    defaultExpanded: ["panel1"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "With `allowToggle={false}`, users cannot collapse the expanded item in single mode.",
      },
    },
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState<string[]>(["panel1"]);

    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginBottom: "0.5rem",
            }}
          >
            Expanded items: {expanded.join(", ") || "none"}
          </p>
          <button
            onClick={() => setExpanded([])}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer",
            }}
          >
            Collapse All
          </button>
          <button
            onClick={() =>
              setExpanded(["panel1", "panel2", "panel3", "panel4"])
            }
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer",
            }}
          >
            Expand All
          </button>
        </div>
        <Accordion
          {...args}
          expanded={expanded}
          onChange={setExpanded}
          expandMode={EXPAND_MODES.MULTIPLE}
        />
      </div>
    );
  },
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.GRADIENT,
  },
};

export const WithCallbacks: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.OUTLINED,
    onBeforeExpand: (id: string) => {
      console.log("Before expand:", id);
    },
    onAfterExpand: (id: string) => {
      console.log("After expand:", id);
    },
    onBeforeCollapse: (id: string) => {
      console.log("Before collapse:", id);
    },
    onAfterCollapse: (id: string) => {
      console.log("After collapse:", id);
    },
    onChange: (expanded: string[]) => {
      console.log("Expanded items changed:", expanded);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Open the browser console to see lifecycle callback logs.",
      },
    },
  },
};

export const FastTransition: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.OUTLINED,
    transitionDuration: 150,
  },
};

export const SlowTransition: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.GRADIENT,
    transitionDuration: 600,
  },
};

export const ElevatedExpanded: Story = {
  args: {
    items: basicItems,
    variant: ACCORDION_VARIANTS.OUTLINED,
    elevateExpanded: true,
    defaultExpanded: ["panel1"],
  },
};

export const ComplexContent: Story = {
  args: {
    items: [
      {
        id: "complex1",
        title: "Rich Content Example",
        subtitle: "With images and formatting",
        content: (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <p style={{ margin: 0 }}>
              This accordion item contains rich content including{" "}
              <strong>bold text</strong>, <em>italic text</em>, and{" "}
              <code>code snippets</code>.
            </p>
            <div
              style={{
                background: "#f3f4f6",
                padding: "1rem",
                borderRadius: "0.5rem",
                fontFamily: "monospace",
              }}
            >
              const example = "code block";
            </div>
            <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
              <li>Feature one</li>
              <li>Feature two</li>
              <li>Feature three</li>
            </ul>
          </div>
        ),
      },
      {
        id: "complex2",
        title: "Interactive Content",
        content: (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <p style={{ margin: 0 }}>You can include interactive elements:</p>
            <button
              style={{
                padding: "0.5rem 1rem",
                background: "#1d4ed8",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
              onClick={() => alert("Button clicked!")}
            >
              Click Me
            </button>
            <input
              type="text"
              placeholder="Type something..."
              style={{
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
              }}
            />
          </div>
        ),
      },
    ],
    variant: ACCORDION_VARIANTS.OUTLINED,
    size: ACCORDION_SIZES.LARGE,
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
    variant: ACCORDION_VARIANTS.DEFAULT,
  },
};

export const CustomEmptyState: Story = {
  args: {
    items: [],
    variant: ACCORDION_VARIANTS.OUTLINED,
    emptyState: (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <p
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          No FAQs Available
        </p>
        <p style={{ color: "#6b7280" }}>
          Check back later for frequently asked questions.
        </p>
      </div>
    ),
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import {
  Button,
  BUTTON_SHAPES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ICON_POSITIONS,
} from "../src";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: fn(),
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.CUSTOM,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.MEDIUM,
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: BUTTON_VARIANTS.SECONDARY,
    size: BUTTON_SIZES.MEDIUM,
    children: "Secondary Btn",
  },
};

export const Large: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.LARGE,
    children: "Large Button",
  },
};

export const Small: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.SMALL,
    children: "Small Button",
  },
};

export const LeadingIcon: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.LARGE,
    children: "leading Icon",
    icon: "🚀",
    iconPosition: ICON_POSITIONS.START,
  },
};

export const TrailingIcon: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.LARGE,
    children: "Trailing Icon",
    icon: "🚀",
    iconPosition: ICON_POSITIONS.END,
  },
};

export const Circular: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.LARGE,
    shape: BUTTON_SHAPES.CIRCULAR,
    children: "🚀",
    styleOverride: { style: { width: "70px", height: "70px" } },
  },
};
export const Pill: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.LARGE,
    shape: BUTTON_SHAPES.PILL,
    children: "Pill Button",
  },
};

export const IconOnly: Story = {
  args: {
    variant: BUTTON_VARIANTS.SECONDARY,
    size: BUTTON_SIZES.SMALL,
    icon: "⭐",
    ariaLabel: "Star",
  },
};

export const Loading: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.MEDIUM,
    isLoading: true,
    children: "Loading...",
  },
};

export const FullWidth: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    fullWidth: true,
    children: "------------------ Full Width Button -----------------",
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Tertiary: Story = {
  args: {
    variant: BUTTON_VARIANTS.TERTIARY,
    size: BUTTON_SIZES.MEDIUM,
    children: "Tertiary Button",
  },
};

/**
 * ## Button
 *
 * Buttons allow users to take actions, and make choices, with a single tap.
 *
 * ### When to use
 *
 * - To trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.
 * - To navigate users to another page or screen.
 *
 * ### When not to use
 *
 * - For navigation between pages. Use links instead.
 * - To submit a form when the action is not final. Use checkboxes or radio buttons instead.
 *
 * ### Accessibility
 *
 * - Ensure buttons have discernible text labels that clearly describe their action.
 * - Use ARIA attributes where necessary to enhance accessibility, especially for icon-only buttons.
 * - Ensure sufficient color contrast between button text and background for readability.
 *
 * ### Variants
 *
 * - **Primary**: Use for the main action on a page. There should be only one primary button per screen.
 * - **Secondary**: Use for secondary actions that are important but not the main focus.
 * - **Tertiary**: Use for less prominent actions, such as "Cancel" or "Learn More".
 *
 * ### Sizes
 *
 * - **XXLARGE**: Use for prominent actions that need to stand out, such as "Get Started" or "Sign Up".
 * - **XLARGE**: Suitable for key actions that require emphasis, like "Submit" or "Next".
 * - **LARGE**: Ideal for standard actions that are important but not the primary focus, such as "Save" or "Continue".
 * - **MEDIUM**: The default size for most buttons, suitable for general actions like "Edit" or "View".
 * - **SMALL**: Use for less critical actions or when space is limited, such as "Learn More" or "Details".
 * - **EXTRASMALL**: Best for compact spaces or secondary actions, like icon buttons or "Close".
 *
 * ### Shapes
 *
 * - **Square**: Standard button shape with slightly rounded corners. Suitable for most use cases.
 * - **Circular**: Perfect for icon-only buttons or when a distinct, attention-grabbing shape is needed.
 * - **Pill**: Ideal for actions that require a softer, more approachable look. Great for tags or filters.
 *
 * ### Loading State
 *
 * - Use the loading state to indicate that an action is in progress. This helps prevent duplicate actions and provides feedback to users.
 * - Optionally, provide loading text to inform users about the ongoing process.
 *
 * ### Full Width
 *
 * - Use full-width buttons for actions that need to span the entire width of their container, such as in forms or mobile views.
 *
 * ### Customization
 *
 * - The button component supports custom styles through the `styleOverride` prop, allowing for additional CSS classes or inline styles.
 *
 * ### Example Usage
 *
 * ```tsx
 * <Button variant="primary" size="large" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */

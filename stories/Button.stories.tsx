import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import {
  Button,
  BUTTON_SHAPES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ICON_POSITIONS,
  Icon,
} from "../src";
import { ICONS } from "../src/assets/iconType";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.MEDIUM,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    size: BUTTON_SIZES.LARGE,
    children: "Secondary Button",
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

export const XSmall: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.EXTRASMALL,
    children: "Extra Small Button",
  },
};

export const LeadingIcon: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.LARGE,
    children: "Leading Icon",
    icon: <Icon name={ICONS.UPLOAD_ICON} size={16} />,
    iconPosition: ICON_POSITIONS.START,
  },
};

export const TrailingIcon: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.LARGE,
    children: "Trailing Icon",
    icon: <Icon name={ICONS.DOWNLOAD_ICON} size={16} />,
    iconPosition: ICON_POSITIONS.END,
  },
};

export const Circular: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.LARGE,
    shape: BUTTON_SHAPES.CIRCULAR,
    icon: <Icon name={ICONS.PLUS_ICON} size={20} />,
    ariaLabel: "Add item",
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
    icon: <Icon name={ICONS.CHECKMARK_ICON} size={16} />,
    ariaLabel: "Confirm",
    iconPosition: ICON_POSITIONS.DEFAULT,
  },
};

export const Loading: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    size: BUTTON_SIZES.MEDIUM,
    isLoading: true,
    children: "Please wait...",
  },
};

export const FullWidth: Story = {
  args: {
    variant: BUTTON_VARIANTS.PRIMARY,
    fullWidth: true,
    children: "------------------ Full Width Button -----------------",
  },
};

export const Tertiary: Story = {
  args: {
    variant: BUTTON_VARIANTS.TERTIARY,
    size: BUTTON_SIZES.MEDIUM,
    children: "Tertiary Button",
  },
};

export const Plain: Story = {
  args: {
    variant: BUTTON_VARIANTS.PLAIN,
    size: BUTTON_SIZES.SMALL,
    icon: <Icon name={ICONS.SETTINGS_ICON} size={16} />,
    ariaLabel: "Settings",
  },
};

export const FullWidthComparison: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Button variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.LARGE}>
        Regular Large Button
      </Button>
      <Button variant={BUTTON_VARIANTS.PRIMARY} fullWidth>
        Full Width Button (no size needed)
      </Button>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};

/**
 * // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
 * - **Plain**: Use for minimal icon-only buttons or subtle actions with no background styling.
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
 * - When `fullWidth` is true, the button automatically gets appropriate sizing and ignores the `size` prop.
 * - Full-width buttons have consistent padding and font size optimized for spanning containers.
 *
 * ### Customization
 *
 * - The button component supports custom styles through the `styleOverride` prop, allowing for additional CSS classes or inline styles.
 *
 * ### Example Usage
 *
 * ```tsx
 * // Basic button
 * <Button variant="primary" size="large" onClick={handleClick}>
 *   Click Me
 * </Button>
 *
 * // Button with icon
 * <Button variant="secondary" icon={<Icon name={ICONS.SETTINGS_ICON} size={16} />}>
 *   Settings
 * </Button>
 *
 * // Icon-only button
 * <Button
 *   variant="plain"
 *   icon={<Icon name={ICONS.CLOSE_ICON} size={16} />}
 *   ariaLabel="Close dialog"
 * />
 *
 * // Full-width button
 * <Button variant="primary" fullWidth>
 *   Submit Form
 * </Button>
 * ```
 */

# Accordion Component

A robust, accessible accordion component with advanced features and stunning visual variants.

## Features

- **Multiple Expansion Modes**: Single or multiple items can be expanded simultaneously
- **Full Keyboard Navigation**: Arrow keys, Home, End, Enter, and Space support
- **5 Visual Variants**: Default, Outlined, Filled, Glass (Glassmorphism), and Gradient
- **3 Size Options**: Small, Medium, and Large
- **Smooth Animations**: Dynamic height calculations for seamless transitions
- **Loading States**: Built-in loading indicators
- **Disabled States**: Individual or global disable support
- **Icon Customization**: Custom icons with flexible positioning
- **Fully Responsive**: Works beautifully on all screen sizes
- **Accessibility First**: ARIA compliant with screen reader support
- **Controlled & Uncontrolled**: Supports both usage patterns
- **Lifecycle Callbacks**: Before/after expand and collapse hooks
- **Rich Content Support**: Accepts any React node as content

## Installation

The Accordion component is part of the Quick-UI component library.

```bash
npm install @quick-ui/react
```

## Basic Usage

```tsx
import { Accordion } from "@quick-ui/react";

const items = [
  {
    id: "item-1",
    title: "What is Quick-UI?",
    content: "Quick-UI is a modern React component library...",
  },
  {
    id: "item-2",
    title: "How do I get started?",
    content: "Getting started is easy! Simply install...",
  },
];

function App() {
  return <Accordion items={items} />;
}
```

## Visual Variants

### Default

Clean and simple design with borders.

```tsx
<Accordion items={items} variant="default" />
```

### Outlined

Modern outlined style with hover effects.

```tsx
<Accordion items={items} variant="outlined" />
```

### Filled

Subtle filled background that changes on expand.

```tsx
<Accordion items={items} variant="filled" />
```

### Glass (Glassmorphism)

Beautiful glassmorphic effect with backdrop blur.

```tsx
<Accordion items={items} variant="glass" />
```

### Gradient

Eye-catching gradient accents with smooth transitions.

```tsx
<Accordion items={items} variant="gradient" elevateExpanded />
```

## Expansion Modes

### Single Expansion (Default)

Only one item can be expanded at a time.

```tsx
<Accordion items={items} expandMode="single" />
```

### Multiple Expansion

Multiple items can be expanded simultaneously.

```tsx
<Accordion items={items} expandMode="multiple" />
```

## Advanced Features

### With Subtitles

```tsx
const items = [
  {
    id: "item-1",
    title: "Advanced Typography",
    subtitle: "Beautiful text rendering",
    content: "Our typography system ensures...",
  },
];

<Accordion items={items} />;
```

### With Icons

```tsx
const items = [
  {
    id: "docs",
    title: "Documentation",
    icon: <DocumentIcon />,
    content: "Access comprehensive documentation...",
  },
];

<Accordion items={items} iconPosition="start" />;
```

### With Loading States

```tsx
const items = [
  {
    id: "loading",
    title: "Loading Content",
    content: "Please wait...",
    isLoading: true,
  },
];

<Accordion items={items} />;
```

### With Disabled Items

```tsx
const items = [
  {
    id: "disabled",
    title: "Coming Soon",
    content: "This feature is not yet available.",
    disabled: true,
  },
];

<Accordion items={items} />;
```

### Controlled Mode

```tsx
function ControlledAccordion() {
  const [expanded, setExpanded] = useState(["item-1"]);

  return (
    <Accordion
      items={items}
      expanded={expanded}
      onChange={setExpanded}
      expandMode="multiple"
    />
  );
}
```

### With Lifecycle Callbacks

```tsx
<Accordion
  items={items}
  onBeforeExpand={(id) => console.log("Before expand:", id)}
  onAfterExpand={(id) => console.log("After expand:", id)}
  onBeforeCollapse={(id) => console.log("Before collapse:", id)}
  onAfterCollapse={(id) => console.log("After collapse:", id)}
  onChange={(expandedIds) => console.log("Changed:", expandedIds)}
/>
```

### Custom Transitions

```tsx
// Fast transition
<Accordion items={items} transitionDuration={150} />

// Slow transition
<Accordion items={items} transitionDuration={600} />
```

### Elevated Expanded Items

```tsx
<Accordion items={items} variant="outlined" elevateExpanded />
```

## Keyboard Navigation

- **Enter** or **Space**: Expand/collapse focused item
- **Arrow Down**: Move focus to next item
- **Arrow Up**: Move focus to previous item
- **Home**: Move focus to first item
- **End**: Move focus to last item

## Props

### Accordion Props

| Prop                 | Type                                    | Default           | Description                           |
| -------------------- | --------------------------------------- | ----------------- | ------------------------------------- |
| `items`              | `AccordionItemData[]`                   | **Required**      | Array of accordion items              |
| `variant`            | `AccordionVariant`                      | `"default"`       | Visual style variant                  |
| `size`               | `AccordionSize`                         | `"md"`            | Size of accordion items               |
| `expandMode`         | `ExpandMode`                            | `"single"`        | Single or multiple expansion          |
| `expanded`           | `string[]`                              | `undefined`       | Controlled expanded items             |
| `defaultExpanded`    | `string[]`                              | `[]`              | Default expanded items (uncontrolled) |
| `onChange`           | `(ids: string[]) => void`               | `undefined`       | Callback when expansion changes       |
| `expandIcon`         | `ReactNode`                             | `<ChevronIcon />` | Custom expand/collapse icon           |
| `iconPosition`       | `IconPosition`                          | `"end"`           | Position of expand icon               |
| `disabled`           | `boolean`                               | `false`           | Disable all items                     |
| `showDividers`       | `boolean`                               | `true`            | Show dividers between items           |
| `elevateExpanded`    | `boolean`                               | `false`           | Elevate expanded items with shadow    |
| `transitionDuration` | `number`                                | `300`             | Animation duration in ms              |
| `onBeforeExpand`     | `(id: string) => void \| Promise<void>` | `undefined`       | Before item expands                   |
| `onAfterExpand`      | `(id: string) => void`                  | `undefined`       | After item expands                    |
| `onBeforeCollapse`   | `(id: string) => void`                  | `undefined`       | Before item collapses                 |
| `onAfterCollapse`    | `(id: string) => void`                  | `undefined`       | After item collapses                  |
| `allowToggle`        | `boolean`                               | `true`            | Allow collapsing expanded items       |
| `emptyState`         | `ReactNode`                             | `undefined`       | Custom empty state                    |
| `className`          | `string`                                | `undefined`       | Additional CSS class                  |

### AccordionItemData

| Property    | Type        | Description                          |
| ----------- | ----------- | ------------------------------------ |
| `id`        | `string`    | **Required** - Unique identifier     |
| `title`     | `ReactNode` | **Required** - Item title/header     |
| `content`   | `ReactNode` | **Required** - Content when expanded |
| `disabled`  | `boolean`   | Whether item is disabled             |
| `isLoading` | `boolean`   | Whether item is loading              |
| `icon`      | `ReactNode` | Custom icon for this item            |
| `className` | `string`    | Custom class for this item           |
| `subtitle`  | `ReactNode` | Subtitle or secondary text           |

## Type Definitions

```typescript
type AccordionVariant =
  | "default"
  | "outlined"
  | "filled"
  | "glass"
  | "gradient";
type AccordionSize = "sm" | "md" | "lg";
type ExpandMode = "single" | "multiple";
type IconPosition = "start" | "end";
```

## Enums

```typescript
import {
  ACCORDION_VARIANTS,
  ACCORDION_SIZES,
  EXPAND_MODES,
  ACCORDION_ICON_POSITIONS,
} from '@quick-ui/react';

// Usage
<Accordion
  items={items}
  variant={ACCORDION_VARIANTS.GRADIENT}
  size={ACCORDION_SIZES.LARGE}
  expandMode={EXPAND_MODES.MULTIPLE}
  iconPosition={ACCORDION_ICON_POSITIONS.START}
/>
```

## Accessibility

The Accordion component follows WAI-ARIA best practices:

- Uses semantic HTML with proper ARIA attributes
- Full keyboard navigation support
- Screen reader announcements for state changes
- Focus management with visible focus indicators
- High contrast mode support
- Respects `prefers-reduced-motion` for users who prefer reduced animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Examples

### FAQ Section

```tsx
const faqItems = [
  {
    id: "shipping",
    title: "What are the shipping options?",
    content: "We offer standard, express, and overnight shipping...",
  },
  {
    id: "returns",
    title: "What is your return policy?",
    content: "Items can be returned within 30 days...",
  },
];

<Accordion items={faqItems} variant="outlined" />;
```

### Settings Panel

```tsx
const settingsItems = [
  {
    id: "account",
    title: "Account Settings",
    icon: <UserIcon />,
    content: <AccountSettingsForm />,
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: <LockIcon />,
    content: <PrivacySettings />,
  },
];

<Accordion
  items={settingsItems}
  variant="filled"
  expandMode="multiple"
  iconPosition="start"
/>;
```

## License

MIT © Quick-UI

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

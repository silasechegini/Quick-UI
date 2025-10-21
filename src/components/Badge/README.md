# Badge Component

A versatile notification indicator component that displays counts, status, or custom content. Perfect for showing unread messages, notifications, or status indicators on icons and other elements.

## Features

- 📊 **Numeric Counts**: Display notification counts with automatic "99+" formatting
- 🔴 **Dot Badges**: Simple status indicators without text
- 🎨 **7 Color Variants**: Primary, secondary, success, error, warning, info, neutral
- 📍 **5 Position Options**: Top-right, top-left, bottom-right, bottom-left, inline
- 📏 **3 Sizes**: Small, medium, large
- ✨ **Pulse Animation**: Optional pulsing effect for new notifications
- 🎯 **Flexible**: Works with any child element or standalone
- ♿ **Accessible**: ARIA-compliant with proper semantics

## Installation

```tsx
import { Badge, BADGE_VARIANTS, BADGE_POSITIONS } from "@components/Badge";
```

## Basic Usage

### Notification Badge on Icon

```tsx
<Badge count={5}>
  <Icon name="bell" />
</Badge>
```

### Dot Badge for Status

```tsx
<Badge type="dot" variant="success">
  <Icon name="user" />
</Badge>
```

### Standalone Badge

```tsx
<Badge position="inline" count={10} variant="primary" />
```

## Props

| Prop             | Type            | Default       | Description                              |
| ---------------- | --------------- | ------------- | ---------------------------------------- |
| `children`       | `ReactNode`     | -             | Element to attach badge to (e.g., icon)  |
| `count`          | `number`        | `0`           | Numeric count to display                 |
| `max`            | `number`        | `99`          | Maximum count before showing "max+"      |
| `showZero`       | `boolean`       | `false`       | Show badge when count is 0               |
| `variant`        | `BadgeVariant`  | `"primary"`   | Color variant                            |
| `size`           | `BadgeSize`     | `"md"`        | Size of the badge                        |
| `position`       | `BadgePosition` | `"top-right"` | Position relative to children            |
| `type`           | `BadgeType`     | `"standard"`  | Badge type: standard or dot              |
| `pulse`          | `boolean`       | `false`       | Add pulse animation                      |
| `invisible`      | `boolean`       | `false`       | Hide the badge                           |
| `content`        | `ReactNode`     | -             | Custom content instead of count          |
| `className`      | `string`        | -             | Additional CSS classes for container     |
| `badgeClassName` | `string`        | -             | Additional CSS classes for badge element |

## Variants

### Color Variants

```tsx
<Badge variant="primary" count={5} position="inline" />
<Badge variant="secondary" count={5} position="inline" />
<Badge variant="success" count={5} position="inline" />
<Badge variant="error" count={5} position="inline" />
<Badge variant="warning" count={5} position="inline" />
<Badge variant="info" count={5} position="inline" />
<Badge variant="neutral" count={5} position="inline" />
```

### Sizes

```tsx
<Badge size="sm" count={5} position="inline" />
<Badge size="md" count={5} position="inline" />
<Badge size="lg" count={5} position="inline" />
```

### Types

```tsx
{
  /* Standard badge with count */
}
<Badge type="standard" count={5}>
  <Icon name="mail" />
</Badge>;

{
  /* Dot badge for simple indicator */
}
<Badge type="dot" variant="success">
  <Icon name="user" />
</Badge>;
```

## Positioning

### On Icons or Elements

```tsx
{
  /* Top Right (default) */
}
<Badge position="top-right" count={5}>
  <Icon name="bell" />
</Badge>;

{
  /* Top Left */
}
<Badge position="top-left" count={5}>
  <Icon name="bell" />
</Badge>;

{
  /* Bottom Right */
}
<Badge position="bottom-right" count={5}>
  <Icon name="bell" />
</Badge>;

{
  /* Bottom Left */
}
<Badge position="bottom-left" count={5}>
  <Icon name="bell" />
</Badge>;
```

### Standalone (Inline)

```tsx
<Badge position="inline" count={5} />
```

## Advanced Examples

### Max Count

```tsx
{
  /* Shows "99+" when count exceeds 99 */
}
<Badge count={150} max={99}>
  <Icon name="mail" />
</Badge>;

{
  /* Custom max value */
}
<Badge count={1000} max={999}>
  <Icon name="notifications" />
</Badge>;
```

### Show Zero

```tsx
{
  /* Badge hidden when count is 0 */
}
<Badge count={0} showZero={false}>
  <Icon name="mail" />
</Badge>;

{
  /* Badge shows "0" */
}
<Badge count={0} showZero={true}>
  <Icon name="mail" />
</Badge>;
```

### Pulse Animation

```tsx
{
  /* Add pulsing effect for new notifications */
}
<Badge count={5} pulse>
  <Icon name="bell" />
</Badge>;
```

### Custom Content

```tsx
<Badge content="NEW" variant="error">
  <Icon name="star" />
</Badge>

<Badge content="!" variant="warning">
  <Button>Upgrade</Button>
</Badge>
```

### Invisible Badge

```tsx
{
  /* Useful for animations or conditional visibility */
}
<Badge count={5} invisible={!hasNotifications}>
  <Icon name="bell" />
</Badge>;
```

## Real-World Examples

### Email Inbox

```tsx
<Badge count={unreadEmails} variant="primary" max={99}>
  <Icon name="mail" size={24} />
</Badge>
```

### Shopping Cart

```tsx
<Badge count={cartItems} variant="error" pulse={hasNewItems}>
  <Icon name="shopping-cart" size={24} />
</Badge>
```

### Online Status

```tsx
<Badge type="dot" variant="success" position="bottom-right">
  <Avatar src={userAvatar} />
</Badge>
```

### Notification Bell

```tsx
<Badge
  count={notifications.length}
  variant="error"
  pulse={hasUnreadNotifications}
  max={99}
>
  <Icon name="bell" size={24} />
</Badge>
```

### Status Indicators

```tsx
{
  /* Active */
}
<Badge type="dot" variant="success">
  <span>Active User</span>
</Badge>;

{
  /* Pending */
}
<Badge type="dot" variant="warning">
  <span>Pending Review</span>
</Badge>;

{
  /* Offline */
}
<Badge type="dot" variant="neutral">
  <span>Offline</span>
</Badge>;
```

## Accessibility

The Badge component is designed with accessibility in mind:

- Uses semantic HTML with proper `role` attributes
- Respects `prefers-reduced-motion` for animations
- High contrast mode support
- Works with screen readers when combined with proper ARIA labels on parent elements

```tsx
<div role="button" aria-label={`Notifications: ${count} unread`}>
  <Badge count={count}>
    <Icon name="bell" />
  </Badge>
</div>
```

## Styling

### Custom Classes

```tsx
<Badge count={5} className="custom-container" badgeClassName="custom-badge">
  <Icon name="mail" />
</Badge>
```

### CSS Variables

The Badge component uses CSS custom properties for theming:

- `--color-primary`
- `--color-secondary`
- `--color-success`
- `--color-error`
- `--color-warning`
- `--color-info`
- `--gray-500`

## TypeScript

The component is fully typed with TypeScript:

```tsx
import { BadgeProps, BADGE_VARIANTS, BADGE_POSITIONS } from "@components/Badge";

const MyComponent: React.FC = () => {
  const badgeProps: BadgeProps = {
    count: 5,
    variant: BADGE_VARIANTS.ERROR,
    position: BADGE_POSITIONS.TOP_RIGHT,
    pulse: true,
  };

  return (
    <Badge {...badgeProps}>
      <Icon name="bell" />
    </Badge>
  );
};
```

## Browser Support

Works in all modern browsers with CSS custom properties support.

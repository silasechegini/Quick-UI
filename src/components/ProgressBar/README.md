# ProgressBar Component

A flexible and accessible progress bar component that supports various visual styles, animations, and display options.

## Features

- **Multiple Variants**: Default, success, warning, error, and info themes
- **Flexible Sizing**: Small, medium, and large sizes
- **Shape Options**: Rounded or square corners
- **Visual Effects**: Striped patterns with optional animation
- **Display Options**: Show percentage, value/max, or custom content
- **Indeterminate State**: For unknown progress duration
- **Accessibility**: Full ARIA support and keyboard navigation
- **Customizable**: Custom colors and styling options
- **Responsive**: Works across different screen sizes

## Basic Usage

```tsx
import { ProgressBar } from "@quick-ui/components";

// Simple progress bar
<ProgressBar value={65} />

// With percentage display
<ProgressBar value={75} showPercentage />

// Success variant with animation
<ProgressBar
  value={100}
  variant="success"
  striped
  animated
/>
```

## Props

| Prop              | Type                  | Default     | Description                                       |
| ----------------- | --------------------- | ----------- | ------------------------------------------------- |
| `value`           | `number`              | -           | Current progress value (0-max)                    |
| `max`             | `number`              | `100`       | Maximum value                                     |
| `variant`         | `ProgressBarVariants` | `"default"` | Visual theme variant                              |
| `size`            | `ProgressBarSizes`    | `"medium"`  | Size of the progress bar                          |
| `shape`           | `ProgressBarShapes`   | `"rounded"` | Corner style                                      |
| `showPercentage`  | `boolean`             | `false`     | Display percentage text                           |
| `showValue`       | `boolean`             | `false`     | Display current/max values                        |
| `label`           | `string`              | -           | Accessible label (auto-generated if not provided) |
| `children`        | `ReactNode`           | -           | Custom content to display                         |
| `striped`         | `boolean`             | `false`     | Show striped pattern                              |
| `animated`        | `boolean`             | `false`     | Animate stripes (requires striped=true)           |
| `indeterminate`   | `boolean`             | `false`     | Show loading state with unknown duration          |
| `color`           | `string`              | -           | Custom fill color                                 |
| `backgroundColor` | `string`              | -           | Custom background color                           |
| `className`       | `string`              | -           | Additional CSS classes                            |

## Variants

### Default Variants

- `default` - Blue progress bar
- `success` - Green for completed/successful states
- `warning` - Yellow for warning states
- `error` - Red for error/failed states
- `info` - Cyan for informational states

```tsx
<ProgressBar value={60} variant="default" />
<ProgressBar value={100} variant="success" />
<ProgressBar value={70} variant="warning" />
<ProgressBar value={25} variant="error" />
<ProgressBar value={45} variant="info" />
```

## Sizes

```tsx
<ProgressBar value={60} size="small" />   {/* 0.5rem height */}
<ProgressBar value={60} size="medium" />  {/* 1rem height */}
<ProgressBar value={60} size="large" />   {/* 1.5rem height */}
```

## Display Options

### Show Percentage

```tsx
<ProgressBar value={75} showPercentage />
// Displays: "75%"
```

### Show Value/Max

```tsx
<ProgressBar value={30} max={50} showValue />
// Displays: "30/50"
```

### Custom Content

```tsx
<ProgressBar value={45}>
  <span>Uploading... 45%</span>
</ProgressBar>
```

## Visual Effects

### Striped Pattern

```tsx
<ProgressBar value={60} striped />
```

### Animated Stripes

```tsx
<ProgressBar value={60} striped animated />
```

### Indeterminate State

```tsx
<ProgressBar indeterminate />
```

## Custom Styling

### Custom Colors

```tsx
<ProgressBar value={60} color="#ff6b6b" backgroundColor="#f1f3f4" />
```

### CSS Classes

```tsx
<ProgressBar value={60} className="my-custom-progress" />
```

## Examples

### File Upload Progress

```tsx
const [progress, setProgress] = useState(0);

return (
  <ProgressBar
    value={progress}
    showPercentage
    variant={progress === 100 ? "success" : "default"}
    striped
    animated={progress < 100}
  />
);
```

### Loading State

```tsx
<ProgressBar indeterminate label="Loading data..." variant="info" />
```

### System Status Dashboard

```tsx
<div>
  <div>CPU Usage</div>
  <ProgressBar value={42} variant="info" />

  <div>Memory Usage</div>
  <ProgressBar value={78} variant="warning" />

  <div>Disk Usage</div>
  <ProgressBar value={95} variant="error" />
</div>
```

## Accessibility

The ProgressBar component includes comprehensive accessibility features:

- **ARIA Attributes**: Proper `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Labels**: Automatic or custom accessible labels
- **Screen Reader Support**: Text content marked as `aria-hidden` to prevent duplication
- **Keyboard Navigation**: Focusable with visible focus indicators
- **High Contrast**: Supports high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

## CSS Variables

Customize appearance using CSS custom properties:

```css
.my-progress {
  --progress-bg: #e9ecef;
  --progress-default: #007bff;
  --progress-success: #28a745;
  --progress-warning: #ffc107;
  --progress-error: #dc3545;
  --progress-info: #17a2b8;
  --progress-text-color: #fff;
  --progress-text-color-dark: #212529;
  --progress-border-radius: 0.25rem;
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import {
  ProgressBar,
  ProgressBarProps,
  PROGRESS_BAR_VARIANTS,
  PROGRESS_BAR_SIZES,
  PROGRESS_BAR_SHAPES,
} from "@quick-ui/components";

const MyProgress: React.FC<{ progress: number }> = ({ progress }) => (
  <ProgressBar
    value={progress}
    variant={PROGRESS_BAR_VARIANTS.SUCCESS}
    size={PROGRESS_BAR_SIZES.LARGE}
    showPercentage
  />
);
```

## Best Practices

1. **Use appropriate variants** - Match the variant to the context (success for completed, error for failed)
2. **Provide labels** - Always include accessible labels for screen readers
3. **Consider animation** - Use animation sparingly and respect reduced motion preferences
4. **Show progress text** - Display percentage or values when helpful for users
5. **Handle edge cases** - Consider 0%, 100%, and indeterminate states
6. **Test accessibility** - Verify with screen readers and keyboard navigation

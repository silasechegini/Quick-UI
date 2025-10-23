# Modal Component

A flexible and accessible modal dialog component with multiple variants, sizes, and animation options. Built with React portals for proper rendering outside the DOM hierarchy.

## Features

- 🎨 **5 Size Options**: Small, Medium, Large, Extra Large, and Full viewport
- ✨ **4 Animation Variants**: Default (fade + scale), Centered (fade only), Slide-up, and Slide-right (sidebar)
- ♿ **Accessible**: Full ARIA support, keyboard navigation, and focus management
- 🎯 **Portal Rendering**: Renders outside DOM hierarchy using React portals
- 🔐 **Focus Management**: Saves and restores focus state automatically
- ⌨️ **Keyboard Support**: ESC key to close (configurable)
- 🖱️ **Overlay Click**: Close by clicking outside (configurable)
- 📱 **Responsive**: Works seamlessly on mobile and desktop
- 🎭 **Custom Styling**: Six className props for complete style control
- 📜 **Scrollable**: Optional scrollable body for long content
- 🚫 **Body Scroll Prevention**: Prevents background scrolling when modal is open

## Installation

```tsx
import { Modal, MODAL_SIZES, MODAL_VARIANTS } from "quick-ui";
```

## Basic Usage

```tsx
import { useState } from "react";
import { Modal } from "quick-ui";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
}
```

## Sizes

### Small Modal (400px)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Small Modal"
  size={MODAL_SIZES.SMALL}
>
  Compact modal for simple confirmations.
</Modal>
```

### Medium Modal (600px) - Default

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Medium Modal"
  size={MODAL_SIZES.MEDIUM} // or omit (this is the default)
>
  Standard modal for general use.
</Modal>
```

### Large Modal (800px)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Large Modal"
  size={MODAL_SIZES.LARGE}
>
  Spacious modal for forms and detailed content.
</Modal>
```

### Extra Large Modal (1200px)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Extra Large Modal"
  size={MODAL_SIZES.EXTRA_LARGE}
>
  Very wide modal for complex interfaces.
</Modal>
```

### Full Size Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Full Size Modal"
  size={MODAL_SIZES.FULL}
>
  Takes up the entire viewport with padding.
</Modal>
```

## Animation Variants

### Default Variant (Fade + Scale)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  variant={MODAL_VARIANTS.DEFAULT} // or omit (this is the default)
>
  Fades in with a subtle scale animation.
</Modal>
```

### Centered Variant (Fade Only)

```tsx
<Modal isOpen={isOpen} onClose={handleClose} variant={MODAL_VARIANTS.CENTERED}>
  Fades in without any scale effect.
</Modal>
```

### Slide-Up Variant

```tsx
<Modal isOpen={isOpen} onClose={handleClose} variant={MODAL_VARIANTS.SLIDE_UP}>
  Slides up from the bottom of the screen.
</Modal>
```

### Slide-Right Variant (Sidebar)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  variant={MODAL_VARIANTS.SLIDE_RIGHT}
  size={MODAL_SIZES.MEDIUM}
>
  Slides in from the right, perfect for side panels.
</Modal>
```

## Common Patterns

### Confirmation Dialog

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Delete Item"
  size={MODAL_SIZES.SMALL}
  footer={
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={handleClose}>Cancel</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  }
>
  <p>Are you sure you want to delete this item?</p>
  <p style={{ color: "red" }}>This action cannot be undone.</p>
</Modal>
```

### Form Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Create User"
  size={MODAL_SIZES.MEDIUM}
  footer={
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={handleClose}>Cancel</button>
      <button onClick={handleSubmit}>Create</button>
    </div>
  }
>
  <form>
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
    <select>
      <option>Role</option>
    </select>
  </form>
</Modal>
```

### Scrollable Content

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Terms and Conditions"
  scrollable={true}
>
  <div>
    {/* Long content that will scroll */}
    <p>Lorem ipsum...</p>
    <p>Lorem ipsum...</p>
    {/* ... more content ... */}
  </div>
</Modal>
```

### Side Panel (Drawer)

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Settings"
  variant={MODAL_VARIANTS.SLIDE_RIGHT}
  size={MODAL_SIZES.MEDIUM}
>
  <div>Settings content goes here</div>
</Modal>
```

### Full Screen Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Full Screen Experience"
  size={MODAL_SIZES.FULL}
>
  <div>Full viewport content</div>
</Modal>
```

## Controlling Close Behavior

### Disable Overlay Click to Close

```tsx
<Modal isOpen={isOpen} onClose={handleClose} closeOnOverlayClick={false}>
  You must use the close button or ESC key.
</Modal>
```

### Disable ESC Key to Close

```tsx
<Modal isOpen={isOpen} onClose={handleClose} closeOnEsc={false}>
  You must use the close button or click outside.
</Modal>
```

### Hide Close Button

```tsx
<Modal isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
  No close button in the header.
</Modal>
```

### Prevent All Closing Methods

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  closeOnOverlayClick={false}
  closeOnEsc={false}
  showCloseButton={false}
>
  Modal can only be closed programmatically by changing isOpen prop.
</Modal>
```

## Lifecycle Callbacks

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  onAfterOpen={() => console.log("Modal opened!")}
  onAfterClose={() => console.log("Modal closed!")}
>
  Modal with lifecycle callbacks
</Modal>
```

## Custom Styling

The Modal component provides six className props for complete styling control:

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  className="custom-modal" // Styles the modal container
  overlayClassName="custom-overlay" // Styles the backdrop
  contentClassName="custom-content" // Styles the content wrapper
  headerClassName="custom-header" // Styles the header
  bodyClassName="custom-body" // Styles the body
  footerClassName="custom-footer" // Styles the footer
>
  Fully customized modal
</Modal>
```

## Body Scroll Prevention

By default, the modal prevents body scrolling when open. You can disable this:

```tsx
<Modal isOpen={isOpen} onClose={handleClose} preventBodyScroll={false}>
  Body can still scroll when this modal is open
</Modal>
```

## Accessibility

The Modal component is built with accessibility in mind:

- **ARIA Attributes**: Proper `role="dialog"` and `aria-modal="true"`
- **Focus Management**: Automatically focuses the modal on open and restores focus on close
- **Keyboard Navigation**: ESC key to close (configurable)
- **Screen Reader Support**: Proper labeling with `aria-label` and `aria-describedby`
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **High Contrast**: Extra borders in high-contrast mode

### Accessibility Props

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="My Modal" // Used as aria-label if it's a string
  ariaLabel="Custom modal label" // Override aria-label
  ariaDescribedby="modal-description" // Link to description element
>
  <p id="modal-description">This describes the modal content.</p>
</Modal>
```

## Advanced Examples

### Multi-Step Form Modal

```tsx
function MultiStepModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={`Step ${step} of 3`}
      footer={
        <div style={{ display: "flex", gap: "10px" }}>
          <button disabled={step === 1} onClick={() => setStep(step - 1)}>
            Previous
          </button>
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)}>Next</button>
          ) : (
            <button onClick={() => setIsOpen(false)}>Finish</button>
          )}
        </div>
      }
    >
      {step === 1 && <div>Step 1 content</div>}
      {step === 2 && <div>Step 2 content</div>}
      {step === 3 && <div>Step 3 content</div>}
    </Modal>
  );
}
```

### Nested Modals

```tsx
function NestedModals() {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isFirstOpen}
        onClose={() => setIsFirstOpen(false)}
        title="First Modal"
      >
        <button onClick={() => setIsSecondOpen(true)}>Open Second Modal</button>
      </Modal>

      <Modal
        isOpen={isSecondOpen}
        onClose={() => setIsSecondOpen(false)}
        title="Second Modal"
        zIndex={1001} // Higher than first modal
      >
        This is a nested modal.
      </Modal>
    </>
  );
}
```

### Loading Modal

```tsx
<Modal
  isOpen={isLoading}
  onClose={() => {}}
  closeOnOverlayClick={false}
  closeOnEsc={false}
  showCloseButton={false}
  size={MODAL_SIZES.SMALL}
>
  <div style={{ textAlign: "center" }}>
    <div className="spinner" />
    <p>Loading...</p>
  </div>
</Modal>
```

## Props

| Prop                  | Type                  | Default                  | Description                         |
| --------------------- | --------------------- | ------------------------ | ----------------------------------- |
| `isOpen`              | `boolean`             | **Required**             | Controls modal visibility           |
| `onClose`             | `() => void`          | **Required**             | Callback when modal should close    |
| `title`               | `string \| ReactNode` | `undefined`              | Modal title (shown in header)       |
| `children`            | `ReactNode`           | `undefined`              | Modal body content                  |
| `footer`              | `ReactNode`           | `undefined`              | Footer content (typically buttons)  |
| `size`                | `MODAL_SIZES`         | `MODAL_SIZES.MEDIUM`     | Modal width                         |
| `variant`             | `MODAL_VARIANTS`      | `MODAL_VARIANTS.DEFAULT` | Animation variant                   |
| `closeOnOverlayClick` | `boolean`             | `true`                   | Allow closing by clicking overlay   |
| `closeOnEsc`          | `boolean`             | `true`                   | Allow closing with ESC key          |
| `showCloseButton`     | `boolean`             | `true`                   | Show close button in header         |
| `scrollable`          | `boolean`             | `true`                   | Make body scrollable                |
| `preventBodyScroll`   | `boolean`             | `true`                   | Prevent body scroll when open       |
| `className`           | `string`              | `undefined`              | Custom class for modal container    |
| `overlayClassName`    | `string`              | `undefined`              | Custom class for overlay            |
| `contentClassName`    | `string`              | `undefined`              | Custom class for content wrapper    |
| `headerClassName`     | `string`              | `undefined`              | Custom class for header             |
| `bodyClassName`       | `string`              | `undefined`              | Custom class for body               |
| `footerClassName`     | `string`              | `undefined`              | Custom class for footer             |
| `ariaLabel`           | `string`              | `undefined`              | Custom aria-label (overrides title) |
| `ariaDescribedby`     | `string`              | `undefined`              | ID of element describing modal      |
| `onAfterOpen`         | `() => void`          | `undefined`              | Callback after modal opens          |
| `onAfterClose`        | `() => void`          | `undefined`              | Callback after modal closes         |
| `zIndex`              | `number`              | `1000`                   | Z-index for modal                   |

## Enums

### MODAL_SIZES

```tsx
enum MODAL_SIZES {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
  EXTRA_LARGE = "xl",
  FULL = "full",
}
```

### MODAL_VARIANTS

```tsx
enum MODAL_VARIANTS {
  DEFAULT = "default",
  CENTERED = "centered",
  SLIDE_UP = "slide-up",
  SLIDE_RIGHT = "slide-right",
}
```

## Browser Support

The Modal component uses React portals and modern CSS features. It requires:

- React 18+ for portals
- Modern browsers with support for:
  - CSS backdrop-filter
  - CSS animations
  - CSS custom properties

## Best Practices

1. **Always provide a title or ariaLabel** for accessibility
2. **Use appropriate sizes** based on content complexity
3. **Provide clear close mechanisms** (buttons, ESC, overlay click)
4. **Handle focus properly** - let the component manage focus automatically
5. **Use footer for actions** - keep primary actions in the footer
6. **Test keyboard navigation** - ensure all interactive elements are reachable
7. **Respect user preferences** - the component automatically respects reduced-motion
8. **Clean up on unmount** - the component handles cleanup automatically

## Troubleshooting

**Modal not appearing?**

- Check that `isOpen` is true
- Verify no z-index conflicts with other elements
- Check browser console for errors

**Close button not working?**

- Ensure `onClose` callback is provided
- Check that `showCloseButton` is not false

**Overlay click not closing?**

- Verify `closeOnOverlayClick` is true (default)
- Check that content isn't capturing click events

**ESC key not closing?**

- Ensure `closeOnEsc` is true (default)
- Check for other event listeners that might prevent default

**Content not scrolling?**

- Verify `scrollable` is true (default)
- Check if content height exceeds modal height

## Related Components

- **Button** - For action buttons in modal footer
- **Card** - Alternative for non-modal content containers
- **Flyout** - For smaller, contextual overlays

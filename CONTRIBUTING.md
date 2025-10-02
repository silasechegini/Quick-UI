# Contributing to Quick-UI

Thank you for your interest in contributing to Quick-UI! This guide will help you get started with development.

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: Latest version

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Quick-UI.git
cd Quick-UI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Environment

```bash
npm run storybook
```

This starts the Storybook development server at `http://localhost:6006`.

## Development Workflow

### Creating a New Component

1. **Create the component directory:**

   ```
   src/components/MyComponent/
   ├── MyComponent.tsx          # Main component
   ├── MyComponent.types.ts     # TypeScript interfaces
   ├── styles.module.scss       # Component styles
   ├── index.ts                 # Exports
   └── MyComponent.stories.tsx  # Storybook stories
   ```

2. **Add tests:**

   ```
   src/components/MyComponent/__tests__/
   └── MyComponent.spec.tsx
   ```

3. **Export in main index:**
   Add your component to `src/index.ts`:
   ```typescript
   export * from "./components/MyComponent";
   ```

### Code Style Guidelines

- **TypeScript**: Use strict types, avoid `any`
- **React**: Use functional components with hooks
- **Styling**: Use SCSS modules, follow BEM naming convention
- **Testing**: Write comprehensive tests for all functionality
- **Accessibility**: Ensure components are accessible (use a11y addon)

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality

```bash
# Check linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Check code formatting
npm run format:check

# Format code
npm run format
```

### Building

```bash
# Build the library
npm run build

# Build Storybook
npm run build-storybook
```

## Component Guidelines

### Component Structure

```tsx
// MyComponent.tsx
import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { MyComponentProps } from "./MyComponent.types";

export const MyComponent: React.FC<MyComponentProps> = ({
  children,
  variant = "default",
  className,
  ...rest
}) => {
  const componentClasses = classNames(
    styles.component,
    styles[variant],
    className,
  );

  return (
    <div className={componentClasses} {...rest}>
      {children}
    </div>
  );
};

export default MyComponent;
```

### TypeScript Types

```tsx
// MyComponent.types.ts
import { ReactNode, HTMLAttributes } from "react";

export interface MyComponentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}
```

### Styling

```scss
// styles.module.scss
@import "../../styles/variables";
@import "../../styles/mixins";

.component {
  // Base styles
  padding: 1rem;
  border-radius: $border-radius-medium;

  // Variants
  &.default {
    background-color: $color-neutral-100;
  }

  &.primary {
    background-color: $color-primary-500;
    color: $color-white;
  }

  &.secondary {
    background-color: $color-secondary-500;
    color: $color-white;
  }
}
```

### Storybook Stories

```tsx
// MyComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta = {
  title: "Components/MyComponent",
  component: MyComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary"],
    },
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default component",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary component",
    variant: "primary",
  },
};
```

### Testing

```tsx
// __tests__/MyComponent.spec.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../MyComponent";

describe("MyComponent", () => {
  it("renders children correctly", () => {
    render(<MyComponent>Test content</MyComponent>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    render(<MyComponent variant="primary">Test</MyComponent>);
    const component = screen.getByText("Test");
    expect(component).toHaveClass("primary");
  });

  it("forwards additional props", () => {
    render(<MyComponent data-testid="test">Test</MyComponent>);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
```

## Pull Request Process

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/component-name
   ```

2. **Make your changes and commit:**

   ```bash
   git add .
   git commit -m "feat: add MyComponent with primary and secondary variants"
   ```

3. **Run all checks:**

   ```bash
   npm test
   npm run lint
   npm run format:check
   npm run build
   ```

4. **Push and create PR:**

   ```bash
   git push origin feature/component-name
   ```

5. **Create a Pull Request** with:
   - Clear description of changes
   - Screenshots (if UI changes)
   - Link to any related issues

## Commit Message Guidelines

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Getting Help

- 📚 Check existing components for examples
- 🐛 Open an issue for bugs
- 💡 Open a discussion for feature ideas
- 📖 Refer to Storybook documentation

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards

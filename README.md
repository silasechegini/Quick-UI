# Quick-UI

A modern React component library built with TypeScript, featuring reusable UI components, comprehensive documentation, and modern development tooling.

## Features

- 🚀 Reusable React components with TypeScript.
- 📚 Interactive documentation with Storybook.
- ✅ Comprehensive testing with Vitest.
- 🎨 SCSS modules for styling.
- 🔧 Modern build tooling with tsup.
- 📦 Tree-shakeable ESM and CJS builds.
- ♿ Accessibility testing with @storybook/addon-a11y.
- 🔍 Linting with ESLint and formatting with Prettier.

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Quick-UI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development with Storybook

```bash
npm run storybook
```

This will start the Storybook development server at `http://localhost:6006` where you can view and interact with all components.

## Available Scripts

### Development

- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

### Building

- `npm run build` - Build the component library for production
- Output will be generated in the `dist/` directory with both ESM and CJS formats

### Testing

- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Code Quality

- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

## Project Structure

```
Quick-UI/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button/
│   │   ├── ComboBox/
│   │   ├── MultiSelect/
│   │   └── ...
│   ├── documentation/        # Documentation pages
│   │   ├── introduction/
│   │   └── read-me/
│   ├── assets/              # Icons and static assets
│   ├── styles/              # Global styles and SCSS variables
│   └── index.ts             # Main library exports
├── stories/                 # Storybook stories
├── .storybook/             # Storybook configuration
├── dist/                   # Built library output
└── __mocks__/              # Test mocks
```

## Using Components

After building the library, you can import components like this:

```tsx
import { Button, ComboBox, MultiSelect } from "quick-ui";

function MyApp() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <ComboBox
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ]}
      />
    </div>
  );
}
```

## Development Workflow

1. **Component Development**: Create components in `src/components/`
2. **Documentation**: Add Storybook stories in the component directory
3. **Testing**: Write tests alongside components using Vitest
4. **Styling**: Use SCSS modules for component-specific styles
5. **Export**: Add component exports to `src/index.ts`

## Component Guidelines

- Each component should have its own directory with:
  - `ComponentName.tsx` - Main component file
  - `ComponentName.types.ts` - TypeScript interfaces
  - `styles.module.scss` - Component styles
  - `index.ts` - Component exports
  - `ComponentName.stories.tsx` - Storybook stories

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run linting (`npm run lint`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Support

For questions or issues, please open an issue on GitHub.

import React from "react";

const ReadMePage: React.FC = () => (
  <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
    <h1>Quick-UI</h1>
    <p>
      <strong>Quick-UI</strong> is a modern React component library built with
      TypeScript, featuring reusable UI components, comprehensive documentation,
      and modern development tooling.
    </p>

    <h2>Features</h2>
    <ul>
      <li>🚀 Reusable React components with TypeScript</li>
      <li>📚 Interactive documentation with Storybook</li>
      <li>✅ Comprehensive testing with Vitest</li>
      <li>🎨 SCSS modules for styling</li>
      <li>🔧 Modern build tooling with tsup</li>
      <li>📦 Tree-shakeable ESM and CJS builds</li>
      <li>♿ Accessibility testing with @storybook/addon-a11y</li>
    </ul>

    <h2>Getting Started</h2>
    <ol>
      <li>
        <strong>Install dependencies:</strong>
        <pre>npm install</pre>
      </li>
      <li>
        <strong>Start Storybook development server:</strong>
        <pre>npm run storybook</pre>
      </li>
      <li>
        <strong>Build the component library:</strong>
        <pre>npm run build</pre>
      </li>
      <li>
        <strong>Run tests:</strong>
        <pre>npm test</pre>
      </li>
    </ol>

    <h2>Project Structure</h2>
    <pre>
      {`Quick-UI/
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
    └── __mocks__/              # Test mocks`}
    </pre>

    <h2>Available Scripts</h2>
    <ul>
      <li>
        <code>npm run storybook</code> - Start Storybook development server
      </li>
      <li>
        <code>npm run build</code> - Build the component library for production
      </li>
      <li>
        <code>npm test</code> - Run all tests
      </li>
      <li>
        <code>npm run lint</code> - Run ESLint to check for code issues
      </li>
      <li>
        <code>npm run format</code> - Format code with Prettier
      </li>
    </ul>

    <h2>Using Components</h2>
    <p>
      After building the library, you can import components from the main index:
    </p>
    <pre>
      {`import { Button, ComboBox, MultiSelect } from 'quick-ui';

    function MyApp() {
        return (
            <div>
            <Button variant="primary">Click me</Button>
            <ComboBox
                options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' }
                ]}
            />
            </div>
        );
    }`}
    </pre>

    <h2>Development Workflow</h2>
    <ol>
      <li>
        <strong>Component Development:</strong> Create components in{" "}
        <code>src/components/</code>
      </li>
      <li>
        <strong>Documentation:</strong> Add Storybook stories in the component
        directory
      </li>
      <li>
        <strong>Testing:</strong> Write tests alongside components using Vitest
      </li>
      <li>
        <strong>Styling:</strong> Use SCSS modules for component-specific styles
      </li>
      <li>
        <strong>Export:</strong> Add component exports to{" "}
        <code>src/index.ts</code>
      </li>
    </ol>

    <h2>Contributing</h2>
    <ol>
      <li>Fork the repository</li>
      <li>
        Create a feature branch (
        <code>git checkout -b feature/amazing-feature</code>)
      </li>
      <li>
        Make your changes and run tests (<code>npm test</code>)
      </li>
      <li>
        Run linting (<code>npm run lint</code>)
      </li>
      <li>Commit your changes and push to the branch</li>
      <li>Open a Pull Request</li>
    </ol>

    <h2>License</h2>
    <p>This project is licensed under the ISC License.</p>

    <h2>Support</h2>
    <p>For questions or issues, please open an issue on GitHub.</p>
  </div>
);

export default ReadMePage;

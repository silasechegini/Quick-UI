import React from "react";

const ReadMePage: React.FC = () => (
  <div
    style={{
      padding: "2rem",
      maxWidth: 900,
      margin: "0 auto",
      lineHeight: 1.6,
      color: "#333",
    }}
  >
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      <h1
        style={{
          color: "#2563eb",
          fontSize: "2.5rem",
          margin: "0 0 0.5rem 0",
        }}
      >
        ⚡ Quick-UI React
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#64748b", margin: 0 }}>
        <strong>
          The React Component Library That Developers Actually Want to Use
        </strong>
      </p>
    </div>

    <h2
      style={{
        color: "#1e40af",
        borderBottom: "2px solid #3b82f6",
        paddingBottom: "0.5rem",
      }}
    >
      Why Quick-UI?
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          padding: "1rem",
          background: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3 style={{ color: "#059669", margin: "0 0 0.5rem 0" }}>
          Blazing Fast
        </h3>
        <ul style={{ margin: 0, paddingLeft: "1rem" }}>
          <li>20+ Production-Ready Components</li>
          <li>Zero Configuration Styling</li>
          <li>Mobile-First Design</li>
          <li>WCAG 2.1 AA Accessible</li>
        </ul>
      </div>
      <div
        style={{
          padding: "1rem",
          background: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3 style={{ color: "#7c3aed", margin: "0 0 0.5rem 0" }}>
          Developer Experience
        </h3>
        <ul style={{ margin: 0, paddingLeft: "1rem" }}>
          <li>100% TypeScript with IntelliSense</li>
          <li>Tree-Shakeable (103KB bundle)</li>
          <li>Interactive Storybook Docs</li>
          <li>915+ Unit Tests (99% coverage)</li>
        </ul>
      </div>
    </div>

    <h2
      style={{
        color: "#1e40af",
        borderBottom: "2px solid #3b82f6",
        paddingBottom: "0.5rem",
      }}
    >
      Getting Started
    </h2>
    <div
      style={{
        background: "#f1f5f9",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "2rem",
      }}
    >
      <h3 style={{ color: "#0f172a", margin: "0 0 1rem 0" }}>
        1. Install Quick-UI
      </h3>
      <pre
        style={{
          background: "#1e293b",
          color: "#e2e8f0",
          padding: "1rem",
          borderRadius: "6px",
          overflow: "auto",
          margin: "0 0 1rem 0",
        }}
      >
        npm install quick-ui-react
      </pre>

      <h3 style={{ color: "#0f172a", margin: "1rem 0 1rem 0" }}>
        2. In Root Component, Import Styles
      </h3>
      <pre
        style={{
          background: "#1e293b",
          color: "#e2e8f0",
          padding: "1rem",
          borderRadius: "6px",
          overflow: "auto",
          margin: 0,
        }}
      >
        {`// Import Quick-UI styles ONCE in root file;

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'quick-ui-react/styles' // Import Quick-UI styles;
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
}`}
      </pre>

      <h3 style={{ color: "#0f172a", margin: "1rem 0 1rem 0" }}>
        3. Import and Use Components
      </h3>
      <pre
        style={{
          background: "#1e293b",
          color: "#e2e8f0",
          padding: "1rem",
          borderRadius: "6px",
          overflow: "auto",
          margin: 0,
        }}
      >
        {`import { Button, Card, Avatar } from 'quick-ui-react';

function App() {
  return (
    <Card title="Welcome!">
      <Avatar fallbackText="JS" />
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}`}
      </pre>
    </div>

    <h2
      style={{
        color: "#1e40af",
        borderBottom: "2px solid #3b82f6",
        paddingBottom: "0.5rem",
      }}
    >
      Available Components
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div>
        <h4 style={{ color: "#059669", margin: "0 0 0.5rem 0" }}>
          Layout & Navigation
        </h4>
        <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.9rem" }}>
          <li>Card</li>
          <li>Header</li>
          <li>Footer</li>
          <li>Page</li>
        </ul>
      </div>
      <div>
        <h4 style={{ color: "#7c3aed", margin: "0 0 0.5rem 0" }}>
          Form Controls
        </h4>
        <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.9rem" }}>
          <li>Button</li>
          <li>Input</li>
          <li>MultiSelect</li>
          <li>ComboBox</li>
          <li>Toggle</li>
          <li>Switch</li>
        </ul>
      </div>
      <div>
        <h4 style={{ color: "#dc2626", margin: "0 0 0.5rem 0" }}>
          Data Display
        </h4>
        <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.9rem" }}>
          <li>Avatar</li>
          <li>Badge</li>
          <li>Chip</li>
          <li>ProgressBar</li>
          <li>Accordion</li>
        </ul>
      </div>
      <div>
        <h4 style={{ color: "#ea580c", margin: "0 0 0.5rem 0" }}>
          Interactive
        </h4>
        <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.9rem" }}>
          <li>Flyout</li>
          <li>Slider</li>
          <li>Icon</li>
        </ul>
      </div>
    </div>

    <h2
      style={{
        color: "#1e40af",
        borderBottom: "2px solid #3b82f6",
        paddingBottom: "0.5rem",
      }}
    >
      TypeScript Support
    </h2>
    <div
      style={{
        background: "#f8fafc",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "2rem",
      }}
    >
      <p>
        Quick-UI provides excellent TypeScript support with full IntelliSense:
      </p>
      <pre
        style={{
          background: "#1e293b",
          color: "#e2e8f0",
          padding: "1rem",
          borderRadius: "6px",
          overflow: "auto",
        }}
      >
        {`import { Button, ButtonProps, BUTTON_VARIANTS } from 'quick-ui-react';

// Full type safety and autocompletion
const MyButton: React.FC<ButtonProps> = ({ 
  variant = BUTTON_VARIANTS.PRIMARY, 
  ...props 
}) => {
  return <Button variant={variant} {...props} />;
};`}
      </pre>
    </div>

    <h2
      style={{
        color: "#1e40af",
        borderBottom: "2px solid #3b82f6",
        paddingBottom: "0.5rem",
      }}
    >
      Real-World Examples
    </h2>
    <div
      style={{
        background: "#f8fafc",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "2rem",
      }}
    >
      <h3 style={{ color: "#0f172a", margin: "0 0 1rem 0" }}>
        E-Commerce Product Card
      </h3>
      <pre
        style={{
          background: "#1e293b",
          color: "#e2e8f0",
          padding: "1rem",
          borderRadius: "6px",
          overflow: "auto",
          marginBottom: "1rem",
        }}
      >
        {`import { 
  Card, 
  Button, 
  Badge, 
  BADGE_VARIANTS, 
  BUTTON_VARIANTS } from 'quick-ui-react';

function ProductCard() {
  return (
    <Card>
      <Badge variant={BADGE_VARIANTS.SUCCESS}>Best Seller</Badge>
      <h3>Wireless Headphones</h3>
      <p>$199.99</p>
      <Button variant={BUTTON_VARIANTS.PRIMARY} fullWidth>
        Add to Cart
      </Button>
    </Card>
  );
}`}
      </pre>

      <h3 style={{ color: "#0f172a", margin: "1rem 0 1rem 0" }}>
        User Profile Dashboard
      </h3>
      <pre
        style={{
          background: "#1e293b",
          color: "#e2e8f0",
          padding: "1rem",
          borderRadius: "6px",
          overflow: "auto",
        }}
      >
        {`import { 
  Avatar, 
  Card, 
  Button, 
  ProgressBar, 
  BUTTON_VARIANTS, 
  AVATAR_SIZES } from 'quick-ui-react';

function UserProfile({ user }) {
  return (
    <Card title="Profile">
      <Avatar 
        src={user.avatar} 
        fallbackText={user.initials} 
        size={AVATAR_SIZES.LARGE} 
      />
      <h2>{user.name}</h2>
      <ProgressBar 
        value={user.completionPercent} 
        label="Profile Complete" 
      />
      <Button variant={BUTTON_VARIANTS.OUTLINE}>Edit Profile</Button>
    </Card>
  );
}`}
      </pre>
    </div>

    <h2
      style={{
        color: "#1e40af",
        borderBottom: "2px solid #3b82f6",
        paddingBottom: "0.5rem",
      }}
    >
      Resources & Links
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          padding: "1rem",
          background: "#f0f9ff",
          borderRadius: "8px",
          border: "1px solid #bae6fd",
        }}
      >
        <h4 style={{ color: "#0369a1", margin: "0 0 0.5rem 0" }}>
          NPM Package
        </h4>
        <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
          <a
            href="https://www.npmjs.com/package/quick-ui-react"
            style={{ color: "#0369a1" }}
          >
            quick-ui-react
          </a>
        </p>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>
          Official package
        </p>
      </div>

      <div
        style={{
          padding: "1rem",
          background: "#f0fdf4",
          borderRadius: "8px",
          border: "1px solid #bbf7d0",
        }}
      >
        <h4 style={{ color: "#059669", margin: "0 0 0.5rem 0" }}>
          Documentation
        </h4>
        <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
          <a
            href="https://quick-ui-live-demo.netlify.app"
            style={{ color: "#059669" }}
          >
            Live Storybook
          </a>
        </p>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>
          Interactive examples
        </p>
      </div>

      <div
        style={{
          padding: "1rem",
          background: "#fefce8",
          borderRadius: "8px",
          border: "1px solid #fde047",
        }}
      >
        <h4 style={{ color: "#ca8a04", margin: "0 0 0.5rem 0" }}>Issues</h4>
        <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
          <a
            href="https://github.com/silasechegini/Quick-UI/issues"
            style={{ color: "#ca8a04" }}
          >
            GitHub Issues
          </a>
        </p>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>
          Bug reports & features
        </p>
      </div>
    </div>

    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        color: "white",
      }}
    >
      <h2 style={{ margin: "0 0 1rem 0", color: "white" }}>
        Ready to Get Started?
      </h2>
      <p style={{ margin: "0 0 1.5rem 0", opacity: 0.9 }}>
        Install Quick-UI and start building beautiful React apps in minutes!
      </p>
      <pre
        style={{
          background: "rgba(0,0,0,0.2)",
          padding: "1rem",
          borderRadius: "6px",
          display: "inline-block",
          margin: 0,
        }}
      >
        npm install quick-ui-react
      </pre>
    </div>
  </div>
);

export default ReadMePage;

import React from "react";
import { Icon } from "../../components/Icon";
import {
  Button,
  BUTTON_SHAPES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ICON_POSITIONS,
} from "../../components/Button";
import { Card } from "../../components/Card";
import styles from "./styles.module.scss";
import { ICONS } from "@assets/iconType";

// Navigation functions
const navigateToComponents = () => {
  // Navigate to Components docs section in Storybook
  if (window.parent && window.parent !== window) {
    // We're in an iframe, update the parent window's URL
    const parentUrl = new URL(window.parent.location.href);
    parentUrl.searchParams.set("path", "/docs/components-accordion--docs");
    window.parent.location.href = parentUrl.toString();
  } else {
    // Fallback if not in iframe
    const url = new URL(window.location.href);
    url.searchParams.set("path", "/docs/components-accordion--docs");
    window.location.href = url.toString();
  }
};

const openGitHub = () => {
  window.open(
    "https://github.com/silasechegini/Quick-UI",
    "_blank",
    "noopener,noreferrer",
  );
};

const openNPMPackage = () => {
  window.open(
    "https://www.npmjs.com/package/quick-ui-react",
    "_blank",
    "noopener,noreferrer",
  );
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // You could add a toast notification here if you have one
    console.log("Copied to clipboard:", text);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    console.log("Error:", error);
    console.log("Copied to clipboard (fallback):", text);
  }
};

const IntroPage: React.FC = () => (
  <>
    <div className={styles.introPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.logoContainer}>
          <div className={styles.logoGrid}>
            <div
              className={styles.logoIcon}
              onClick={navigateToComponents}
              onKeyDown={(e) => e.key === "Enter" && navigateToComponents()}
              tabIndex={0}
              role="button"
              aria-label="View Dashboard Components"
            >
              <Icon name={ICONS.DASHBOARD_ICON} size={40} />
            </div>
            <div
              className={styles.logoIcon}
              onClick={openNPMPackage}
              onKeyDown={(e) => e.key === "Enter" && openNPMPackage()}
              tabIndex={0}
              role="button"
              aria-label="Install from NPM"
            >
              <Icon name={ICONS.SETTINGS_ICON} size={40} />
            </div>
            <div
              className={styles.logoIcon}
              onClick={openGitHub}
              onKeyDown={(e) => e.key === "Enter" && openGitHub()}
              tabIndex={0}
              role="button"
              aria-label="View Analytics and GitHub Repository"
            >
              <Icon name={ICONS.ANALYTICS_ICON} size={40} />
            </div>
          </div>
          <h1 className={styles.heroTitle}>Quick-UI</h1>
          <p className={styles.heroSubtitle}>
            Modern React components that accelerate your development workflow
          </p>
        </div>

        <div className={styles.ctaSection}>
          <Button
            variant={BUTTON_VARIANTS.PRIMARY}
            size={BUTTON_SIZES.LARGE}
            icon={<Icon name={ICONS.DOWNLOAD_ICON} size={20} />}
            iconPosition={ICON_POSITIONS.START}
            onClick={openNPMPackage}
          >
            Get Started
          </Button>
          <Button
            variant={BUTTON_VARIANTS.SECONDARY}
            size={BUTTON_SIZES.LARGE}
            icon={<Icon name={ICONS.SEARCH_ICON} size={20} />}
            iconPosition={ICON_POSITIONS.START}
            onClick={navigateToComponents}
          >
            Browse Components
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Quick-UI?</h2>
        <div className={styles.featuresGrid}>
          <Card className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Icon name={ICONS.CHECKMARK_ICON} size={32} />
            </div>
            <h3>Easy Integration</h3>
            <p>
              Drop-in components that work seamlessly with your existing React
              projects
            </p>
          </Card>

          <Card className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Icon name={ICONS.SETTINGS_ICON} size={32} />
            </div>
            <h3>Highly Customizable</h3>
            <p>
              Flexible theming system and CSS modules for complete style control
            </p>
          </Card>

          <Card className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Icon name={ICONS.EYE_ICON} size={32} />
            </div>
            <h3>Accessibility First</h3>
            <p>
              WCAG compliant components with built-in keyboard navigation and
              screen reader support
            </p>
          </Card>

          <Card className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Icon name={ICONS.DASHBOARD_ICON} size={32} />
            </div>
            <h3>Developer Experience</h3>
            <p>
              TypeScript support, comprehensive documentation, and interactive
              examples
            </p>
          </Card>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className={styles.quickStartSection}>
        <Card className={styles.quickStartCard}>
          <h2>Quick Start</h2>
          <div className={styles.installSection}>
            <h3>Installation</h3>
            <div className={styles.codeBlock}>
              <code>npm install quick-ui-react</code>
              <Button
                variant={BUTTON_VARIANTS.TERTIARY}
                size={BUTTON_SIZES.EXTRASMALL}
                shape={BUTTON_SHAPES.CIRCULAR}
                className={styles.copyButton}
                onClick={() => copyToClipboard("npm install quick-ui-react")}
                ariaLabel="Copy installation command"
                icon={<Icon name={ICONS.COPY_ICON} size={16} />}
              />
            </div>
          </div>

          <div className={styles.usageSection}>
            <h3>Usage</h3>
            <div className={styles.codeBlock}>
              <code>
                {`// In root file (e.g., index.tsx or App.tsx)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import Quick-UI styles via package export - ONCE
import 'quick-ui-react/styles';  

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`}
              </code>
            </div>
            <div className={styles.codeBlock}>
              <code>{`
/**
 * In any component file - QUICK-UI styles are already 
 * imported globally and will apply automatically.
*/
import { Button, Card, BUTTON_VARIANT } from 'quick-ui-react';

const MyComponent: React.FC = () => (
  <Card>
    <Button variant={BUTTON_VARIANT.PRIMARY}>Click Me</Button>
  </Card>
); 

export default MyComponent;
                `}</code>
            </div>
          </div>

          <div className={styles.linksSection}>
            <Button
              variant={BUTTON_VARIANTS.PRIMARY}
              icon={<Icon name={ICONS.SEARCH_ICON} size={16} />}
              iconPosition={ICON_POSITIONS.START}
              size={BUTTON_SIZES.LARGE}
              onClick={navigateToComponents}
            >
              Explore Components
            </Button>
            <Button
              variant={BUTTON_VARIANTS.SECONDARY}
              icon={<Icon name={ICONS.MAIL_ICON} size={16} />}
              iconPosition={ICON_POSITIONS.START}
              size={BUTTON_SIZES.LARGE}
              onClick={openGitHub}
            >
              GitHub Repository
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </>
);

export default IntroPage;

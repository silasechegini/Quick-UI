import React from "react";
import { Icon } from "../../components/Icon";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import styles from "./styles.module.scss";
import { ICONS } from "@assets/iconType";

const IntroPage: React.FC = () => (
  <>
    <div className={styles.introPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.logoContainer}>
          <div className={styles.logoGrid}>
            <Icon
              name={ICONS.DASHBOARD_ICON}
              size={40}
              className={styles.logoIcon}
            />
            <Icon
              name={ICONS.SETTINGS_ICON}
              size={40}
              className={styles.logoIcon}
            />
            <Icon
              name={ICONS.ANALYTICS_ICON}
              size={40}
              className={styles.logoIcon}
            />
          </div>
          <h1 className={styles.heroTitle}>Quick-UI</h1>
          <p className={styles.heroSubtitle}>
            Modern React components that accelerate your development workflow
          </p>
        </div>

        <div className={styles.ctaSection}>
          <Button variant="primary" size="l" className={styles.ctaButton}>
            <Icon name={ICONS.DOWNLOAD_ICON} size={20} />
            Get Started
          </Button>
          <Button variant="secondary" size="l" className={styles.ctaButton}>
            <Icon name={ICONS.SEARCH_ICON} size={20} />
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
              <Button variant="plain" size="s" className={styles.copyButton}>
                <Icon name={ICONS.DOWNLOAD_ICON} size={16} />
              </Button>
            </div>
          </div>

          <div className={styles.usageSection}>
            <h3>Usage</h3>
            <div className={styles.codeBlock}>
              <code>
                {`import { Button, Card } from 'quick-ui-react';
import 'quick-ui-react/styles';`}
              </code>
            </div>
          </div>

          <div className={styles.linksSection}>
            <Button variant="primary" className={styles.linkButton}>
              <Icon name={ICONS.SEARCH_ICON} size={16} />
              Explore Components
            </Button>
            <Button variant="tertiary" className={styles.linkButton}>
              <Icon name={ICONS.MAIL_ICON} size={16} />
              GitHub Repository
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </>
);

export default IntroPage;

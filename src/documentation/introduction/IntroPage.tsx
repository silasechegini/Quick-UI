import React from "react";
import { iconSvgMapping } from "@assets";
import styles from "./styles.module.scss";
import { ICONS } from "@assets/iconType";

const ThunderboltCircle =
  iconSvgMapping[
    ICONS.THUNDERBOLT_CIRCLE_LOGO_ICON as keyof typeof iconSvgMapping
  ];

const IntroPage: React.FC = () => (
  <>
    <div className={styles.introPage}>
      <ThunderboltCircle
        className={styles.appIcon}
        style={{
          width: "300px",
          height: "300px",
          margin: "2rem auto",
          display: "block",
        }}
        aria-label="Quick-UI Logo"
      />

      <div className={styles.bodyContainer}>
        <h1>Quick-UI</h1>
        <p>
          Quick-UI is a modern React component library designed to help you
          build beautiful, fast, and accessible user interfaces with ease.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Easy-to-use components</li>
          <li>Customizable themes</li>
          <li>Accessibility built-in</li>
          <li>Comprehensive documentation</li>
        </ul>
        <h2>Getting Started</h2>
        <p>
          Explore the documentation to learn how to use Quick-UI components in
          your project. Check out the examples and stories for practical usage.
        </p>
        <h2>Feedback</h2>
        <p>
          We welcome your feedback and contributions! Visit our GitHub
          repository to report issues or suggest improvements.
        </p>
      </div>
    </div>
  </>
);

export default IntroPage;

import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "../src/components/Footer";
import { Icon } from "../src/components/Icon";
import styles from "./Footer.module.scss";
import { ICONS } from "@assets/iconType";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    leftContent: {
      control: { type: "text" },
      description: "Content to display on the left side of the footer",
    },
    rightContent: {
      control: { type: "text" },
      description: "Content to display on the right side of the footer",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply to the footer",
    },
    children: {
      control: { type: "text" },
      description: "Additional content to display in the footer",
    },
  },
  args: {
    className: styles.storybookFooterContainer,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Footer
export const Default: Story = {
  args: {
    leftContent: "© 2024 Your Company. All rights reserved.",
    rightContent: "Terms & Privacy",
  },
};

// Footer with left content only
export const LeftContentOnly: Story = {
  args: {
    leftContent: "© 2024 Your Company. All rights reserved.",
  },
};

// Footer with right content only
export const RightContentOnly: Story = {
  args: {
    rightContent: "Terms & Privacy",
  },
};

// Footer with children content
export const WithChildren: Story = {
  args: {
    children: (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <p>This content is rendered as children</p>
      </div>
    ),
  },
};

// Corporate Footer with branding
export const Corporate: Story = {
  args: {
    leftContent: (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Icon name={ICONS.THUNDERBOLT_LOGO_ICON} size={24} />
        <div>
          <div style={{ fontWeight: "600" }}>Company Name</div>
          <div style={{ fontSize: "14px", color: "#666" }}>
            © 2024 All rights reserved
          </div>
        </div>
      </div>
    ),
    rightContent: (
      <div style={{ display: "flex", gap: "16px" }}>
        <a href="#" style={{ color: "#666", textDecoration: "none" }}>
          About
        </a>
        <a href="#" style={{ color: "#666", textDecoration: "none" }}>
          Contact
        </a>
        <a href="#" style={{ color: "#666", textDecoration: "none" }}>
          Privacy
        </a>
        <a href="#" style={{ color: "#666", textDecoration: "none" }}>
          Terms
        </a>
      </div>
    ),
  },
};

// Footer with social media links
export const WithSocialMedia: Story = {
  args: {
    leftContent: "© 2024 Company Name. All rights reserved.",
    rightContent: (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ marginRight: "8px", color: "#666" }}>Follow us:</span>
        <a href="#" aria-label="Settings" style={{ color: "#666" }}>
          <Icon name={ICONS.SETTINGS_ICON} size={20} />
        </a>
        <a href="#" aria-label="Upload" style={{ color: "#666" }}>
          <Icon name={ICONS.UPLOAD_ICON} size={20} />
        </a>
        <a href="#" aria-label="Download" style={{ color: "#666" }}>
          <Icon name={ICONS.DOWNLOAD_ICON} size={20} />
        </a>
      </div>
    ),
  },
};

// Footer with navigation links
export const WithNavigation: Story = {
  args: {
    leftContent: "© 2024 Company Name",
    rightContent: (
      <nav style={{ display: "flex", gap: "24px" }}>
        <div>
          <h4
            style={{
              margin: "0 0 8px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Product
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <a
              href="#"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Features
            </a>
            <a
              href="#"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Pricing
            </a>
            <a
              href="#"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Docs
            </a>
          </div>
        </div>
        <div>
          <h4
            style={{
              margin: "0 0 8px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Company
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <a
              href="#"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              About
            </a>
            <a
              href="#"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Blog
            </a>
            <a
              href="#"
              style={{
                color: "#666",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    ),
  },
};

// Minimal Footer
export const Minimal: Story = {
  args: {
    leftContent: "© 2024",
    rightContent: (
      <div style={{ display: "flex", gap: "16px" }}>
        <a
          href="#"
          style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}
        >
          Privacy
        </a>
        <a
          href="#"
          style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}
        >
          Terms
        </a>
      </div>
    ),
  },
};

// Footer with complex content
export const Complex: Story = {
  args: {
    leftContent: (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon name={ICONS.THUNDERBOLT_LOGO_ICON} size={24} />
          <span style={{ fontWeight: "600" }}>Quick UI</span>
        </div>
        <div
          style={{
            height: "20px",
            width: "1px",
            backgroundColor: "#ddd",
          }}
        ></div>
        <span style={{ color: "#666", fontSize: "14px" }}>
          © 2024 All rights reserved
        </span>
      </div>
    ),
    rightContent: (
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", gap: "16px" }}>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>
            Documentation
          </a>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>
            Support
          </a>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>
            Status
          </a>
        </div>
        <div
          style={{
            height: "20px",
            width: "1px",
            backgroundColor: "#ddd",
          }}
        ></div>
        <div style={{ display: "flex", gap: "12px" }}>
          <a href="#" aria-label="Settings">
            <Icon name={ICONS.SETTINGS_ICON} size={18} />
          </a>
          <a href="#" aria-label="User">
            <Icon name={ICONS.USER_ICON} size={18} />
          </a>
        </div>
      </div>
    ),
    className: styles.complexFooterContainer,
  },
};

// Footer with custom styling
export const CustomStyled: Story = {
  args: {
    className: "custom-footer-style",
    leftContent: "Custom styled footer",
    rightContent: "With additional classes",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Footer with custom CSS classes applied. You can add your own styling by passing a className prop.",
      },
    },
  },
};

// Empty Footer (edge case)
export const Empty: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Footer with no content provided. Shows how the component handles empty state.",
      },
    },
  },
};

// Mobile Preview (responsive)
export const MobilePreview: Story = {
  args: {
    leftContent: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Icon name={ICONS.THUNDERBOLT_LOGO_ICON} size={20} />
        <span>Company</span>
      </div>
    ),
    rightContent: (
      <div style={{ display: "flex", gap: "12px" }}>
        <a
          href="#"
          style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}
        >
          Terms
        </a>
        <a
          href="#"
          style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}
        >
          Privacy
        </a>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Footer displayed on mobile devices. Content automatically stacks vertically on smaller screens.",
      },
    },
  },
};

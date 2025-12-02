import type { Meta, StoryObj } from "@storybook/react";
import {
  ProgressBar,
  PROGRESS_BAR_VARIANTS,
  PROGRESS_BAR_SIZES,
  PROGRESS_BAR_SHAPES,
  ProgressBarProps,
} from "../src/components/ProgressBar";
import { useState, useEffect } from "react";
import "../src/styles/index.scss";
import styles from "./Progress.module.scss";
import { Button, BUTTON_VARIANTS } from "../src/components/Button";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value",
    },
    max: {
      control: { type: "number", min: 1 },
      description: "Maximum value",
    },
    variant: {
      control: "select",
      options: Object.values(PROGRESS_BAR_VARIANTS),
      description: "Visual variant/theme",
    },
    size: {
      control: "select",
      options: Object.values(PROGRESS_BAR_SIZES),
      description: "Size of the progress bar",
    },
    shape: {
      control: "select",
      options: Object.values(PROGRESS_BAR_SHAPES),
      description: "Shape style",
    },
    showPercentage: {
      control: "boolean",
      description: "Show percentage text",
    },
    showValue: {
      control: "boolean",
      description: "Show current value/max",
    },
    striped: {
      control: "boolean",
      description: "Show striped pattern",
    },
    animated: {
      control: "boolean",
      description: "Animate stripes",
    },
    indeterminate: {
      control: "boolean",
      description: "Show indeterminate/loading state",
    },
    label: {
      control: "text",
      description: "Accessible label",
    },
    color: {
      control: "color",
      description: "Custom fill color",
    },
    backgroundColor: {
      control: "color",
      description: "Custom background color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// Container for consistent sizing
const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: "400px", padding: "20px" }}>{children}</div>
);

export const Default: Story = {
  render: (args) => (
    <Container>
      <ProgressBar {...args} />
    </Container>
  ),
  args: {
    value: 65,
  },
};

export const WithPercentage: Story = {
  render: (args) => (
    <Container>
      <ProgressBar {...args} />
    </Container>
  ),
  args: {
    value: 75,
    showPercentage: true,
  },
};

export const WithValue: Story = {
  render: (args) => (
    <Container>
      <ProgressBar {...args} />
    </Container>
  ),
  args: {
    value: 35,
    max: 50,
    showValue: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <h4>Default</h4>
        <ProgressBar value={60} />
      </div>
      <div>
        <h4>Success</h4>
        <ProgressBar value={100} variant={PROGRESS_BAR_VARIANTS.SUCCESS} />
      </div>
      <div>
        <h4>Warning</h4>
        <ProgressBar value={70} variant={PROGRESS_BAR_VARIANTS.WARNING} />
      </div>
      <div>
        <h4>Error</h4>
        <ProgressBar value={25} variant={PROGRESS_BAR_VARIANTS.ERROR} />
      </div>
      <div>
        <h4>Info</h4>
        <ProgressBar value={45} variant={PROGRESS_BAR_VARIANTS.INFO} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <h4>Small</h4>
        <ProgressBar value={60} size={PROGRESS_BAR_SIZES.SMALL} />
      </div>
      <div>
        <h4>Medium (Default)</h4>
        <ProgressBar value={60} size={PROGRESS_BAR_SIZES.MEDIUM} />
      </div>
      <div>
        <h4>Large</h4>
        <ProgressBar value={60} size={PROGRESS_BAR_SIZES.LARGE} />
      </div>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <h4>Rounded (Default)</h4>
        <ProgressBar value={60} shape={PROGRESS_BAR_SHAPES.ROUNDED} />
      </div>
      <div>
        <h4>Square</h4>
        <ProgressBar value={60} shape={PROGRESS_BAR_SHAPES.SQUARE} />
      </div>
    </div>
  ),
};

export const Striped: Story = {
  render: (args) => (
    <Container>
      <ProgressBar {...args} />
    </Container>
  ),
  args: {
    value: 60,
    striped: true,
  },
};

export const StripedAnimated: Story = {
  render: (args) => (
    <Container>
      <ProgressBar {...args} />
    </Container>
  ),
  args: {
    value: 60,
    striped: true,
    animated: true,
  },
};

export const Indeterminate: Story = {
  render: (args) => (
    <Container>
      <ProgressBar {...args} />
    </Container>
  ),
  args: {
    value: 0,
    indeterminate: true,
    label: "Loading...",
  },
};

export const CustomIndeterminateStyles: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <div>
        <h4>Default Indeterminate</h4>
        <ProgressBar value={0} indeterminate />
      </div>

      <div>
        <h4>Custom Rainbow Gradient</h4>
        <ProgressBar
          value={0}
          indeterminate
          className={styles.rainbowIndeterminate}
        />
      </div>

      <div>
        <h4>Pulse Effect</h4>
        <ProgressBar
          value={0}
          indeterminate
          className={styles.pulseIndeterminate}
          variant={PROGRESS_BAR_VARIANTS.ERROR}
        />
      </div>

      <div>
        <h4>Wave Effect</h4>
        <ProgressBar
          value={0}
          indeterminate
          className={styles.waveIndeterminate}
          variant={PROGRESS_BAR_VARIANTS.INFO}
        />
      </div>

      <div>
        <h4>High Performance</h4>
        <ProgressBar
          value={0}
          indeterminate
          className={styles.performanceIndeterminate}
          variant={PROGRESS_BAR_VARIANTS.SUCCESS}
        />
      </div>

      <div>
        <h4>Glow Effect</h4>
        <ProgressBar
          value={0}
          indeterminate
          className={styles.glowIndeterminate}
          size={PROGRESS_BAR_SIZES.LARGE}
        />
      </div>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <h4>Custom Fill Color</h4>
        <ProgressBar value={60} color="#ff6b6b" />
      </div>
      <div>
        <h4>Custom Background Color</h4>
        <ProgressBar value={60} backgroundColor="#f1f3f4" />
      </div>
      <div>
        <h4>Both Custom Colors</h4>
        <ProgressBar value={60} color="#4ecdc4" backgroundColor="#ffe66d" />
      </div>
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: (args) => (
    <Container>
      <ProgressBar {...args}>
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>
          Uploading... {args.value}%
        </span>
      </ProgressBar>
    </Container>
  ),
  args: {
    value: 45,
    size: PROGRESS_BAR_SIZES.LARGE,
  },
};

// Animated progress example
const AnimatedProgressWrapper = (props: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return <ProgressBar {...props} value={progress} />;
};

export const AnimatedProgress: Story = {
  render: (args) => (
    <Container>
      <AnimatedProgressWrapper {...args} />
    </Container>
  ),
  args: {
    showPercentage: true,
    variant: PROGRESS_BAR_VARIANTS.SUCCESS,
  },
};

export const FileUploadExample: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
      setIsUploading(true);
      setProgress(0);

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setIsUploading(false), 500);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
    };

    return (
      <div style={{ width: "400px", padding: "20px" }}>
        <h4>File Upload Simulation</h4>
        <div style={{ marginBottom: "1rem" }}>
          <Button
            onClick={startUpload}
            disabled={isUploading}
            variant={
              isUploading ? BUTTON_VARIANTS.SECONDARY : BUTTON_VARIANTS.PRIMARY
            }
          >
            {isUploading ? "Uploading..." : "Start Upload"}
          </Button>
        </div>

        {isUploading && (
          <ProgressBar
            value={progress}
            showPercentage
            variant={
              progress === 100
                ? PROGRESS_BAR_VARIANTS.SUCCESS
                : PROGRESS_BAR_VARIANTS.DEFAULT
            }
            striped
            animated={progress < 100}
          />
        )}
      </div>
    );
  },
};

export const HealthStatus: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.25rem",
          }}
        >
          <span>CPU Usage</span>
          <span>42%</span>
        </div>
        <ProgressBar value={42} variant={PROGRESS_BAR_VARIANTS.INFO} />
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.25rem",
          }}
        >
          <span>Memory Usage</span>
          <span>78%</span>
        </div>
        <ProgressBar value={78} variant={PROGRESS_BAR_VARIANTS.WARNING} />
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.25rem",
          }}
        >
          <span>Disk Usage</span>
          <span>95%</span>
        </div>
        <ProgressBar value={95} variant={PROGRESS_BAR_VARIANTS.ERROR} />
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.25rem",
          }}
        >
          <span>Network</span>
          <span>Online</span>
        </div>
        <ProgressBar value={100} variant={PROGRESS_BAR_VARIANTS.SUCCESS} />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Container>
      <ProgressBar {...args} />
    </Container>
  ),
  args: {
    value: 65,
    max: 100,
    variant: PROGRESS_BAR_VARIANTS.DEFAULT,
    size: PROGRESS_BAR_SIZES.MEDIUM,
    shape: PROGRESS_BAR_SHAPES.ROUNDED,
    showPercentage: false,
    showValue: false,
    striped: false,
    animated: false,
    indeterminate: false,
    label: "Progress",
  },
};

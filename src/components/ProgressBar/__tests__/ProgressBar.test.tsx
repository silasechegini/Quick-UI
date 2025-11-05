import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  ProgressBar,
  PROGRESS_BAR_VARIANTS,
  PROGRESS_BAR_SIZES,
  PROGRESS_BAR_SHAPES,
} from "../index";
import styles from "../styles.module.scss";

describe("ProgressBar Component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute("aria-valuenow", "50");
      expect(progressBar).toHaveAttribute("aria-valuemin", "0");
      expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    });

    it("should render with custom max value", () => {
      render(<ProgressBar value={25} max={50} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "25");
      expect(progressBar).toHaveAttribute("aria-valuemax", "50");
    });

    it("should render with custom label", () => {
      render(<ProgressBar value={30} label="Loading progress" />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-label", "Loading progress");
    });

    it("should render with default label when none provided", () => {
      render(<ProgressBar value={40} max={80} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-label", "Progress: 40 of 80");
    });
  });

  describe("Value Handling", () => {
    it("should clamp value below 0 to 0", () => {
      render(<ProgressBar value={-10} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");
    });

    it("should clamp value above max to max", () => {
      render(<ProgressBar value={150} max={100} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");
    });

    it("should handle decimal values correctly", () => {
      render(<ProgressBar value={33.7} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "33.7");
    });
  });

  describe("Variants", () => {
    it("should apply default variant class", () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["variant-default"]);
    });

    it("should apply success variant class", () => {
      render(
        <ProgressBar value={100} variant={PROGRESS_BAR_VARIANTS.SUCCESS} />,
      );

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["variant-success"]);
    });

    it("should apply warning variant class", () => {
      render(
        <ProgressBar value={70} variant={PROGRESS_BAR_VARIANTS.WARNING} />,
      );

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["variant-warning"]);
    });

    it("should apply error variant class", () => {
      render(<ProgressBar value={20} variant={PROGRESS_BAR_VARIANTS.ERROR} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["variant-error"]);
    });

    it("should apply info variant class", () => {
      render(<ProgressBar value={60} variant={PROGRESS_BAR_VARIANTS.INFO} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["variant-info"]);
    });
  });

  describe("Sizes", () => {
    it("should apply small size class", () => {
      render(<ProgressBar value={50} size={PROGRESS_BAR_SIZES.SMALL} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["size-small"]);
    });

    it("should apply medium size class by default", () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["size-medium"]);
    });

    it("should apply large size class", () => {
      render(<ProgressBar value={50} size={PROGRESS_BAR_SIZES.LARGE} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["size-large"]);
    });
  });

  describe("Shapes", () => {
    it("should apply rounded shape class by default", () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["shape-rounded"]);
    });

    it("should apply square shape class", () => {
      render(<ProgressBar value={50} shape={PROGRESS_BAR_SHAPES.SQUARE} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["shape-square"]);
    });
  });

  describe("Display Options", () => {
    it("should show percentage when showPercentage is true", () => {
      render(<ProgressBar value={75} showPercentage />);

      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("should show value when showValue is true", () => {
      render(<ProgressBar value={30} max={50} showValue />);

      expect(screen.getByText("30/50")).toBeInTheDocument();
    });

    it("should show custom children content", () => {
      render(
        <ProgressBar value={50}>
          <span>Custom content</span>
        </ProgressBar>,
      );

      expect(screen.getByText("Custom content")).toBeInTheDocument();
    });

    it("should prioritize children over showPercentage", () => {
      render(
        <ProgressBar value={50} showPercentage>
          <span>Custom content</span>
        </ProgressBar>,
      );

      expect(screen.getByText("Custom content")).toBeInTheDocument();
      expect(screen.queryByText("50%")).not.toBeInTheDocument();
    });

    it("should not show any text by default", () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole("progressbar");
      expect(
        progressBar.querySelector(`.${styles.text}`),
      ).not.toBeInTheDocument();
    });
  });

  describe("Visual States", () => {
    it("should apply striped class when striped is true", () => {
      render(<ProgressBar value={50} striped />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles.striped);
    });

    it("should apply animated class when both striped and animated are true", () => {
      render(<ProgressBar value={50} striped animated />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles.striped);
      expect(progressBar).toHaveClass(styles.animated);
    });

    it("should not apply animated class when striped is false", () => {
      render(<ProgressBar value={50} animated />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).not.toHaveClass(styles.animated);
    });

    it("should apply indeterminate class when indeterminate is true", () => {
      render(<ProgressBar value={50} indeterminate />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles.indeterminate);
    });
  });

  describe("Indeterminate State", () => {
    it("should not have aria-valuenow when indeterminate", () => {
      render(<ProgressBar value={50} indeterminate />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).not.toHaveAttribute("aria-valuenow");
    });

    it("should still have aria-valuemin and aria-valuemax when indeterminate", () => {
      render(<ProgressBar value={50} indeterminate />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuemin", "0");
      expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    });
  });

  describe("Custom Styling", () => {
    it("should apply custom className", () => {
      render(<ProgressBar value={50} className="custom-progress" />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass("custom-progress");
    });

    it("should apply custom background color", () => {
      render(<ProgressBar value={50} backgroundColor="#f0f0f0" />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveStyle({ backgroundColor: "#f0f0f0" });
    });

    it("should apply custom fill color", () => {
      render(<ProgressBar value={50} color="#ff0000" />);

      const progressBar = screen.getByRole("progressbar");
      const fill = progressBar.querySelector(`.${styles.fill}`);
      expect(fill).toHaveStyle({ backgroundColor: "#ff0000" });
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<ProgressBar value={60} max={100} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("role", "progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "60");
      expect(progressBar).toHaveAttribute("aria-valuemin", "0");
      expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    });

    it("should have aria-hidden on fill and text elements", () => {
      render(<ProgressBar value={50} showPercentage />);

      const progressBar = screen.getByRole("progressbar");
      const fill = progressBar.querySelector(`.${styles.fill}`);
      const text = progressBar.querySelector(`.${styles.text}`);

      expect(fill).toHaveAttribute("aria-hidden", "true");
      expect(text).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Enums", () => {
    it("should work with PROGRESS_BAR_VARIANTS enum", () => {
      render(
        <ProgressBar value={50} variant={PROGRESS_BAR_VARIANTS.SUCCESS} />,
      );

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["variant-success"]);
    });

    it("should work with PROGRESS_BAR_SIZES enum", () => {
      render(<ProgressBar value={50} size={PROGRESS_BAR_SIZES.LARGE} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["size-large"]);
    });

    it("should work with PROGRESS_BAR_SHAPES enum", () => {
      render(<ProgressBar value={50} shape={PROGRESS_BAR_SHAPES.SQUARE} />);

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass(styles["shape-square"]);
    });
  });

  describe("Props Forwarding", () => {
    it("should forward additional HTML attributes", () => {
      render(
        <ProgressBar
          value={50}
          data-testid="custom-progress"
          title="Progress bar title"
        />,
      );

      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("data-testid", "custom-progress");
      expect(progressBar).toHaveAttribute("title", "Progress bar title");
    });
  });
});

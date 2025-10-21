import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";
import {
  BADGE_VARIANTS,
  BADGE_SIZES,
  BADGE_POSITIONS,
  BADGE_TYPES,
} from "../Badge.types";
import styles from "../styles.module.scss";

// Helper to get badge element - inline badges are root, others are nested
const getBadgeElement = (container: HTMLElement, isInline: boolean = true) => {
  if (isInline) {
    return container.firstChild as HTMLElement;
  }
  return container.querySelector(`.${styles["badge"]}`) as HTMLElement;
};

describe("Badge Component", () => {
  describe("Rendering", () => {
    it("should render without children (inline)", () => {
      render(<Badge count={5} position="inline" />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("should render with children", () => {
      render(
        <Badge count={3}>
          <div data-testid="child-element">Icon</div>
        </Badge>,
      );
      expect(screen.getByTestId("child-element")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("should render custom content", () => {
      render(<Badge content="NEW" position="inline" />);
      expect(screen.getByText("NEW")).toBeInTheDocument();
    });

    it("should render dot badge without content", () => {
      const { container } = render(<Badge type="dot" position="inline" />);
      const badge = container.firstChild;
      expect(badge).toBeInTheDocument();
      expect(badge?.textContent).toBe("");
    });
  });

  describe("Count Display", () => {
    it("should display count correctly", () => {
      render(<Badge count={42} position="inline" />);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("should display max+ when count exceeds max", () => {
      render(<Badge count={150} max={99} position="inline" />);
      expect(screen.getByText("99+")).toBeInTheDocument();
    });

    it("should use custom max value", () => {
      render(<Badge count={1000} max={999} position="inline" />);
      expect(screen.getByText("999+")).toBeInTheDocument();
    });

    it("should not render when count is 0 and showZero is false", () => {
      const { container } = render(
        <Badge count={0} showZero={false} position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["invisible"]);
    });

    it("should render when count is 0 and showZero is true", () => {
      render(<Badge count={0} showZero={true} position="inline" />);
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should apply primary variant class", () => {
      const { container } = render(
        <Badge variant="primary" count={1} position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["variant-primary"]);
    });

    it("should apply success variant class", () => {
      const { container } = render(
        <Badge variant="success" count={1} position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["variant-success"]);
    });

    it("should apply error variant class", () => {
      const { container } = render(
        <Badge variant="error" count={1} position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["variant-error"]);
    });

    it("should apply warning variant class", () => {
      const { container } = render(
        <Badge variant="warning" count={1} position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["variant-warning"]);
    });
  });

  describe("Sizes", () => {
    it("should apply small size class", () => {
      const { container } = render(
        <Badge size="sm" count={1} position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["size-sm"]);
    });

    it("should apply medium size class by default", () => {
      const { container } = render(<Badge count={1} position="inline" />);
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["size-md"]);
    });

    it("should apply large size class", () => {
      const { container } = render(
        <Badge size="lg" count={1} position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["size-lg"]);
    });
  });

  describe("Positions", () => {
    it("should apply top-right position class by default", () => {
      const { container } = render(
        <Badge count={1}>
          <div>Icon</div>
        </Badge>,
      );
      const badge = getBadgeElement(container, false);
      expect(badge).toHaveClass(styles["position-top-right"]);
    });

    it("should apply top-left position class", () => {
      const { container } = render(
        <Badge position="top-left" count={1}>
          <div>Icon</div>
        </Badge>,
      );
      const badge = getBadgeElement(container, false);
      expect(badge).toHaveClass(styles["position-top-left"]);
    });

    it("should apply bottom-right position class", () => {
      const { container } = render(
        <Badge position="bottom-right" count={1}>
          <div>Icon</div>
        </Badge>,
      );
      const badge = getBadgeElement(container, false);
      expect(badge).toHaveClass(styles["position-bottom-right"]);
    });

    it("should apply inline position class", () => {
      const { container } = render(<Badge position="inline" count={1} />);
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["position-inline"]);
    });
  });

  describe("Types", () => {
    it("should apply standard type class by default", () => {
      const { container } = render(<Badge count={1} position="inline" />);
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["type-standard"]);
    });

    it("should apply dot type class", () => {
      const { container } = render(<Badge type="dot" position="inline" />);
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["type-dot"]);
    });
  });

  describe("Pulse Animation", () => {
    it("should apply pulse class when pulse is true", () => {
      const { container } = render(<Badge count={1} pulse position="inline" />);
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["pulse"]);
    });

    it("should not apply pulse class by default", () => {
      const { container } = render(<Badge count={1} position="inline" />);
      const badge = getBadgeElement(container);
      expect(badge).not.toHaveClass(styles["pulse"]);
    });
  });

  describe("Visibility", () => {
    it("should apply invisible class when invisible is true", () => {
      const { container } = render(
        <Badge count={1} invisible position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["invisible"]);
    });

    it("should be visible by default", () => {
      const { container } = render(<Badge count={1} position="inline" />);
      const badge = getBadgeElement(container);
      expect(badge).not.toHaveClass(styles["invisible"]);
    });
  });

  describe("Custom Classes", () => {
    it("should apply custom className to container", () => {
      const { container } = render(
        <Badge count={1} className="custom-class">
          <div>Icon</div>
        </Badge>,
      );
      const badgeContainer = container.querySelector(
        `.${styles["badgeContainer"]}`,
      );
      expect(badgeContainer).toHaveClass("custom-class");
    });

    it("should apply badgeClassName to badge element", () => {
      const { container } = render(
        <Badge count={1} badgeClassName="custom-badge" position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass("custom-badge");
    });
  });

  describe("Enums", () => {
    it("should work with BADGE_VARIANTS enum", () => {
      render(
        <Badge variant={BADGE_VARIANTS.ERROR} count={1} position="inline" />,
      );
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should work with BADGE_SIZES enum", () => {
      render(<Badge size={BADGE_SIZES.LARGE} count={1} position="inline" />);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should work with BADGE_POSITIONS enum", () => {
      render(<Badge position={BADGE_POSITIONS.INLINE} count={1} />);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should work with BADGE_TYPES enum", () => {
      const { container } = render(
        <Badge type={BADGE_TYPES.DOT} position="inline" />,
      );
      const badge = getBadgeElement(container);
      expect(badge).toHaveClass(styles["type-dot"]);
    });
  });
});

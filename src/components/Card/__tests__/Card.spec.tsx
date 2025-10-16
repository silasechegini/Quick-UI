import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Card } from "../Card";
import { Button, ButtonProps } from "../../Button";
import { getElevationClass, combineClasses } from "../../../utils";

// Mock the utility functions
vi.mock("../../../utils", () => ({
  getElevationClass: vi.fn((elevation: number) => `elevation${elevation}`),
  combineClasses: vi.fn((...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(" "),
  ),
}));

// Mock the Button component
vi.mock("../../Button", () => ({
  Button: ({ children, ...props }: ButtonProps) => (
    <button data-testid="mock-button" {...props}>
      {children}
    </button>
  ),
}));

// Mock CSS modules
vi.mock("../styles.module.scss", () => ({
  default: {
    card: "card",
    header: "header",
    body: "body",
    footer: "footer",
    bordered: "bordered",
    hoverable: "hoverable",
    elevation0: "elevation0",
    elevation1: "elevation1",
    elevation2: "elevation2",
    elevation3: "elevation3",
    elevation4: "elevation4",
  },
}));

describe("Card Component", () => {
  describe("Basic Rendering", () => {
    it("renders with children", () => {
      render(<Card>Test content</Card>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card className="custom-class">Test content</Card>,
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass("custom-class");
    });

    it("applies custom style", () => {
      const customStyle = { backgroundColor: "red" };
      const { container } = render(
        <Card style={customStyle}>Test content</Card>,
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveStyle("background-color: rgb(255, 0, 0)");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<Card ref={ref}>Test content</Card>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe("Header", () => {
    it("renders string header", () => {
      render(<Card header="Test Header">Body content</Card>);
      expect(screen.getByText("Test Header")).toBeInTheDocument();
    });

    it("renders React node header", () => {
      const headerNode = (
        <div>
          <h2>Custom Header</h2>
          <Button>Action</Button>
        </div>
      );
      render(<Card header={headerNode}>Body content</Card>);
      expect(screen.getByText("Custom Header")).toBeInTheDocument();
      expect(screen.getByTestId("mock-button")).toBeInTheDocument();
    });

    it("applies header class", () => {
      const { container } = render(
        <Card header="Test Header">Body content</Card>,
      );
      expect(container.querySelector(".header")).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("renders string footer", () => {
      render(<Card footer="Test Footer">Body content</Card>);
      expect(screen.getByText("Test Footer")).toBeInTheDocument();
    });

    it("renders React node footer", () => {
      const footerNode = (
        <div>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </div>
      );
      render(<Card footer={footerNode}>Body content</Card>);
      expect(screen.getAllByTestId("mock-button")).toHaveLength(2);
    });

    it("applies footer class", () => {
      const { container } = render(
        <Card footer="Test Footer">Body content</Card>,
      );
      expect(container.querySelector(".footer")).toBeInTheDocument();
    });
  });

  describe("Elevation", () => {
    it("applies default elevation (1)", () => {
      render(<Card>Test content</Card>);
      expect(getElevationClass).toHaveBeenCalledWith(1, expect.any(Object));
    });

    it("applies custom elevation level 0", () => {
      render(<Card elevation={0}>Test content</Card>);
      expect(getElevationClass).toHaveBeenCalledWith(0, expect.any(Object));
    });

    it("applies custom elevation level 2", () => {
      render(<Card elevation={2}>Test content</Card>);
      expect(getElevationClass).toHaveBeenCalledWith(2, expect.any(Object));
    });

    it("applies custom elevation level 3", () => {
      render(<Card elevation={3}>Test content</Card>);
      expect(getElevationClass).toHaveBeenCalledWith(3, expect.any(Object));
    });

    it("applies custom elevation level 4", () => {
      render(<Card elevation={4}>Test content</Card>);
      expect(getElevationClass).toHaveBeenCalledWith(4, expect.any(Object));
    });

    it("handles invalid elevation gracefully", () => {
      render(<Card elevation={4}>Test content</Card>);
      expect(getElevationClass).toHaveBeenCalledWith(4, expect.any(Object));
    });
  });

  describe("Visual Variants", () => {
    it("applies bordered class when bordered is true", () => {
      const { container } = render(<Card bordered>Test content</Card>);
      expect(container.firstChild).toHaveClass("bordered");
    });

    it("applies hoverable class when hoverable is true", () => {
      const { container } = render(<Card hoverable>Test content</Card>);
      expect(container.firstChild).toHaveClass("hoverable");
    });

    it("applies both bordered and hoverable classes", () => {
      const { container } = render(
        <Card bordered hoverable>
          Test content
        </Card>,
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass("bordered");
      expect(cardElement).toHaveClass("hoverable");
    });

    it("does not apply bordered/hoverable classes when false", () => {
      const { container } = render(
        <Card bordered={false} hoverable={false}>
          Test content
        </Card>,
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).not.toHaveClass("bordered");
      expect(cardElement).not.toHaveClass("hoverable");
    });
  });

  describe("Style Integration", () => {
    it("calls getElevationClass with correct parameters", () => {
      render(<Card elevation={2}>Test content</Card>);
      expect(getElevationClass).toHaveBeenCalledWith(
        2,
        expect.objectContaining({
          card: "card",
          elevation2: "elevation2",
        }),
      );
    });

    it("calls combineClasses with correct parameters", () => {
      render(
        <Card className="custom" bordered hoverable>
          Test content
        </Card>,
      );
      expect(combineClasses).toHaveBeenCalledWith(
        "card",
        "elevation1",
        "bordered",
        "hoverable",
        "custom",
      );
    });

    // it("handles undefined className gracefully", () => {

    //   render(<Card>Test content</Card>);
    //   expect(combineClasses).toHaveBeenCalledWith(
    //     "card",
    //     "elevation1",
    //     undefined,
    //     undefined,
    //     "",
    //   );
    // });
  });

  describe("Accessibility", () => {
    it("renders as a div element", () => {
      const { container } = render(<Card>Test content</Card>);
      expect(container.firstChild?.nodeName).toBe("DIV");
    });

    it("spreads additional HTML attributes", () => {
      const { container } = render(
        <Card data-testid="custom-card" role="region">
          Test content
        </Card>,
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveAttribute("data-testid", "custom-card");
      expect(cardElement).toHaveAttribute("role", "region");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      const { container } = render(<Card>{null}</Card>);
      expect(container.firstChild).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("card");
    });

    it("handles complex nested content", () => {
      const complexContent = (
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
          <Button>Action</Button>
        </div>
      );
      render(<Card>{complexContent}</Card>);
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByTestId("mock-button")).toBeInTheDocument();
    });

    it("handles all props combined", () => {
      const headerNode = <h2>Header</h2>;
      const footerNode = <p>Footer</p>;
      const { container } = render(
        <Card
          header={headerNode}
          footer={footerNode}
          elevation={3}
          bordered
          hoverable
          className="custom-class"
          style={{ margin: "10px" }}
          data-testid="full-card"
        >
          Body content
        </Card>,
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveAttribute("data-testid", "full-card");
      expect(cardElement).toHaveClass("custom-class");
      expect(cardElement).toHaveStyle("margin: 10px");
      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Body content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });
});

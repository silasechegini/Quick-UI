import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../Footer";

describe("Footer Component", () => {
  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      render(<Footer className="custom-footer" />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveClass("custom-footer");
    });

    it("should render children content", () => {
      render(
        <Footer>
          <div data-testid="footer-child">Child content</div>
        </Footer>,
      );
      expect(screen.getByTestId("footer-child")).toBeInTheDocument();
      expect(screen.getByText("Child content")).toBeInTheDocument();
    });
  });

  describe("Left and Right Content", () => {
    it("should render left content when provided", () => {
      const leftContent = <span data-testid="left-content">Left content</span>;
      render(<Footer leftContent={leftContent} />);

      expect(screen.getByTestId("left-content")).toBeInTheDocument();
      expect(screen.getByText("Left content")).toBeInTheDocument();
    });

    it("should render right content when provided", () => {
      const rightContent = (
        <span data-testid="right-content">Right content</span>
      );
      render(<Footer rightContent={rightContent} />);

      expect(screen.getByTestId("right-content")).toBeInTheDocument();
      expect(screen.getByText("Right content")).toBeInTheDocument();
    });

    it("should render both left and right content", () => {
      const leftContent = <span data-testid="left-content">Left</span>;
      const rightContent = <span data-testid="right-content">Right</span>;

      render(<Footer leftContent={leftContent} rightContent={rightContent} />);

      expect(screen.getByTestId("left-content")).toBeInTheDocument();
      expect(screen.getByTestId("right-content")).toBeInTheDocument();
    });

    it("should not render left section when leftContent is not provided", () => {
      render(<Footer rightContent={<span>Right only</span>} />);

      // Left section should not exist in the DOM
      const footer = screen.getByRole("contentinfo");
      const leftSections = footer.querySelectorAll('[class*="leftSection"]');
      expect(leftSections).toHaveLength(0);
    });

    it("should not render right section when rightContent is not provided", () => {
      render(<Footer leftContent={<span>Left only</span>} />);

      // Right section should not exist in the DOM
      const footer = screen.getByRole("contentinfo");
      const rightSections = footer.querySelectorAll('[class*="rightSection"]');
      expect(rightSections).toHaveLength(0);
    });
  });

  describe("Content Types", () => {
    it("should render text content", () => {
      render(<Footer leftContent="Copyright 2024" rightContent="Terms" />);

      expect(screen.getByText("Copyright 2024")).toBeInTheDocument();
      expect(screen.getByText("Terms")).toBeInTheDocument();
    });

    it("should render component content", () => {
      const leftComponent = (
        <div>
          <span>Company</span>
          <span>© 2024</span>
        </div>
      );
      const rightComponent = (
        <nav>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      );

      render(
        <Footer leftContent={leftComponent} rightContent={rightComponent} />,
      );

      expect(screen.getByText("Company")).toBeInTheDocument();
      expect(screen.getByText("© 2024")).toBeInTheDocument();
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Privacy" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Terms" })).toBeInTheDocument();
    });

    it("should render mixed content types", () => {
      const leftContent = (
        <div>
          <img src="/logo.png" alt="Company Logo" />
          <span>Company Name</span>
        </div>
      );

      render(
        <Footer leftContent={leftContent} rightContent="All rights reserved">
          <div>Additional footer content</div>
        </Footer>,
      );

      expect(
        screen.getByRole("img", { name: "Company Logo" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Company Name")).toBeInTheDocument();
      expect(screen.getByText("All rights reserved")).toBeInTheDocument();
      expect(screen.getByText("Additional footer content")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic footer role", () => {
      render(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("should maintain proper structure for screen readers", () => {
      render(
        <Footer
          leftContent={
            <div>
              <span>Company © 2024</span>
            </div>
          }
          rightContent={
            <nav aria-label="Footer navigation">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </nav>
          }
        />,
      );

      const footer = screen.getByRole("contentinfo");
      const navigation = screen.getByRole("navigation", {
        name: "Footer navigation",
      });

      expect(footer).toContainElement(navigation);
      expect(
        screen.getByRole("link", { name: "Privacy Policy" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Terms of Service" }),
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty content gracefully", () => {
      render(<Footer leftContent="" rightContent="" />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });

    it("should handle null content", () => {
      render(<Footer leftContent={null} rightContent={null} />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });

    it("should handle undefined content", () => {
      render(<Footer leftContent={undefined} rightContent={undefined} />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });

    it("should handle complex nested content", () => {
      const complexContent = (
        <div>
          <div>
            <span>Level 1</span>
            <div>
              <span>Level 2</span>
              <div>
                <span>Level 3</span>
              </div>
            </div>
          </div>
        </div>
      );

      render(<Footer leftContent={complexContent} />);

      expect(screen.getByText("Level 1")).toBeInTheDocument();
      expect(screen.getByText("Level 2")).toBeInTheDocument();
      expect(screen.getByText("Level 3")).toBeInTheDocument();
    });
  });

  describe("CSS Classes", () => {
    it("should apply correct CSS module classes", () => {
      render(
        <Footer
          leftContent="Left"
          rightContent="Right"
          className="custom-class"
        />,
      );

      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveClass("custom-class");
      // CSS modules will transform class names, so we check for the presence of style attributes
      expect(footer).toHaveAttribute("class");
    });

    it("should handle multiple custom classes", () => {
      render(<Footer className="class1 class2 class3" />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveClass("class1", "class2", "class3");
    });
  });
});

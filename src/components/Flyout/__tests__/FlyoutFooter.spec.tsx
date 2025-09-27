import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FlyoutFooter } from "../index";

describe("FlyoutFooter", () => {
  it("renders children correctly", () => {
    render(<FlyoutFooter>Footer content</FlyoutFooter>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("applies additional className if provided", () => {
    const { container } = render(
      <FlyoutFooter className="footer-class">Footer content</FlyoutFooter>,
    );
    expect(container.firstChild).toHaveClass("footer-class");
  });
});

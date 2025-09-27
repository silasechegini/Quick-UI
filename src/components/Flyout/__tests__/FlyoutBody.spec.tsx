import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FlyoutBody } from "../index";

describe("FlyoutBody", () => {
  it("renders children correctly", () => {
    render(<FlyoutBody>Body content</FlyoutBody>);
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("applies additional className if provided", () => {
    const { container } = render(
      <FlyoutBody className="my-body-class">Body content</FlyoutBody>,
    );
    expect(container.firstChild).toHaveClass("my-body-class");
  });
});

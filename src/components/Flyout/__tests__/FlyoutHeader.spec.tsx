import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FlyoutHeader } from "../index";

describe("FlyoutHeader", () => {
  it("renders children correctly", () => {
    render(<FlyoutHeader>My Flyout Title</FlyoutHeader>);
    expect(screen.getByText("My Flyout Title")).toBeInTheDocument();
  });

  it("renders a close button if onClose is provided", () => {
    const handleClose = jest.fn();
    render(<FlyoutHeader onClose={handleClose}>Title</FlyoutHeader>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("applies additional className if provided", () => {
    const { container } = render(
      <FlyoutHeader className="custom-class">Title</FlyoutHeader>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

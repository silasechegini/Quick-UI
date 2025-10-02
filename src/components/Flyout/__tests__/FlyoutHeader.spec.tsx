import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FlyoutHeader from "../components/FlyoutHeader";
import { vi } from "vitest";
import { ButtonProps } from "@components/Button";

// Mock the dependencies
vi.mock("@components/Button", () => ({
  Button: ({ children, onClick, icon, ...props }: ButtonProps) => (
    <button onClick={onClick} {...props}>
      {icon}
      {children}
    </button>
  ),
  BUTTON_SIZES: { EXTRASMALL: "xs" },
  BUTTON_VARIANTS: { TERTIARY: "tertiary" },
}));

vi.mock("@assets", () => ({
  iconSvgMapping: {
    close_icon: ({ className }: { [key: string]: string }) => (
      <svg className={className} data-testid="close-icon" />
    ),
  },
}));

describe("FlyoutHeader", () => {
  it("renders children correctly", () => {
    render(<FlyoutHeader>My Flyout Title</FlyoutHeader>);
    expect(screen.getByText("My Flyout Title")).toBeInTheDocument();
  });

  it("renders a close button if onClose is provided", () => {
    const handleClose = vi.fn();
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

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { HeaderBrand } from "../HeaderBrand";
import { ButtonProps } from "@components/Button";

// Mock the Button component
vi.mock("../../../Button", () => ({
  Button: ({
    children,
    onClick,
    className,
    variant,
    ...props
  }: ButtonProps) => (
    <button
      onClick={onClick}
      className={className}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  ),
  BUTTON_VARIANTS: {
    TERTIARY: "tertiary",
  },
}));

// Mock styles
vi.mock("../../styles.module.scss", () => ({
  default: {
    logo: "logo",
    brandName: "brandName",
    brand: "brand",
  },
}));

describe("HeaderBrand", () => {
  it("returns null when no logo and no brand name are provided", () => {
    const { container } = render(<HeaderBrand />);
    expect(container.firstChild).toBeNull();
  });

  it("renders logo when provided", () => {
    const mockLogo = <img src="/logo.png" alt="Test Logo" />;
    render(<HeaderBrand logo={mockLogo} />);

    expect(screen.getByAltText("Test Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Test Logo").closest("div")).toHaveClass("logo");
  });

  it("renders brand name when provided", () => {
    render(<HeaderBrand brandName="Test Brand" />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Test Brand")).toBeInTheDocument();
    expect(screen.getByText("Test Brand")).toHaveClass("brandName");
  });

  it("renders both logo and brand name when both are provided", () => {
    const mockLogo = <img src="/logo.png" alt="Test Logo" />;
    render(<HeaderBrand logo={mockLogo} brandName="Test Brand" />);

    expect(screen.getByAltText("Test Logo")).toBeInTheDocument();
    expect(screen.getByText("Test Brand")).toBeInTheDocument();
  });

  it("renders as a div when no onClick handler is provided", () => {
    render(<HeaderBrand brandName="Test Brand" />);

    const brandElement = screen.getByText("Test Brand").closest("div");
    expect(brandElement).toHaveClass("brand");
    expect(brandElement?.tagName).toBe("DIV");
  });

  it("renders as a button when onClick handler is provided", () => {
    const mockOnClick = vi.fn();
    render(<HeaderBrand brandName="Test Brand" onBrandClick={mockOnClick} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("brand");
    expect(button).toHaveAttribute("data-variant", "tertiary");
  });

  it("calls onClick handler when brand button is clicked", () => {
    const mockOnClick = vi.fn();
    render(<HeaderBrand brandName="Test Brand" onBrandClick={mockOnClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("sets correct aria-label when brand name is provided", () => {
    const mockOnClick = vi.fn();
    render(<HeaderBrand brandName="Test Brand" onBrandClick={mockOnClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Go to Test Brand");
  });

  it("sets default aria-label when no brand name is provided", () => {
    const mockLogo = <img src="/logo.png" alt="Test Logo" />;
    const mockOnClick = vi.fn();
    render(<HeaderBrand logo={mockLogo} onBrandClick={mockOnClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Go to home");
  });

  it("handles only logo without brand name", () => {
    const mockLogo = <span data-testid="custom-logo">Custom Logo</span>;
    render(<HeaderBrand logo={mockLogo} />);

    expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("handles only brand name without logo", () => {
    render(<HeaderBrand brandName="Only Brand" />);

    expect(screen.getByText("Only Brand")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

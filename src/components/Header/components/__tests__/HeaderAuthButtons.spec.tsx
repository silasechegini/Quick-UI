import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { HeaderAuthButtons } from "../HeaderAuthButtons";
import { ButtonProps } from "@components/Button";

// Mock the Button component
vi.mock("../../../Button", () => ({
  Button: ({ children, onClick, variant, size, ...props }: ButtonProps) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  ),
  BUTTON_VARIANTS: {
    TERTIARY: "tertiary",
    PRIMARY: "primary",
  },
  BUTTON_SIZES: {
    SMALL: "small",
  },
}));

// Mock styles
vi.mock("../../styles.module.scss", () => ({
  default: {
    authButtons: "authButtons",
  },
}));

describe("HeaderAuthButtons", () => {
  it("returns null when showAuth is false", () => {
    const { container } = render(<HeaderAuthButtons showAuth={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when user is present (logged in)", () => {
    const user = { name: "John Doe", email: "john@example.com" };
    const { container } = render(<HeaderAuthButtons user={user} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when showAuth is true but user is present", () => {
    const user = { name: "John Doe", email: "john@example.com" };
    const { container } = render(
      <HeaderAuthButtons showAuth={true} user={user} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders auth buttons when showAuth is true and no user", () => {
    render(<HeaderAuthButtons showAuth={true} />);

    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("renders auth buttons by default when no user (showAuth defaults to true)", () => {
    render(<HeaderAuthButtons />);

    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("applies correct styling and variants to buttons", () => {
    render(<HeaderAuthButtons />);

    const loginButton = screen.getByText("Log in");
    const signupButton = screen.getByText("Sign up");

    expect(loginButton).toHaveAttribute("data-variant", "tertiary");
    expect(loginButton).toHaveAttribute("data-size", "small");

    expect(signupButton).toHaveAttribute("data-variant", "primary");
    expect(signupButton).toHaveAttribute("data-size", "small");
  });

  it("applies correct container styling", () => {
    render(<HeaderAuthButtons />);

    const container = screen.getByText("Log in").parentElement;
    expect(container).toHaveClass("authButtons");
  });

  it("calls onLogin when login button is clicked", () => {
    const mockOnLogin = vi.fn();
    render(<HeaderAuthButtons onLogin={mockOnLogin} />);

    const loginButton = screen.getByText("Log in");
    fireEvent.click(loginButton);

    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });

  it("calls onCreateAccount when sign up button is clicked", () => {
    const mockOnCreateAccount = vi.fn();
    render(<HeaderAuthButtons onCreateAccount={mockOnCreateAccount} />);

    const signupButton = screen.getByText("Sign up");
    fireEvent.click(signupButton);

    expect(mockOnCreateAccount).toHaveBeenCalledTimes(1);
  });

  it("handles both button clicks independently", () => {
    const mockOnLogin = vi.fn();
    const mockOnCreateAccount = vi.fn();
    render(
      <HeaderAuthButtons
        onLogin={mockOnLogin}
        onCreateAccount={mockOnCreateAccount}
      />,
    );

    const loginButton = screen.getByText("Log in");
    const signupButton = screen.getByText("Sign up");

    fireEvent.click(loginButton);
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnCreateAccount).toHaveBeenCalledTimes(0);

    fireEvent.click(signupButton);
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnCreateAccount).toHaveBeenCalledTimes(1);
  });

  it("works without click handlers", () => {
    render(<HeaderAuthButtons />);

    const loginButton = screen.getByText("Log in");
    const signupButton = screen.getByText("Sign up");

    // Should not throw errors when clicked without handlers
    expect(() => {
      fireEvent.click(loginButton);
      fireEvent.click(signupButton);
    }).not.toThrow();
  });

  it("handles user object with minimal properties", () => {
    const user = { name: "Minimal User" };
    const { container } = render(<HeaderAuthButtons user={user} />);
    expect(container.firstChild).toBeNull();
  });

  it("handles user object with full properties", () => {
    const user = {
      name: "Full User",
      email: "full@example.com",
      avatar: "/avatar.jpg",
      role: "admin",
    };
    const { container } = render(<HeaderAuthButtons user={user} />);
    expect(container.firstChild).toBeNull();
  });
});

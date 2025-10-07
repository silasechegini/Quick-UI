import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { HeaderAuth } from "../HeaderAuth";
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

describe("HeaderAuth", () => {
  it("returns null when showAuth is false", () => {
    const { container } = render(<HeaderAuth showAuth={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when user is present (logged in)", () => {
    const user = { name: "John Doe", email: "john@example.com" };
    const { container } = render(<HeaderAuth user={user} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when showAuth is true but user is present", () => {
    const user = { name: "John Doe", email: "john@example.com" };
    const { container } = render(<HeaderAuth showAuth={true} user={user} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders auth buttons when showAuth is true and no user", () => {
    render(<HeaderAuth showAuth={true} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    expect(
      screen.getByRole("menuitem", { name: /Log in/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /Sign up/ }),
    ).toBeInTheDocument();
  });

  it("renders auth buttons by default when no user (showAuth defaults to true)", () => {
    render(<HeaderAuth />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    expect(
      screen.getByRole("menuitem", { name: /Log in/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /Sign up/ }),
    ).toBeInTheDocument();
  });

  it("calls onLogin when login button is clicked", () => {
    const mockOnLogin = vi.fn();
    render(<HeaderAuth onLogin={mockOnLogin} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    fireEvent.click(screen.getByRole("menuitem", { name: /Log in/ }));

    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });

  it("calls onCreateAccount when sign up button is clicked", () => {
    const mockOnCreateAccount = vi.fn();
    render(<HeaderAuth onCreateAccount={mockOnCreateAccount} />);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    fireEvent.click(screen.getByRole("menuitem", { name: /Sign up/ }));

    expect(mockOnCreateAccount).toHaveBeenCalledTimes(1);
  });

  it("handles both button clicks independently", () => {
    const mockOnLogin = vi.fn();
    const mockOnCreateAccount = vi.fn();
    render(
      <HeaderAuth
        onLogin={mockOnLogin}
        onCreateAccount={mockOnCreateAccount}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    fireEvent.click(screen.getByRole("menuitem", { name: /Log in/ }));
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnCreateAccount).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    fireEvent.click(screen.getByRole("menuitem", { name: /Sign up/ }));
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnCreateAccount).toHaveBeenCalledTimes(1);
  });

  it("works without click handlers", () => {
    render(<HeaderAuth />);

    // Should not throw errors when clicked without handlers
    expect(() => {
      fireEvent.click(screen.getByRole("button", { name: "Menu" }));
      fireEvent.click(screen.getByRole("menuitem", { name: /Log in/ }));

      fireEvent.click(screen.getByRole("button", { name: "Menu" }));
      fireEvent.click(screen.getByRole("menuitem", { name: /Sign up/ }));
    }).not.toThrow();
  });

  it("handles user object with minimal properties", () => {
    const user = { name: "Minimal User" };
    const { container } = render(<HeaderAuth user={user} />);
    expect(container.firstChild).toBeNull();
  });

  it("handles user object with full properties", () => {
    const user = {
      name: "Full User",
      email: "full@example.com",
      avatar: "/avatar.jpg",
      role: "admin",
    };
    const { container } = render(<HeaderAuth user={user} />);
    expect(container.firstChild).toBeNull();
  });
});

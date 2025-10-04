import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { HeaderNavigation } from "../HeaderNavigation";

// Mock styles
vi.mock("../../styles.module.scss", () => ({
  default: {
    navigation: "navigation",
  },
}));

describe("HeaderNavigation", () => {
  it("returns null when no navigation items are provided", () => {
    const { container } = render(<HeaderNavigation />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when navigationItems is explicitly null", () => {
    const { container } = render(<HeaderNavigation navigationItems={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when navigationItems is undefined", () => {
    const { container } = render(
      <HeaderNavigation navigationItems={undefined} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders navigation element when navigation items are provided", () => {
    const navigationItems = (
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    );

    render(<HeaderNavigation navigationItems={navigationItems} />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass("navigation");
  });

  it("renders simple text navigation items", () => {
    const navigationItems = "Simple Nav Text";

    render(<HeaderNavigation navigationItems={navigationItems} />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(screen.getByText("Simple Nav Text")).toBeInTheDocument();
  });

  it("renders complex React node navigation items", () => {
    const navigationItems = (
      <div data-testid="complex-nav">
        <button>Nav Button 1</button>
        <span>Separator</span>
        <button>Nav Button 2</button>
      </div>
    );

    render(<HeaderNavigation navigationItems={navigationItems} />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(screen.getByTestId("complex-nav")).toBeInTheDocument();
    expect(screen.getByText("Nav Button 1")).toBeInTheDocument();
    expect(screen.getByText("Nav Button 2")).toBeInTheDocument();
    expect(screen.getByText("Separator")).toBeInTheDocument();
  });

  it("renders navigation with links", () => {
    const navigationItems = (
      <>
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
      </>
    );

    render(<HeaderNavigation navigationItems={navigationItems} />);

    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Settings" })).toBeInTheDocument();
  });

  it("handles empty string navigation items", () => {
    const { container } = render(<HeaderNavigation navigationItems="" />);
    // Empty string is falsy, so component should return null
    expect(container.firstChild).toBeNull();
  });

  it("handles navigation items with numbers", () => {
    const navigationItems = (
      <div>
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
      </div>
    );

    render(<HeaderNavigation navigationItems={navigationItems} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });
});

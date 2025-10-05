import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ButtonProps } from "../../../Button/Button.types";

// Mock the Button component
vi.mock("../../../Button", () => ({
  Button: ({
    children,
    onClick,
    variant,
    size,
    icon,
    ariaLabel,
    ...props
  }: ButtonProps) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
      {children}
    </button>
  ),
}));

import { PageSidebar } from "../PageSidebar";

describe("PageSidebar", () => {
  it("renders sidebar content when sidebarConfig is provided", () => {
    const sidebarConfig = {
      content: <div>Sidebar content</div>,
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} testId="test-page" />);

    expect(screen.getByTestId("test-page-sidebar")).toBeInTheDocument();
    expect(screen.getByText("Sidebar content")).toBeInTheDocument();
  });

  it("does not render when sidebarConfig is undefined", () => {
    render(<PageSidebar testId="test-page" />);

    expect(screen.queryByTestId("test-page-sidebar")).not.toBeInTheDocument();
  });

  it("renders toggle button when isCollapsible is true", () => {
    const sidebarConfig = {
      content: <div>Sidebar content</div>,
      isCollapsible: true,
      isCollapsed: false,
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} testId="test-page" />);

    expect(screen.getByTestId("test-page-sidebar-toggle")).toBeInTheDocument();
  });

  it("does not render toggle button when isCollapsible is false", () => {
    const sidebarConfig = {
      content: <div>Sidebar content</div>,
      isCollapsible: false,
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} testId="test-page" />);

    expect(
      screen.queryByTestId("test-page-sidebar-toggle"),
    ).not.toBeInTheDocument();
  });

  it("shows expand chevron icon when collapsed", () => {
    const sidebarConfig = {
      content: <div>Sidebar content</div>,
      isCollapsible: true,
      isCollapsed: true,
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} testId="test-page" />);

    const toggleButton = screen.getByTestId("test-page-sidebar-toggle");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-label", "Expand sidebar");

    // Verify the button has the right functionality (clicking it would expand)
    expect(toggleButton.tagName).toBe("BUTTON");
  });

  it("shows collapse chevron icon when expanded", () => {
    const sidebarConfig = {
      content: <div>Sidebar content</div>,
      isCollapsible: true,
      isCollapsed: false,
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} testId="test-page" />);

    const toggleButton = screen.getByTestId("test-page-sidebar-toggle");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-label", "Collapse sidebar");

    // Verify the button has the right functionality (clicking it would collapse)
    expect(toggleButton.tagName).toBe("BUTTON");
  });

  it("calls onToggleSidebar when toggle button is clicked", () => {
    const mockToggle = vi.fn();
    const sidebarConfig = {
      content: <div>Sidebar content</div>,
      isCollapsible: true,
      isCollapsed: false,
    };

    render(
      <PageSidebar
        sidebarConfig={sidebarConfig}
        testId="test-page"
        onToggleSidebar={mockToggle}
      />,
    );

    const toggleButton = screen.getByTestId("test-page-sidebar-toggle");
    fireEvent.click(toggleButton);

    expect(mockToggle).toHaveBeenCalledOnce();
  });

  it("renders with correct semantic structure when collapsed", () => {
    const sidebarConfig = {
      content: <div>Sidebar content</div>,
      isCollapsed: true,
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} testId="test-page" />);

    const sidebarElement = screen.getByTestId("test-page-sidebar");
    expect(sidebarElement.tagName).toBe("ASIDE");
  });

  it("renders with correct semantic structure when expanded", () => {
    const sidebarConfig = {
      content: <div>Sidebar content</div>,
      isCollapsed: false,
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} testId="test-page" />);

    const sidebarElement = screen.getByTestId("test-page-sidebar");
    expect(sidebarElement.tagName).toBe("ASIDE");
  });

  it("uses default testId when not provided", () => {
    const sidebarConfig = {
      content: <div>Sidebar content</div>,
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} />);

    expect(screen.getByTestId("page-sidebar")).toBeInTheDocument();
  });

  it("renders sidebar content in correct container", () => {
    const sidebarConfig = {
      content: <div data-testid="custom-content">Custom sidebar content</div>,
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} testId="test-page" />);

    const contentElement = screen.getByTestId("custom-content");
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent("Custom sidebar content");
  });

  it("renders complex JSX content", () => {
    const sidebarConfig = {
      content: (
        <div>
          <h3>Navigation</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </div>
      ),
    };

    render(<PageSidebar sidebarConfig={sidebarConfig} testId="test-page" />);

    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { HeaderHamburgerMenu } from "../HeaderHamburgerMenu";
import { ButtonProps } from "@components/index";

// Mock the Button component
vi.mock("../../../Button", () => ({
  Button: ({
    children,
    onClick,
    className,
    variant,
    disabled,
    role,
    ...props
  }: ButtonProps) => (
    <button
      onClick={onClick}
      className={className}
      data-variant={variant}
      disabled={disabled}
      role={role}
      {...props}
    >
      {children}
    </button>
  ),
  BUTTON_VARIANTS: {
    TERTIARY: "tertiary",
  },
}));

// Mock the icon mapping
const MockUserIcon = () => <div data-testid="user-icon">User Icon</div>;
const MockSettingsIcon = () => (
  <div data-testid="settings-icon">Settings Icon</div>
);

vi.mock("../../../assets", () => ({
  iconSvgMapping: {
    user_icon: MockUserIcon,
    settings_icon: MockSettingsIcon,
  },
}));

// Mock styles
vi.mock("../../styles.module.scss", () => ({
  default: {
    hamburgerContainer: "hamburgerContainer",
    hamburgerTrigger: "hamburgerTrigger",
    hamburgerIcon: "hamburgerIcon",
    hamburgerLine: "hamburgerLine",
    hamburgerLineOpen: "hamburgerLineOpen",
    hamburgerDropdown: "hamburgerDropdown",
    menuDivider: "menuDivider",
    hamburgerMenuItem: "hamburgerMenuItem",
    menuItemIcon: "menuItemIcon",
  },
}));

// Mock React.createElement (simpler approach)
const originalCreateElement = React.createElement;
vi.spyOn(React, "createElement").mockImplementation(
  (type, props, ...children) => {
    if (typeof type === "function" && type.name && type.name.includes("Icon")) {
      return originalCreateElement(
        "div",
        {
          "data-testid": "mock-icon",
          "data-icon-type": type.name,
          ...(props || {}),
        },
        ...children,
      );
    }
    return originalCreateElement(type, props, ...children);
  },
);

describe("HeaderHamburgerMenu", () => {
  it("returns null when showHamburgerMenu is false and no user", () => {
    const { container } = render(
      <HeaderHamburgerMenu showHamburgerMenu={false} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("returns null when no menu items would be shown", () => {
    const { container } = render(
      <HeaderHamburgerMenu showHamburgerMenu={true} hamburgerMenuItems={[]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders hamburger button when conditions are met", () => {
    const user = { name: "John Doe" };
    render(<HeaderHamburgerMenu user={user} />);

    const button = screen.getByRole("button", { name: "Menu" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("hamburgerTrigger");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-haspopup", "menu");
  });

  it("renders hamburger icon with correct structure", () => {
    const user = { name: "John Doe" };
    render(<HeaderHamburgerMenu user={user} />);

    const hamburgerIcon = screen
      .getByRole("button")
      .querySelector(".hamburgerIcon");
    expect(hamburgerIcon).toBeInTheDocument();

    const lines = hamburgerIcon?.querySelectorAll(".hamburgerLine");
    expect(lines).toHaveLength(3);
  });

  it("toggles menu open state when button is clicked", () => {
    const user = { name: "John Doe" };
    render(<HeaderHamburgerMenu user={user} />);

    const button = screen.getByRole("button", { name: "Menu" });

    // Initially closed
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();

    // Click to close
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders default menu items for logged in user", () => {
    const user = { name: "John Doe" };
    render(<HeaderHamburgerMenu user={user} />);

    // Open the menu
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    expect(
      screen.getByRole("menuitem", { name: /Profile/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /Settings/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /Log out/ }),
    ).toBeInTheDocument();

    // Check for divider
    const divider = screen.getByRole("menu").querySelector(".menuDivider");
    expect(divider).toBeInTheDocument();
  });

  it("calls onProfileClick when profile menu item is clicked", () => {
    const mockOnProfileClick = vi.fn();
    const user = { name: "John Doe" };

    render(
      <HeaderHamburgerMenu user={user} onProfileClick={mockOnProfileClick} />,
    );

    // Open menu and click profile
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    fireEvent.click(screen.getByRole("menuitem", { name: /Profile/ }));

    expect(mockOnProfileClick).toHaveBeenCalledTimes(1);

    // Menu should close after click
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("calls onSettingsClick when settings menu item is clicked", () => {
    const mockOnSettingsClick = vi.fn();
    const user = { name: "John Doe" };

    render(
      <HeaderHamburgerMenu user={user} onSettingsClick={mockOnSettingsClick} />,
    );

    // Open menu and click settings
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    fireEvent.click(screen.getByRole("menuitem", { name: /Settings/ }));

    expect(mockOnSettingsClick).toHaveBeenCalledTimes(1);

    // Menu should close after click
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("calls onLogout when logout menu item is clicked", () => {
    const mockOnLogout = vi.fn();
    const user = { name: "John Doe" };

    render(<HeaderHamburgerMenu user={user} onLogout={mockOnLogout} />);

    // Open menu and click logout
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    fireEvent.click(screen.getByRole("menuitem", { name: /Log out/ }));

    expect(mockOnLogout).toHaveBeenCalledTimes(1);

    // Menu should close after click
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders custom menu items when provided", () => {
    const customItems = [
      {
        id: "custom1",
        label: "Custom Item 1",
        onClick: vi.fn(),
        disabled: false,
      },
      {
        id: "custom2",
        label: "Custom Item 2",
        icon: "user_icon",
        onClick: vi.fn(),
        disabled: true,
      },
    ];

    render(
      <HeaderHamburgerMenu
        hamburgerMenuItems={customItems}
        showHamburgerMenu={true}
      />,
    );

    // Open menu
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    expect(
      screen.getByRole("menuitem", { name: "Custom Item 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "Custom Item 2" }),
    ).toBeInTheDocument();

    // Check disabled state
    expect(
      screen.getByRole("menuitem", { name: "Custom Item 2" }),
    ).toBeDisabled();
  });

  it("renders dividers in custom menu items", () => {
    const customItems = [
      {
        id: "item1",
        label: "Item 1",
        onClick: vi.fn(),
      },
      {
        id: "divider1",
        label: "",
        divider: true,
      },
      {
        id: "item2",
        label: "Item 2",
        onClick: vi.fn(),
      },
    ];

    render(
      <HeaderHamburgerMenu
        hamburgerMenuItems={customItems}
        showHamburgerMenu={true}
      />,
    );

    // Open menu
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    const dividers = screen.getByRole("menu").querySelectorAll(".menuDivider");
    expect(dividers).toHaveLength(1);
  });

  it("handles menu items without click handlers", () => {
    const customItems = [
      {
        id: "nohandler",
        label: "No Handler Item",
        disabled: false,
      },
    ];

    render(
      <HeaderHamburgerMenu
        hamburgerMenuItems={customItems}
        showHamburgerMenu={true}
      />,
    );

    // Open menu
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    const menuItem = screen.getByRole("menuitem", { name: "No Handler Item" });

    // Should not throw when clicked
    expect(() => {
      fireEvent.click(menuItem);
    }).not.toThrow();
  });

  it("updates hamburger line classes when menu is open", () => {
    const user = { name: "John Doe" };
    render(<HeaderHamburgerMenu user={user} />);

    const button = screen.getByRole("button", { name: "Menu" });
    const hamburgerIcon = button.querySelector(".hamburgerIcon");
    const lines = hamburgerIcon?.querySelectorAll(".hamburgerLine");

    // Initially closed
    lines?.forEach((line) => {
      expect(line).not.toHaveClass("hamburgerLineOpen");
    });

    // Open menu
    fireEvent.click(button);
    lines?.forEach((line) => {
      expect(line).toHaveClass("hamburgerLineOpen");
    });
  });

  it("shows hamburger menu even without user when showHamburgerMenu is true and custom items provided", () => {
    const customItems = [
      {
        id: "guest",
        label: "Guest Action",
        onClick: vi.fn(),
      },
    ];

    render(
      <HeaderHamburgerMenu
        showHamburgerMenu={true}
        hamburgerMenuItems={customItems}
      />,
    );

    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });
});

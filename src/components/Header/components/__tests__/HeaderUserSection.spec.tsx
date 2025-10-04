import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock the icon mapping BEFORE importing the component
const MockUserIcon = () => <svg data-testid="user-icon">User Icon</svg>;
vi.mock("../../../assets", () => ({
  iconSvgMapping: {
    user_icon: MockUserIcon,
  },
}));

// Now import the component after the mock
import { HeaderUserSection } from "../HeaderUserSection";

// Mock styles
vi.mock("../../styles.module.scss", () => ({
  default: {
    userDisplay: "userDisplay",
    userInfo: "userInfo",
    avatar: "avatar",
    avatarPlaceholder: "avatarPlaceholder",
    userName: "userName",
  },
}));

describe("HeaderUserSection", () => {
  it("returns null when no user is provided", () => {
    const { container } = render(<HeaderUserSection />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when user is null", () => {
    const { container } = render(<HeaderUserSection user={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when user is undefined", () => {
    const { container } = render(<HeaderUserSection user={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders user avatar when provided", () => {
    const user = {
      name: "John Doe",
      avatar: "/path/to/avatar.jpg",
    };
    render(<HeaderUserSection user={user} />);

    const avatar = screen.getByAltText("John Doe's avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "/path/to/avatar.jpg");
    expect(avatar).toHaveClass("avatar");
  });

  it("renders correct structure with avatar", () => {
    const user = {
      name: "Alice Johnson",
      avatar: "/alice.jpg",
    };
    render(<HeaderUserSection user={user} />);

    // Check overall structure - get the outer container
    const userInfo = screen.getByText("Alice Johnson").parentElement;
    expect(userInfo).toHaveClass("userInfo");

    const userDisplay = userInfo?.parentElement;
    expect(userDisplay).toHaveClass("userDisplay");

    // Check avatar and name are both present
    expect(screen.getByAltText("Alice Johnson's avatar")).toBeInTheDocument();
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
  });

  it("handles user with additional properties", () => {
    const user = {
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "admin",
      avatar: "/charlie.png",
    };
    render(<HeaderUserSection user={user} />);

    expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
    expect(screen.getByAltText("Charlie Brown's avatar")).toBeInTheDocument();
    expect(screen.getByAltText("Charlie Brown's avatar")).toHaveAttribute(
      "src",
      "/charlie.png",
    );
  });
});

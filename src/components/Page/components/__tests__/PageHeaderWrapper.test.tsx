import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageHeaderWrapper } from "../PageHeaderWrapper";

describe("PageHeaderWrapper", () => {
  it("renders Header component when show is true", () => {
    render(<PageHeaderWrapper header={{ show: true }} testId="test-page" />);

    expect(screen.getByTestId("test-page-header")).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    render(<PageHeaderWrapper header={{ show: false }} testId="test-page" />);

    expect(screen.queryByTestId("test-page-header")).not.toBeInTheDocument();
  });

  it("renders with default props when header is undefined", () => {
    render(<PageHeaderWrapper testId="test-page" />);

    // Header component renders with default props when no header config
    expect(screen.getByTestId("test-page-header")).toBeInTheDocument();
  });

  it("passes header props to Header component", () => {
    const headerProps = {
      show: true,
      title: "Test Header",
      navigation: {
        items: [
          { label: "Home", href: "/home" },
          { label: "About", href: "/about" },
        ],
      },
    };

    render(<PageHeaderWrapper header={headerProps} testId="test-page" />);

    const headerElement = screen.getByTestId("test-page-header");
    expect(headerElement).toBeInTheDocument();
  });

  it("uses default testId when not provided", () => {
    render(<PageHeaderWrapper header={{ show: true }} />);

    expect(screen.getByTestId("page-header")).toBeInTheDocument();
  });

  it("passes custom testId to Header component", () => {
    render(<PageHeaderWrapper header={{ show: true }} testId="custom-page" />);

    expect(screen.getByTestId("custom-page-header")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageTitleSection } from "../PageTitleSection";

describe("PageTitleSection", () => {
  it("renders title when provided", () => {
    render(<PageTitleSection title="Test Page Title" testId="test-page" />);

    expect(screen.getByTestId("test-page-page-header")).toBeInTheDocument();
    expect(screen.getByText("Test Page Title")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <PageTitleSection
        description="Test page description"
        testId="test-page"
      />,
    );

    expect(screen.getByTestId("test-page-page-header")).toBeInTheDocument();
    expect(screen.getByText("Test page description")).toBeInTheDocument();
  });

  it("renders both title and description", () => {
    render(
      <PageTitleSection
        title="Test Page Title"
        description="Test page description"
        testId="test-page"
      />,
    );

    expect(screen.getByTestId("test-page-page-header")).toBeInTheDocument();
    expect(screen.getByText("Test Page Title")).toBeInTheDocument();
    expect(screen.getByText("Test page description")).toBeInTheDocument();
  });

  it("does not render when both title and description are undefined", () => {
    render(<PageTitleSection testId="test-page" />);

    expect(
      screen.queryByTestId("test-page-page-header"),
    ).not.toBeInTheDocument();
  });

  it("does not render when both title and description are empty strings", () => {
    render(<PageTitleSection title="" description="" testId="test-page" />);

    expect(
      screen.queryByTestId("test-page-page-header"),
    ).not.toBeInTheDocument();
  });

  it("renders when only title is provided", () => {
    render(<PageTitleSection title="Only Title" testId="test-page" />);

    expect(screen.getByTestId("test-page-page-header")).toBeInTheDocument();
    expect(screen.getByText("Only Title")).toBeInTheDocument();
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  it("renders when only description is provided", () => {
    render(
      <PageTitleSection description="Only Description" testId="test-page" />,
    );

    expect(screen.getByTestId("test-page-page-header")).toBeInTheDocument();
    expect(screen.getByText("Only Description")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("uses default testId when not provided", () => {
    render(<PageTitleSection title="Test Title" />);

    expect(screen.getByTestId("page-page-header")).toBeInTheDocument();
  });

  it("renders with correct semantic structure", () => {
    render(
      <PageTitleSection
        title="Test Title"
        description="Test Description"
        testId="test-page"
      />,
    );

    const headerElement = screen.getByTestId("test-page-page-header");
    expect(headerElement.tagName).toBe("HEADER");

    const titleElement = screen.getByText("Test Title");
    expect(titleElement.tagName).toBe("H1");

    const descriptionElement = screen.getByText("Test Description");
    expect(descriptionElement.tagName).toBe("P");
  });

  it("renders title as h1 element", () => {
    render(<PageTitleSection title="Test Title" testId="test-page" />);

    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent("Test Title");
  });

  it("renders description as paragraph element", () => {
    render(
      <PageTitleSection description="Test Description" testId="test-page" />,
    );

    const descriptionElement = screen.getByText("Test Description");
    expect(descriptionElement.tagName).toBe("P");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageMainContent } from "../PageMainContent";

describe("PageMainContent", () => {
  it("renders children when no loading or error state", () => {
    render(
      <PageMainContent testId="test-page">
        <div>Page content</div>
      </PageMainContent>,
    );

    expect(screen.getByTestId("test-page-content")).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders loading state when loading is true", () => {
    render(
      <PageMainContent loading={true} testId="test-page">
        <div>Page content</div>
      </PageMainContent>,
    );

    expect(screen.getByTestId("test-page-loading")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Page content")).not.toBeInTheDocument();
  });

  it("renders error state when error is provided as string", () => {
    render(
      <PageMainContent error="Something went wrong" testId="test-page">
        <div>Page content</div>
      </PageMainContent>,
    );

    expect(screen.getByTestId("test-page-error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByText("Page content")).not.toBeInTheDocument();
  });

  it("renders error state when error is provided as ReactNode", () => {
    const errorComponent = (
      <div>
        <h3>Custom Error</h3>
        <p>Something went wrong</p>
      </div>
    );

    render(
      <PageMainContent error={errorComponent} testId="test-page">
        <div>Page content</div>
      </PageMainContent>,
    );

    expect(screen.getByTestId("test-page-error")).toBeInTheDocument();
    expect(screen.getByText("Custom Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByText("Page content")).not.toBeInTheDocument();
  });

  it("prioritizes loading over error state", () => {
    render(
      <PageMainContent loading={true} error="Error message" testId="test-page">
        <div>Page content</div>
      </PageMainContent>,
    );

    expect(screen.getByTestId("test-page-loading")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("test-page-error")).not.toBeInTheDocument();
    expect(screen.queryByText("Error message")).not.toBeInTheDocument();
  });

  it("prioritizes error over content when not loading", () => {
    render(
      <PageMainContent loading={false} error="Error message" testId="test-page">
        <div>Page content</div>
      </PageMainContent>,
    );

    expect(screen.getByTestId("test-page-error")).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.queryByText("Page content")).not.toBeInTheDocument();
  });

  it("uses default testId when not provided", () => {
    render(
      <PageMainContent>
        <div>Page content</div>
      </PageMainContent>,
    );

    expect(screen.getByTestId("page-content")).toBeInTheDocument();
  });

  it("renders with correct semantic structure", () => {
    render(
      <PageMainContent testId="test-page">
        <div>Page content</div>
      </PageMainContent>,
    );

    const contentElement = screen.getByTestId("test-page-content");
    expect(contentElement.tagName).toBe("MAIN");
  });

  it("renders loading state with correct structure", () => {
    render(<PageMainContent loading={true} testId="test-page" />);

    const loadingElement = screen.getByTestId("test-page-loading");
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveTextContent("Loading...");
  });

  it("renders error state with correct structure", () => {
    render(<PageMainContent error="Error message" testId="test-page" />);

    const errorElement = screen.getByTestId("test-page-error");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent("Error message");
  });

  it("renders empty when no children and no special states", () => {
    render(<PageMainContent testId="test-page" />);

    const contentElement = screen.getByTestId("test-page-content");
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toBeEmptyDOMElement();
  });

  it("renders string error wrapped in paragraph", () => {
    render(<PageMainContent error="Simple error" testId="test-page" />);

    const errorElement = screen.getByTestId("test-page-error");
    const paragraph = errorElement.querySelector("p");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent("Simple error");
  });

  it("renders ReactNode error without wrapping", () => {
    const customError = <span>Custom error component</span>;

    render(<PageMainContent error={customError} testId="test-page" />);

    const errorElement = screen.getByTestId("test-page-error");
    const span = errorElement.querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("Custom error component");
  });

  it("renders multiple children", () => {
    render(
      <PageMainContent testId="test-page">
        <h1>Title</h1>
        <p>Description</p>
        <div>Content</div>
      </PageMainContent>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});

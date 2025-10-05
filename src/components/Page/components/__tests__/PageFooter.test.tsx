import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageFooter } from "../PageFooter";

describe("PageFooter", () => {
  it("renders footer content when provided", () => {
    render(
      <PageFooter footer={<div>Footer content</div>} testId="test-page" />,
    );

    expect(screen.getByTestId("test-page-footer")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("renders string footer content", () => {
    render(<PageFooter footer="Simple footer text" testId="test-page" />);

    expect(screen.getByTestId("test-page-footer")).toBeInTheDocument();
    expect(screen.getByText("Simple footer text")).toBeInTheDocument();
  });

  it("does not render when footer is undefined", () => {
    render(<PageFooter testId="test-page" />);

    expect(screen.queryByTestId("test-page-footer")).not.toBeInTheDocument();
  });

  it("does not render when footer is null", () => {
    render(<PageFooter footer={null} testId="test-page" />);

    expect(screen.queryByTestId("test-page-footer")).not.toBeInTheDocument();
  });

  it("uses default testId when not provided", () => {
    render(<PageFooter footer="Footer content" />);

    expect(screen.getByTestId("page-footer")).toBeInTheDocument();
  });

  it("renders complex JSX footer content", () => {
    render(
      <PageFooter
        footer={
          <div>
            <p>Copyright 2024</p>
            <a href="/privacy">Privacy Policy</a>
          </div>
        }
        testId="test-page"
      />,
    );

    expect(screen.getByTestId("test-page-footer")).toBeInTheDocument();
    expect(screen.getByText("Copyright 2024")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  });

  it("renders with correct semantic structure", () => {
    render(<PageFooter footer="Footer content" testId="test-page" />);

    const footerElement = screen.getByTestId("test-page-footer");
    expect(footerElement.tagName).toBe("FOOTER");
  });
});

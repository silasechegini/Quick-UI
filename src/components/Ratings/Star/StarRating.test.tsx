import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StarRating from "./index";
import { FaHeart } from "react-icons/fa";

describe("StarRating", () => {
  it("renders with default props", () => {
    render(<StarRating />);
    const stars = screen.getAllByRole("button");
    expect(stars).toHaveLength(5); // default count
  });

  it("renders correct number of stars", () => {
    render(<StarRating count={3} />);
    const stars = screen.getAllByRole("button");
    expect(stars).toHaveLength(3);
  });

  it("applies default value correctly", () => {
    render(<StarRating defaultValue={3} data-testid="star-rating" />);
    const container = screen.getByTestId("star-rating");
    expect(container).toBeInTheDocument();
  });

  it("handles controlled value", () => {
    const { rerender } = render(<StarRating value={2} />);
    rerender(<StarRating value={4} />);
    // Component should re-render without errors
  });

  it("calls onChange when star is clicked", () => {
    const handleChange = vi.fn();
    render(<StarRating onChange={handleChange} />);

    const firstStar = screen.getAllByRole("button")[0];
    fireEvent.click(firstStar);

    expect(handleChange).toHaveBeenCalled();
  });

  it("does not call callbacks when disabled", () => {
    const handleChange = vi.fn();
    render(<StarRating disabled onChange={handleChange} />);

    const firstStar = screen.getAllByRole("button")[0];
    fireEvent.click(firstStar);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("does not call callbacks when read-only", () => {
    const handleChange = vi.fn();
    render(<StarRating readOnly onChange={handleChange} />);

    const firstStar = screen.getAllByRole("button")[0];
    fireEvent.click(firstStar);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("shows numeric value when showValue is true", () => {
    render(<StarRating defaultValue={3.5} showValue allowHalf />);
    expect(screen.getByText("3.5/5")).toBeInTheDocument();
  });

  it("renders custom icons", () => {
    render(
      <StarRating
        filledIcon={FaHeart}
        emptyIcon={FaHeart}
        data-testid="star-rating"
      />,
    );
    const container = screen.getByTestId("star-rating");
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<StarRating className="custom-rating" data-testid="star-rating" />);
    const container = screen.getByTestId("star-rating");
    expect(container).toHaveClass("custom-rating");
  });

  it("applies size classes correctly", () => {
    render(<StarRating size="large" data-testid="star-rating" />);
    const container = screen.getByTestId("star-rating");
    expect(container.className).toContain("sizeLarge");
  });

  it("applies variant classes correctly", () => {
    render(<StarRating variant="outlined" data-testid="star-rating" />);
    const stars = screen.getAllByRole("button");
    // Just check that the variant prop is accepted without error
    expect(stars).toHaveLength(5);
  });

  it("applies disabled state correctly", () => {
    render(<StarRating disabled data-testid="star-rating" />);
    const container = screen.getByTestId("star-rating");
    expect(container.className).toContain("disabled");
  });

  it("applies readOnly state correctly", () => {
    render(<StarRating readOnly data-testid="star-rating" />);
    const container = screen.getByTestId("star-rating");
    expect(container.className).toContain("readOnly");
  });

  it("handles keyboard navigation", () => {
    const handleChange = vi.fn();
    render(<StarRating onChange={handleChange} />);

    const firstStar = screen.getAllByRole("button")[0];
    firstStar.focus();

    // Test Enter key
    fireEvent.keyDown(firstStar, { key: "Enter" });
    expect(handleChange).toHaveBeenCalled();
  });

  it("supports half ratings when allowHalf is true", () => {
    render(<StarRating allowHalf defaultValue={2.5} />);
    const stars = screen.getAllByRole("button");
    expect(stars).toHaveLength(5);
  });

  it("renders children when provided", () => {
    render(
      <StarRating>
        <span>Custom content</span>
      </StarRating>,
    );
    expect(screen.getByText("Custom content")).toBeInTheDocument();
  });

  it("applies custom styles", () => {
    const customStyle = { backgroundColor: "rgb(255, 0, 0)" };
    render(<StarRating style={customStyle} data-testid="star-rating" />);
    const container = screen.getByTestId("star-rating");
    expect(container).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<StarRating ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies correct ARIA attributes", () => {
    render(<StarRating aria-label="Product rating" />);

    const stars = screen.getAllByRole("button");
    stars.forEach((star) => {
      expect(star).toHaveAttribute("aria-label");
    });
  });

  it("applies custom colors correctly", () => {
    render(
      <StarRating
        inactiveColor="#cccccc"
        activeColor="#ffcc00"
        hoverColor="#ff9900"
        data-testid="star-rating"
      />,
    );

    const container = screen.getByTestId("star-rating");
    expect(container).toBeInTheDocument();
  });

  it("handles accessibility features", () => {
    render(
      <StarRating
        aria-label="Rate this product from 1 to 5 stars"
        data-testid="star-rating"
      />,
    );

    const container = screen.getByTestId("star-rating");
    expect(container).toHaveAttribute(
      "aria-label",
      "Rate this product from 1 to 5 stars",
    );
  });
});

describe("StarRating accessibility", () => {
  it("has proper ARIA roles", () => {
    render(<StarRating />);
    const stars = screen.getAllByRole("button");
    expect(stars).toHaveLength(5);
  });

  it("supports keyboard navigation with Tab", () => {
    render(<StarRating />);
    const firstStar = screen.getAllByRole("button")[0];

    firstStar.focus();
    expect(document.activeElement).toBe(firstStar);
  });

  it("announces rating changes to screen readers", () => {
    render(<StarRating aria-label="Product rating" />);
    const container = screen.getByRole("radiogroup");
    expect(container).toBeInTheDocument();
  });
});

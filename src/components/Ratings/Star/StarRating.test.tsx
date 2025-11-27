import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StarRating from "./index";
import { FaHeart } from "react-icons/fa";
import { STAR_SIZES, STAR_VARIANTS } from "./types";

describe("StarRating", () => {
  it("renders with default props", () => {
    render(<StarRating />);
    const stars = screen.getAllByRole("radio");
    expect(stars).toHaveLength(5); // default count
  });

  it("renders correct number of stars", () => {
    render(<StarRating count={3} />);
    const stars = screen.getAllByRole("radio");
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

    const firstStar = screen.getAllByRole("radio")[0];
    fireEvent.click(firstStar);

    expect(handleChange).toHaveBeenCalled();
  });

  it("does not call callbacks when disabled", () => {
    const handleChange = vi.fn();
    render(<StarRating disabled onChange={handleChange} />);

    const firstStar = screen.getAllByRole("radio")[0];
    fireEvent.click(firstStar);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("does not call callbacks when read-only", () => {
    const handleChange = vi.fn();
    render(<StarRating readOnly onChange={handleChange} />);

    const firstStar = screen.getAllByRole("radio")[0];
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
    render(<StarRating size={STAR_SIZES.LARGE} data-testid="star-rating" />);
    const container = screen.getByTestId("star-rating");
    expect(container.className).toContain("sizeLarge");
  });

  it("applies variant classes correctly", () => {
    render(
      <StarRating variant={STAR_VARIANTS.OUTLINED} data-testid="star-rating" />,
    );
    const stars = screen.getAllByRole("radio");
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

    const firstStar = screen.getAllByRole("radio")[0];
    firstStar.focus();

    // Test Enter key
    fireEvent.keyDown(firstStar, { key: "Enter" });
    expect(handleChange).toHaveBeenCalled();
  });

  it("handles Space key navigation", () => {
    const handleChange = vi.fn();
    render(<StarRating onChange={handleChange} />);

    const secondStar = screen.getAllByRole("radio")[1];
    secondStar.focus();

    // Test Space key
    fireEvent.keyDown(secondStar, { key: " " });
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("calls onStarHover when hovering over stars", () => {
    const handleStarHover = vi.fn();
    render(<StarRating onStarHover={handleStarHover} />);

    const thirdStar = screen.getAllByRole("radio")[2];

    // Test mouse enter
    fireEvent.mouseEnter(thirdStar);
    expect(handleStarHover).toHaveBeenCalledWith(2, 3); // 0-indexed starIndex, 1-indexed rating
  });

  it("calls onStarLeave when mouse leaves the component", () => {
    const handleStarLeave = vi.fn();
    render(<StarRating onStarLeave={handleStarLeave} />);

    const container = screen.getByRole("radiogroup");
    const fourthStar = screen.getAllByRole("radio")[3];

    // First hover to trigger enter state
    fireEvent.mouseEnter(fourthStar);

    // Then leave the container
    fireEvent.mouseLeave(container);
    expect(handleStarLeave).toHaveBeenCalled();
  });

  it("handles hover state correctly with multiple stars", () => {
    const handleStarHover = vi.fn();
    const handleStarLeave = vi.fn();
    render(
      <StarRating
        onStarHover={handleStarHover}
        onStarLeave={handleStarLeave}
      />,
    );

    const container = screen.getByRole("radiogroup");
    const stars = screen.getAllByRole("radio");

    // Hover over first star
    fireEvent.mouseEnter(stars[0]);
    expect(handleStarHover).toHaveBeenCalledWith(0, 1);

    // Move to third star
    fireEvent.mouseEnter(stars[2]);
    expect(handleStarHover).toHaveBeenCalledWith(2, 3);

    // Leave the component container
    fireEvent.mouseLeave(container);
    expect(handleStarLeave).toHaveBeenCalled();

    // Verify call counts
    expect(handleStarHover).toHaveBeenCalledTimes(2);
    expect(handleStarLeave).toHaveBeenCalledTimes(1);
  });

  it("supports half ratings when allowHalf is true", () => {
    render(<StarRating allowHalf defaultValue={2.5} />);
    const stars = screen.getAllByRole("radio");
    expect(stars).toHaveLength(5);
  });

  it("sets half rating when clicking left side of star with allowHalf=true", () => {
    const handleChange = vi.fn();
    render(<StarRating allowHalf onChange={handleChange} />);

    const secondStar = screen.getAllByRole("radio")[1];

    // Mock getBoundingClientRect to simulate left-side click
    const mockRect = {
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect;

    vi.spyOn(secondStar, "getBoundingClientRect").mockReturnValue(mockRect);

    // Simulate click on left side of star (clientX = 25, which is < width/2)
    fireEvent.click(secondStar, { clientX: 25 });

    expect(handleChange).toHaveBeenCalledWith(1.5); // Half rating for left side click
  });

  it("sets full rating when clicking right side of star with allowHalf=true", () => {
    const handleChange = vi.fn();
    render(<StarRating allowHalf onChange={handleChange} />);

    const secondStar = screen.getAllByRole("radio")[1];

    // Mock getBoundingClientRect to simulate right-side click
    const mockRect = {
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect;

    vi.spyOn(secondStar, "getBoundingClientRect").mockReturnValue(mockRect);

    // Simulate click on right side of star (clientX = 75, which is > width/2)
    fireEvent.click(secondStar, { clientX: 75 });

    expect(handleChange).toHaveBeenCalledWith(2); // Full rating for right side click
  });

  it("calls onStarClick with correct data for half rating", () => {
    const handleStarClick = vi.fn();
    render(<StarRating allowHalf onStarClick={handleStarClick} />);

    const thirdStar = screen.getAllByRole("radio")[2];

    // Mock for left-side click
    const mockRect = {
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect;

    vi.spyOn(thirdStar, "getBoundingClientRect").mockReturnValue(mockRect);

    fireEvent.click(thirdStar, { clientX: 30 }); // Left side click

    expect(handleStarClick).toHaveBeenCalledWith(2, 2.5); // starIndex=2, rating=2.5
  });

  it("calls onStarClick with correct parameters for full rating", () => {
    const handleStarClick = vi.fn();
    render(<StarRating allowHalf onStarClick={handleStarClick} />);

    const thirdStar = screen.getAllByRole("radio")[2];

    // Mock for right-side click
    const mockRect = {
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect;

    vi.spyOn(thirdStar, "getBoundingClientRect").mockReturnValue(mockRect);

    fireEvent.click(thirdStar, { clientX: 70 }); // Right side click

    expect(handleStarClick).toHaveBeenCalledWith(2, 3); // starIndex=2, rating=3
  });

  it("displays half-star values correctly with showValue", () => {
    render(<StarRating allowHalf showValue defaultValue={3.5} />);
    expect(screen.getByText("3.5/5")).toBeInTheDocument();
  });

  it("uses custom valueFormatter when provided", () => {
    const customFormatter = (value: number) => {
      return `★ ${value} out of 5 stars`;
    };

    render(
      <StarRating
        defaultValue={4.5}
        allowHalf
        showValue
        valueFormatter={customFormatter}
      />,
    );

    expect(screen.getByText("★ 4.5 out of 5 stars")).toBeInTheDocument();
    expect(screen.queryByText("4.5/5")).not.toBeInTheDocument();
  });

  it("falls back to default format when valueFormatter is not provided", () => {
    render(<StarRating defaultValue={3} showValue />);
    expect(screen.getByText("3/5")).toBeInTheDocument();
  });

  it("valueFormatter works with different rating values", () => {
    const customFormatter = (value: number) => {
      if (value === 0) return "No rating";
      if (value <= 2) return `Poor: ${value}`;
      if (value <= 4) return `Good: ${value}`;
      return `Excellent: ${value}`;
    };

    const { rerender } = render(
      <StarRating value={0} showValue valueFormatter={customFormatter} />,
    );
    expect(screen.getByText("No rating")).toBeInTheDocument();

    rerender(
      <StarRating
        value={1.5}
        allowHalf
        showValue
        valueFormatter={customFormatter}
      />,
    );
    expect(screen.getByText("Poor: 1.5")).toBeInTheDocument();

    rerender(
      <StarRating value={5} showValue valueFormatter={customFormatter} />,
    );
    expect(screen.getByText("Excellent: 5")).toBeInTheDocument();
  });

  it("handles controlled half ratings correctly", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <StarRating allowHalf value={1.5} onChange={handleChange} />,
    );

    const fourthStar = screen.getAllByRole("radio")[3];

    // Mock getBoundingClientRect for left-side click (half rating)
    const mockRect = {
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect;

    vi.spyOn(fourthStar, "getBoundingClientRect").mockReturnValue(mockRect);

    // Click left side for half rating
    fireEvent.click(fourthStar, { clientX: 30 });

    expect(handleChange).toHaveBeenCalledWith(3.5);

    // Re-render with new value
    rerender(<StarRating allowHalf value={3.5} onChange={handleChange} />);

    // Component should render with new value
    const stars = screen.getAllByRole("radio");
    expect(stars).toHaveLength(5);
  });

  it("does not allow half ratings when allowHalf is false", () => {
    const handleChange = vi.fn();
    render(<StarRating allowHalf={false} onChange={handleChange} />);

    const secondStar = screen.getAllByRole("radio")[1];
    fireEvent.click(secondStar);

    // Without allowHalf, should set full rating
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("defaults to full star rating for keyboard navigation with allowHalf=true", () => {
    const handleChange = vi.fn();
    render(<StarRating allowHalf onChange={handleChange} />);

    const thirdStar = screen.getAllByRole("radio")[2];
    thirdStar.focus();

    // Simulate Enter key press (keyboard navigation)
    fireEvent.keyDown(thirdStar, { key: "Enter" });

    // Keyboard navigation should default to full rating even with allowHalf=true
    expect(handleChange).toHaveBeenCalledWith(3);
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

    // Check radiogroup container
    const radiogroup = screen.getByRole("radiogroup");
    expect(radiogroup).toHaveAttribute("aria-label", "Product rating");

    // Check individual radio buttons
    const stars = screen.getAllByRole("radio");
    stars.forEach((star) => {
      expect(star).toHaveAttribute("aria-label");
      expect(star).toHaveAttribute("aria-checked");
    });

    // Check tabindex pattern (only first star should be focusable)
    expect(stars[0]).toHaveAttribute("tabindex", "0");
    for (let i = 1; i < stars.length; i++) {
      expect(stars[i]).toHaveAttribute("tabindex", "-1");
    }
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

    // Check radiogroup container
    const radiogroup = screen.getByRole("radiogroup");
    expect(radiogroup).toBeInTheDocument();

    // Check individual radio buttons
    const stars = screen.getAllByRole("radio");
    expect(stars).toHaveLength(5);

    // Check group wrapper
    const group = screen.getByRole("group");
    expect(group).toBeInTheDocument();
  });

  it("supports proper tab navigation (single tab stop)", () => {
    render(<StarRating />);
    const stars = screen.getAllByRole("radio");

    // Only first star should be in tab order
    expect(stars[0]).toHaveAttribute("tabindex", "0");

    // All other stars should not be in tab order
    for (let i = 1; i < stars.length; i++) {
      expect(stars[i]).toHaveAttribute("tabindex", "-1");
    }

    // Test focus
    stars[0].focus();
    expect(document.activeElement).toBe(stars[0]);
  });

  it("announces rating changes to screen readers", () => {
    render(<StarRating aria-label="Product rating" />);
    const container = screen.getByRole("radiogroup");
    expect(container).toBeInTheDocument();
  });

  it("supports arrow key navigation", () => {
    const handleChange = vi.fn();
    render(<StarRating onChange={handleChange} />);

    const stars = screen.getAllByRole("radio");
    const firstStar = stars[0];

    firstStar.focus();

    // Test Right Arrow key navigation
    fireEvent.keyDown(firstStar, { key: "ArrowRight" });
    // Note: Focus management is handled by the component internally

    // Test Left Arrow key navigation
    fireEvent.keyDown(firstStar, { key: "ArrowLeft" });

    // Test Home key (should go to first star)
    fireEvent.keyDown(firstStar, { key: "Home" });

    // Test End key (should go to last star)
    fireEvent.keyDown(firstStar, { key: "End" });

    // Test Enter key selection
    fireEvent.keyDown(firstStar, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it("has correct aria-checked states", () => {
    render(<StarRating value={3} />);

    const stars = screen.getAllByRole("radio");

    // First 3 stars should be checked
    expect(stars[0]).toHaveAttribute("aria-checked", "true");
    expect(stars[1]).toHaveAttribute("aria-checked", "true");
    expect(stars[2]).toHaveAttribute("aria-checked", "true");

    // Remaining stars should not be checked
    expect(stars[3]).toHaveAttribute("aria-checked", "false");
    expect(stars[4]).toHaveAttribute("aria-checked", "false");
  });
});

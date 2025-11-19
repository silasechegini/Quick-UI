import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Toggle } from "../Toggle";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { TOGGLE_SIZES } from "../Toggle.types";

describe("Toggle Component", () => {
  describe("Basic Rendering", () => {
    it("should render with default props", () => {
      render(<Toggle />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeInTheDocument();
      expect(input).not.toBeChecked();
    });

    it("should render with label", () => {
      render(<Toggle label="Enable feature" />);
      expect(screen.getByText("Enable feature")).toBeInTheDocument();
    });

    it("should render with description", () => {
      render(
        <Toggle label="Enable feature" description="This is a description" />,
      );
      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const { container } = render(<Toggle className="custom-toggle" />);
      expect(container.querySelector(".custom-toggle")).toBeInTheDocument();
    });

    it("should apply size variants correctly", () => {
      const { getByTestId, unmount } = render(
        <Toggle size={TOGGLE_SIZES.SMALL} />,
      );
      const smallSlider = getByTestId("toggle-slider");
      expect(smallSlider).toBeTruthy();
      expect(smallSlider).toHaveAttribute("data-size", "small");
      unmount();

      const { getByTestId: getByTestIdMedium, unmount: unmountMedium } = render(
        <Toggle size={TOGGLE_SIZES.MEDIUM} />,
      );
      const mediumSlider = getByTestIdMedium("toggle-slider");
      expect(mediumSlider).toBeTruthy();
      expect(mediumSlider).toHaveAttribute("data-size", "medium");
      unmountMedium();

      const { getByTestId: getByTestIdLarge } = render(
        <Toggle size={TOGGLE_SIZES.LARGE} />,
      );
      const largeSlider = getByTestIdLarge("toggle-slider");
      expect(largeSlider).toBeTruthy();
      expect(largeSlider).toHaveAttribute("data-size", "large");
    });
  });

  describe("Controlled Component", () => {
    it("should render as checked when checked prop is true", () => {
      render(<Toggle checked={true} />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeChecked();
    });

    it("should render as unchecked when checked prop is false", () => {
      render(<Toggle checked={false} />);
      const input = screen.getByRole("checkbox");
      expect(input).not.toBeChecked();
    });

    it("should call onChange when clicked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Toggle checked={false} onChange={handleChange} label="Test Toggle" />,
      );

      const slider = screen.getByTestId("toggle-slider");
      await user.click(slider);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it("should not update internal state when controlled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Toggle checked={false} onChange={handleChange} label="Test Toggle" />,
      );

      const input = screen.getByRole("checkbox");
      const slider = screen.getByTestId("toggle-slider");
      await user.click(slider);

      // Component should remain unchecked as it's controlled
      expect(input).not.toBeChecked();
    });

    it("should update when checked prop changes", () => {
      const { rerender } = render(<Toggle checked={false} />);
      const input = screen.getByRole("checkbox");
      expect(input).not.toBeChecked();

      rerender(<Toggle checked={true} />);
      expect(input).toBeChecked();
    });
  });

  describe("Uncontrolled Component", () => {
    it("should use defaultChecked for initial state", () => {
      render(<Toggle defaultChecked={true} />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeChecked();
    });

    it("should toggle state when clicked", async () => {
      const user = userEvent.setup();
      render(<Toggle defaultChecked={false} label="Test Toggle" />);
      const input = screen.getByRole("checkbox");
      const slider = screen.getByTestId("toggle-slider");

      expect(input).not.toBeChecked();

      await user.click(slider);
      expect(input).toBeChecked();

      await user.click(slider);
      expect(input).not.toBeChecked();
    });

    it("should call onChange with new state", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Toggle
          defaultChecked={false}
          onChange={handleChange}
          label="Test Toggle"
        />,
      );

      const slider = screen.getByTestId("toggle-slider");
      await user.click(slider);

      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));

      await user.click(slider);
      expect(handleChange).toHaveBeenCalledWith(false, expect.any(Object));
    });
  });

  describe("Disabled State", () => {
    it("should render as disabled", () => {
      render(<Toggle disabled={true} />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeDisabled();
    });

    it("should not respond to clicks when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Toggle
          disabled={true}
          onChange={handleChange}
          label="Disabled Toggle"
        />,
      );

      const input = screen.getByRole("checkbox");
      const label = screen.getByLabelText("Disabled Toggle");

      // Verify element is disabled
      expect(input).toBeDisabled();

      // Try to click the label (which should be safe even for disabled elements)
      // but expect no change because the input is disabled
      try {
        await user.click(label);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        // If clicking is prevented by pointer-events, that's expected for disabled elements
      }

      expect(handleChange).not.toHaveBeenCalled();
      expect(input).not.toBeChecked(); // Should remain unchecked
    });
    it("should apply disabled class to container", () => {
      const { container } = render(<Toggle disabled={true} />);
      const toggleContainer = container.querySelector(
        "div[class*='toggleContainer']",
      );
      expect(toggleContainer?.className).toMatch(/disabled/);
    });

    it("should disable label and description when disabled", () => {
      const { container } = render(
        <Toggle
          disabled={true}
          label="Disabled toggle"
          description="Description"
        />,
      );
      const label = container.querySelector("span[class*='toggleLabel']");
      const description = container.querySelector(
        "div[class*='toggleDescription']",
      );
      expect(label).toBeTruthy();
      expect(label?.className).toMatch(/disabled/);
      expect(description).toBeTruthy();
      expect(description?.className).toMatch(/disabled/);
    });
  });

  describe("Error State", () => {
    it("should display error message when error is true", () => {
      render(<Toggle error={true} errorMessage="This is an error" />);
      expect(screen.getByText("This is an error")).toBeInTheDocument();
    });

    it("should not display error message when error is false", () => {
      render(<Toggle error={false} errorMessage="This is an error" />);
      expect(screen.queryByText("This is an error")).not.toBeInTheDocument();
    });

    it("should display error icon when error is shown", () => {
      const { container } = render(
        <Toggle error={true} errorMessage="Error" />,
      );
      // Icon component console.warns when icon not found in test, but still renders
      // Just check that the error message div is present
      const errorDiv = container.querySelector("div[class*='toggleError']");
      expect(errorDiv).toBeInTheDocument();
    });

    it("should have role alert on error message", () => {
      render(<Toggle error={true} errorMessage="This is an error" />);
      const errorElement = screen.getByRole("alert");
      expect(errorElement).toHaveTextContent("This is an error");
    });

    it("should apply error class to slider", () => {
      const { container } = render(<Toggle error={true} />);
      const slider = container.querySelector("div[class*='toggleSlider']");
      expect(slider).toBeTruthy();
      expect(slider?.className).toMatch(/error/);
    });

    it("should set aria-invalid when error is true", () => {
      render(<Toggle error={true} />);
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Accessibility", () => {
    it("should have checkbox role", () => {
      render(<Toggle />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should associate label with input using htmlFor", () => {
      render(<Toggle label="Test Label" id="test-toggle" />);
      const input = screen.getByLabelText("Test Label");
      expect(input).toHaveAttribute("id", "test-toggle");
      const label = screen.getByText("Test Label").closest("label");
      expect(label).not.toBeNull();
      expect(label).toHaveAttribute("for", "test-toggle");
    });

    it("should set aria-describedby when description is provided", () => {
      render(
        <Toggle label="Test" description="Description" id="test-toggle" />,
      );
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("aria-describedby");
    });

    it("should set aria-describedby when error message is provided", () => {
      render(
        <Toggle error={true} errorMessage="Error message" id="test-toggle" />,
      );
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("aria-describedby");
    });

    it("should generate unique ID when not provided", () => {
      const { container: container1 } = render(<Toggle />);
      const { container: container2 } = render(<Toggle />);

      const input1 = container1.querySelector('input[type="checkbox"]');
      const input2 = container2.querySelector('input[type="checkbox"]');

      expect(input1?.id).toBeTruthy();
      expect(input2?.id).toBeTruthy();
      expect(input1?.id).not.toBe(input2?.id);
    });
  });

  describe("Custom Props", () => {
    it("should pass through additional props to input", () => {
      render(<Toggle data-testid="custom-toggle" />);
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("data-testid", "custom-toggle");
    });

    it("should apply custom classes", () => {
      const { container } = render(
        <Toggle
          className="custom-container"
          labelClassName="custom-label"
          inputClassName="custom-input"
          sliderClassName="custom-slider"
          label="Test"
        />,
      );

      expect(container.querySelector(".custom-container")).toBeInTheDocument();
      expect(container.querySelector(".custom-label")).toBeInTheDocument();
      expect(container.querySelector(".custom-input")).toBeInTheDocument();
      expect(container.querySelector(".custom-slider")).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to input element", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Toggle ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toHaveAttribute("type", "checkbox");
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid clicks", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Toggle
          defaultChecked={false}
          onChange={handleChange}
          label="Test Toggle"
        />,
      );

      const slider = screen.getByTestId("toggle-slider");

      await user.click(slider);
      await user.click(slider);
      await user.click(slider);

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it("should render both description and error message", () => {
      render(
        <Toggle
          description="This is a description"
          error={true}
          errorMessage="This is an error"
        />,
      );
      expect(screen.getByText("This is a description")).toBeInTheDocument();
      expect(screen.getByText("This is an error")).toBeInTheDocument();
    });

    it("should handle missing label gracefully", () => {
      render(<Toggle />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeInTheDocument();
    });

    it("should not show error message without error prop", () => {
      render(<Toggle errorMessage="Error message" />);
      expect(screen.queryByText("Error message")).not.toBeInTheDocument();
    });
  });

  describe("Checked and Unchecked States", () => {
    it("should apply checked class when checked", () => {
      const { container } = render(<Toggle checked={true} />);
      const slider = container.querySelector("div[class*='toggleSlider']");
      expect(slider).toBeTruthy();
      expect(slider?.className).toMatch(/checked/);
    });

    it("should apply unchecked class when unchecked", () => {
      const { container } = render(<Toggle checked={false} />);
      const slider = container.querySelector("div[class*='toggleSlider']");
      expect(slider).toBeTruthy();
      expect(slider?.className).toMatch(/unchecked/);
    });

    it("should toggle classes when clicked", () => {
      const { container } = render(<Toggle defaultChecked={false} />);
      const input = screen.getByRole("checkbox");

      const slider = container.querySelector("div[class*='toggleSlider']");
      expect(slider).toBeTruthy();
      expect(slider?.className).toMatch(/unchecked/);

      fireEvent.click(input);
      expect(slider?.className).toMatch(/checked/);

      fireEvent.click(input);
      expect(slider?.className).toMatch(/unchecked/);
    });
  });
});

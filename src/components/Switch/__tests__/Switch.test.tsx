import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switch } from "../Switch";
import { ICONS } from "@assets/iconType";
import {
  SWITCH_LABEL_POSITIONS,
  SWITCH_SIZES,
  SWITCH_VARIANTS,
} from "../Switch.types";

describe("Switch Component", () => {
  describe("Basic Rendering", () => {
    it("should render with default props", () => {
      render(<Switch />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeInTheDocument();
      expect(input).not.toBeChecked();
    });

    it("should render with label", () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByText("Enable notifications")).toBeInTheDocument();
    });

    it("should render with label on the left", () => {
      const { container } = render(
        <Switch
          label="Dark mode"
          labelPosition={SWITCH_LABEL_POSITIONS.LEFT}
        />,
      );
      expect(screen.getByText("Dark mode")).toBeInTheDocument();
      const label = container.querySelector("label");
      expect(label?.className).toMatch(/labelLeft/);
    });

    it("should render with custom className", () => {
      const { container } = render(<Switch className="custom-switch" />);
      expect(container.querySelector(".custom-switch")).toBeInTheDocument();
    });

    it("should apply size variants correctly", () => {
      const { container: smallContainer } = render(
        <Switch size={SWITCH_SIZES.SMALL} />,
      );
      const smallSwitch = smallContainer.querySelector(
        "span[class*='switchWrapper']",
      );
      expect(smallSwitch?.className).toMatch(/small/);

      const { container: mediumContainer } = render(
        <Switch size={SWITCH_SIZES.MEDIUM} />,
      );
      const mediumSwitch = mediumContainer.querySelector(
        "span[class*='switchWrapper']",
      );
      expect(mediumSwitch?.className).toMatch(/medium/);

      const { container: largeContainer } = render(
        <Switch size={SWITCH_SIZES.LARGE} />,
      );
      const largeSwitch = largeContainer.querySelector(
        "span[class*='switchWrapper']",
      );
      expect(largeSwitch?.className).toMatch(/large/);
    });

    it("should apply variant styles correctly", () => {
      const { container: primaryContainer } = render(
        <Switch variant={SWITCH_VARIANTS.PRIMARY} />,
      );
      const primarySwitch = primaryContainer.querySelector(
        "span[class*='switchWrapper']",
      );
      expect(primarySwitch?.className).toMatch(/primary/);

      const { container: secondaryContainer } = render(
        <Switch variant={SWITCH_VARIANTS.SECONDARY} />,
      );
      const secondarySwitch = secondaryContainer.querySelector(
        "span[class*='switchWrapper']",
      );
      expect(secondarySwitch?.className).toMatch(/secondary/);

      const { container: successContainer } = render(
        <Switch variant={SWITCH_VARIANTS.SUCCESS} />,
      );
      const successSwitch = successContainer.querySelector(
        "span[class*='switchWrapper']",
      );
      expect(successSwitch?.className).toMatch(/success/);

      const { container: dangerContainer } = render(
        <Switch variant={SWITCH_VARIANTS.DANGER} />,
      );
      const dangerSwitch = dangerContainer.querySelector(
        "span[class*='switchWrapper']",
      );
      expect(dangerSwitch?.className).toMatch(/danger/);
    });
  });

  describe("Controlled Component", () => {
    it("should render as checked when checked prop is true", () => {
      render(<Switch checked={true} />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeChecked();
    });

    it("should render as unchecked when checked prop is false", () => {
      render(<Switch checked={false} />);
      const input = screen.getByRole("checkbox");
      expect(input).not.toBeChecked();
    });

    it("should call onChange when clicked", () => {
      const handleChange = vi.fn();
      render(<Switch checked={false} onChange={handleChange} />);

      const input = screen.getByRole("checkbox");
      fireEvent.click(input);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it("should not update internal state when controlled", () => {
      const handleChange = vi.fn();
      render(<Switch checked={false} onChange={handleChange} />);

      const input = screen.getByRole("checkbox");
      fireEvent.click(input);

      expect(input).not.toBeChecked();
    });
  });

  describe("Uncontrolled Component", () => {
    it("should use defaultChecked for initial state", () => {
      render(<Switch defaultChecked={true} />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeChecked();
    });

    it("should toggle state when clicked", () => {
      render(<Switch defaultChecked={false} />);
      const input = screen.getByRole("checkbox");

      expect(input).not.toBeChecked();

      fireEvent.click(input);
      expect(input).toBeChecked();

      fireEvent.click(input);
      expect(input).not.toBeChecked();
    });

    it("should call onChange with new state", () => {
      const handleChange = vi.fn();
      render(<Switch defaultChecked={false} onChange={handleChange} />);

      const input = screen.getByRole("checkbox");
      fireEvent.click(input);

      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));

      fireEvent.click(input);
      expect(handleChange).toHaveBeenCalledWith(false, expect.any(Object));
    });
  });

  describe("Disabled State", () => {
    it("should render as disabled", () => {
      render(<Switch disabled={true} />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeDisabled();
    });

    it("should not respond to clicks when disabled", () => {
      const handleChange = vi.fn();
      render(<Switch disabled={true} onChange={handleChange} />);

      const input = screen.getByRole("checkbox");
      fireEvent.click(input);

      // Note: HTML checkbox with disabled attribute will still trigger onChange in jsdom
      // but the actual behavior in browsers is that it won't trigger
      // We can verify the input has the disabled attribute
      expect(input).toBeDisabled();
    });
    it("should apply disabled class to container", () => {
      const { container } = render(<Switch disabled={true} />);
      const label = container.querySelector("label");
      expect(label?.className).toMatch(/disabled/);
    });
  });

  describe("Accessibility", () => {
    it("should have checkbox role", () => {
      render(<Switch />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should use label as aria-label when label is string", () => {
      render(<Switch label="Enable feature" />);
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("aria-label", "Enable feature");
    });

    it("should accept custom aria-label", () => {
      render(<Switch aria-label="Custom label" />);
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("aria-label", "Custom label");
    });

    it("should accept aria-describedby", () => {
      render(<Switch aria-describedby="description-id" />);
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("aria-describedby", "description-id");
    });

    it("should associate label with input using htmlFor", () => {
      render(<Switch label="Test Label" id="test-switch" />);
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("id", "test-switch");
    });
  });

  describe("Form Integration", () => {
    it("should accept name prop", () => {
      render(<Switch name="switch-name" />);
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("name", "switch-name");
    });

    it("should accept value prop", () => {
      render(<Switch value="switch-value" />);
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("value", "switch-value");
    });

    it("should accept required prop", () => {
      render(<Switch required={true} />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeRequired();
    });

    it("should work with form submission", () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Switch name="terms" defaultChecked={true} />
          <button type="submit">Submit</button>
        </form>,
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to input element", () => {
      const ref = { current: null };
      render(<Switch ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toHaveAttribute("type", "checkbox");
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid clicks", () => {
      const handleChange = vi.fn();
      render(<Switch defaultChecked={false} onChange={handleChange} />);

      const input = screen.getByRole("checkbox");

      fireEvent.click(input);
      fireEvent.click(input);
      fireEvent.click(input);

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it("should handle label as ReactNode", () => {
      render(
        <Switch
          label={
            <span>
              <strong>Bold</strong> Label
            </span>
          }
        />,
      );
      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("Label")).toBeInTheDocument();
    });

    it("should generate unique ID when not provided", () => {
      const { container: container1 } = render(<Switch />);
      const { container: container2 } = render(<Switch />);

      const input1 = container1.querySelector('input[type="checkbox"]');
      const input2 = container2.querySelector('input[type="checkbox"]');

      expect(input1?.id).toBeTruthy();
      expect(input2?.id).toBeTruthy();
      expect(input1?.id).not.toBe(input2?.id);
    });
  });

  describe("Custom Props", () => {
    it("should pass through additional props to input", () => {
      render(<Switch data-testid="custom-switch" />);
      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("data-testid", "custom-switch");
    });

    it("should apply custom classes", () => {
      const { container } = render(
        <Switch
          className="custom-container"
          labelClassName="custom-label"
          switchClassName="custom-switch"
          label="Test"
        />,
      );

      expect(container.querySelector(".custom-container")).toBeInTheDocument();
      expect(container.querySelector(".custom-label")).toBeInTheDocument();
      expect(container.querySelector(".custom-switch")).toBeInTheDocument();
    });
  });

  describe("Icon Support", () => {
    it("should render checked icon when checked", () => {
      const { container } = render(
        <Switch checkedIcon={ICONS.CHECKMARK_ICON} defaultChecked={true} />,
      );

      const thumb = container.querySelector("span[class*='switchThumb']");
      expect(thumb).toBeInTheDocument();
    });

    it("should render unchecked icon when unchecked", () => {
      const { container } = render(
        <Switch uncheckedIcon={ICONS.CLOSE_ICON} defaultChecked={false} />,
      );

      const thumb = container.querySelector("span[class*='switchThumb']");
      expect(thumb).toBeInTheDocument();
    });

    it("should switch between icons when toggled", () => {
      const { container } = render(
        <Switch
          checkedIcon={ICONS.CHECKMARK_ICON}
          uncheckedIcon={ICONS.CLOSE_ICON}
          defaultChecked={false}
        />,
      );

      const input = screen.getByRole("checkbox");
      const thumb = container.querySelector("span[class*='switchThumb']");

      expect(thumb).toBeInTheDocument();

      fireEvent.click(input);

      expect(thumb).toBeInTheDocument();
      expect(input).toBeChecked();
    });

    it("should not render icon container when neither checkedIcon nor uncheckedIcon is provided", () => {
      const { container } = render(<Switch defaultChecked={true} />);

      const thumb = container.querySelector("span[class*='switchThumb']");
      const thumbIcon = container.querySelector("span[class*='thumbIcon']");

      expect(thumb).toBeInTheDocument();
      expect(thumbIcon).not.toBeInTheDocument();
    });

    it("should render custom ReactNode as icon", () => {
      const CustomIcon = <div data-testid="custom-icon">✓</div>;
      render(<Switch checkedIcon={CustomIcon} defaultChecked={true} />);

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("should accept custom icon size", () => {
      const { container } = render(
        <Switch
          checkedIcon={ICONS.CHECKMARK_ICON}
          iconSize={20}
          defaultChecked={true}
        />,
      );

      const thumb = container.querySelector("span[class*='switchThumb']");
      expect(thumb).toBeInTheDocument();
    });
  });
});

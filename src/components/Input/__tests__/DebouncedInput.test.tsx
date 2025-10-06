import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DebouncedInput, { DebouncedInputHandle } from "../DebouncedInput";
import { useRef, useState } from "react";

describe("DebouncedInput Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe("Basic Rendering", () => {
    it("renders debounced input with default props", () => {
      render(<DebouncedInput />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(<DebouncedInput placeholder="Search..." />);
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("renders with label and styling", () => {
      render(
        <DebouncedInput
          label="Search"
          variant="secondary"
          size="l"
          id="search-input"
        />,
      );
      expect(screen.getByLabelText("Search")).toBeInTheDocument();
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("secondary");
      expect(input.className).toContain("l");
    });
  });

  describe("Debouncing Behavior", () => {
    it("debounces onChange calls with default delay", async () => {
      const handleChange = vi.fn();
      render(<DebouncedInput onChange={handleChange} />);

      const input = screen.getByRole("textbox");

      // Type multiple characters quickly
      fireEvent.change(input, { target: { value: "a" } });
      fireEvent.change(input, { target: { value: "ab" } });
      fireEvent.change(input, { target: { value: "abc" } });

      // onChange should not be called immediately
      expect(handleChange).not.toHaveBeenCalled();

      // Fast-forward time to trigger debounce
      vi.advanceTimersByTime(300);

      // onChange should be called once with the final value
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "abc" }),
        }),
      );
    });

    it("uses custom debounce delay", async () => {
      const handleChange = vi.fn();
      render(<DebouncedInput onChange={handleChange} debounceDelay={500} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "test" } });

      // Should not trigger after default delay
      vi.advanceTimersByTime(300);
      expect(handleChange).not.toHaveBeenCalled();

      // Should trigger after custom delay
      vi.advanceTimersByTime(200); // Total 500ms
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("cancels previous debounce when typing continues", async () => {
      const handleChange = vi.fn();
      render(<DebouncedInput onChange={handleChange} debounceDelay={300} />);

      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "a" } });
      vi.advanceTimersByTime(200); // Not enough to trigger

      fireEvent.change(input, { target: { value: "ab" } });
      vi.advanceTimersByTime(200); // Still not enough

      fireEvent.change(input, { target: { value: "abc" } });
      vi.advanceTimersByTime(300); // Now it should trigger

      // Should only call once with final value
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "abc" }),
        }),
      );
    });
  });

  describe("Imperative Handle", () => {
    it("exposes resetDebounce method", () => {
      const TestComponent = () => {
        const ref = useRef<DebouncedInputHandle>(null);

        const handleReset = () => {
          ref.current?.resetDebounce();
        };

        return (
          <div>
            <DebouncedInput ref={ref} />
            <button onClick={handleReset}>Reset</button>
          </div>
        );
      };

      const handleChange = vi.fn();
      render(<TestComponent />);

      const input = screen.getByRole("textbox");
      const resetButton = screen.getByRole("button", { name: "Reset" });

      fireEvent.change(input, { target: { value: "test" } });
      fireEvent.click(resetButton); // Reset before debounce triggers

      vi.advanceTimersByTime(300);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("exposes clearDebounce method", () => {
      const TestComponent = () => {
        const ref = useRef<DebouncedInputHandle>(null);
        const handleChange = vi.fn();

        const handleClear = () => {
          ref.current?.clearDebounce();
        };

        return (
          <div>
            <DebouncedInput ref={ref} onChange={handleChange} />
            <button onClick={handleClear}>Clear</button>
          </div>
        );
      };

      const { container } = render(<TestComponent />);

      const input = screen.getByRole("textbox");
      const clearButton = screen.getByRole("button", { name: "Clear" });

      fireEvent.change(input, { target: { value: "test" } });
      fireEvent.click(clearButton); // Immediately trigger onChange

      // Should be called immediately without waiting for debounce
      expect(container.querySelector("input")).toHaveValue("test");
    });

    it("exposes getValue method", () => {
      const TestComponent = () => {
        const ref = useRef<DebouncedInputHandle>(null);
        const [displayValue, setDisplayValue] = useState("");

        const handleGetValue = () => {
          const value = ref.current?.getValue();
          setDisplayValue(value || "");
        };

        return (
          <div>
            <DebouncedInput ref={ref} />
            <button onClick={handleGetValue}>Get Value</button>
            <div data-testid="display-value">{displayValue}</div>
          </div>
        );
      };

      render(<TestComponent />);

      const input = screen.getByRole("textbox");
      const getValueButton = screen.getByRole("button", { name: "Get Value" });

      fireEvent.change(input, { target: { value: "current value" } });
      fireEvent.click(getValueButton);

      expect(screen.getByTestId("display-value")).toHaveTextContent(
        "current value",
      );
    });
  });

  describe("Integration with Input Props", () => {
    it("passes through all Input props", () => {
      render(
        <DebouncedInput
          label="Search"
          placeholder="Type to search..."
          variant="secondary"
          size="l"
          startIcon="search_icon"
          helperText="Search will be debounced"
          fullWidth
          id="search-debounced"
        />,
      );

      const input = screen.getByRole("textbox");
      expect(screen.getByLabelText("Search")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Type to search..."),
      ).toBeInTheDocument();
      expect(input.className).toContain("secondary");
      expect(input.className).toContain("l");
      expect(input.className).toContain("hasStartIcon");
      expect(input.className).toContain("fullWidth");
      expect(screen.getByText("Search will be debounced")).toBeInTheDocument();
    });

    it("handles loading state", () => {
      render(<DebouncedInput loading />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("loading");
      expect(input).toBeDisabled();
    });

    it("handles error state", () => {
      render(<DebouncedInput error errorMessage="Invalid input" />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("error");
      expect(screen.getByText("Invalid input")).toBeInTheDocument();
    });
  });

  describe("Value Management", () => {
    it("handles default value", () => {
      render(<DebouncedInput defaultValue="initial value" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("initial value");
    });

    it("updates internal value on change", () => {
      render(<DebouncedInput />);
      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "new value" } });
      expect(input).toHaveValue("new value");
    });
  });
});

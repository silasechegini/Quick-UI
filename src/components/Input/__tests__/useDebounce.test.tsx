import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../useDebounce";
import { useState } from "react";

// Test component to test the useDebounce hook
const TestComponent = ({
  callback,
  delay,
}: {
  callback: (...args: unknown[]) => void;
  delay: number;
}) => {
  const [value, setValue] = useState("");
  const { debounceFn, resetDebounce, clearDebounce } = useDebounce(
    callback,
    delay,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceFn(e);
  };

  return (
    <div>
      <input data-testid="test-input" value={value} onChange={handleChange} />
      <button onClick={resetDebounce} data-testid="reset-btn">
        Reset
      </button>
      <button onClick={clearDebounce} data-testid="clear-btn">
        Clear
      </button>
    </div>
  );
};

describe("useDebounce Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe("Basic Debouncing", () => {
    it("debounces function calls", () => {
      const callback = vi.fn();
      render(<TestComponent callback={callback} delay={300} />);

      const input = screen.getByTestId("test-input");

      fireEvent.change(input, { target: { value: "a" } });
      fireEvent.change(input, { target: { value: "ab" } });
      fireEvent.change(input, { target: { value: "abc" } });

      // Callback should not be called immediately
      expect(callback).not.toHaveBeenCalled();

      // Fast-forward time to trigger debounce
      vi.advanceTimersByTime(300);

      // Callback should be called once with the final event
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "abc" }),
        }),
      );
    });

    it("cancels previous timeout when called again", () => {
      const callback = vi.fn();
      render(<TestComponent callback={callback} delay={300} />);

      const input = screen.getByTestId("test-input");

      fireEvent.change(input, { target: { value: "first" } });
      vi.advanceTimersByTime(200); // Not enough to trigger

      fireEvent.change(input, { target: { value: "second" } });
      vi.advanceTimersByTime(300); // Should trigger with second value

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "second" }),
        }),
      );
    });

    it("handles different delay values", () => {
      const callback = vi.fn();
      render(<TestComponent callback={callback} delay={500} />);

      const input = screen.getByTestId("test-input");

      fireEvent.change(input, { target: { value: "test" } });

      // Should not trigger after 300ms
      vi.advanceTimersByTime(300);
      expect(callback).not.toHaveBeenCalled();

      // Should trigger after 500ms total
      vi.advanceTimersByTime(200);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "test" }),
        }),
      );
    });
  });

  describe("Reset Functionality", () => {
    it("resets debounce without calling callback", () => {
      const callback = vi.fn();
      render(<TestComponent callback={callback} delay={300} />);

      const input = screen.getByTestId("test-input");
      const resetBtn = screen.getByTestId("reset-btn");

      fireEvent.change(input, { target: { value: "test" } });
      fireEvent.click(resetBtn); // Reset before timeout

      vi.advanceTimersByTime(300);

      // Callback should not be called
      expect(callback).not.toHaveBeenCalled();
    });

    it("allows new debounce after reset", () => {
      const callback = vi.fn();
      render(<TestComponent callback={callback} delay={300} />);

      const input = screen.getByTestId("test-input");
      const resetBtn = screen.getByTestId("reset-btn");

      fireEvent.change(input, { target: { value: "first" } });
      fireEvent.click(resetBtn);

      fireEvent.change(input, { target: { value: "second" } });
      vi.advanceTimersByTime(300);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "second" }),
        }),
      );
    });
  });

  describe("Clear Functionality", () => {
    it("immediately calls callback with current args", () => {
      const callback = vi.fn();
      render(<TestComponent callback={callback} delay={300} />);

      const input = screen.getByTestId("test-input");
      const clearBtn = screen.getByTestId("clear-btn");

      fireEvent.change(input, { target: { value: "immediate" } });
      fireEvent.click(clearBtn);

      // Should be called immediately
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "immediate" }),
        }),
      );

      // Should not be called again after timeout
      vi.advanceTimersByTime(300);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("prevents subsequent timeout execution after clear", () => {
      const callback = vi.fn();
      render(<TestComponent callback={callback} delay={300} />);

      const input = screen.getByTestId("test-input");
      const clearBtn = screen.getByTestId("clear-btn");

      fireEvent.change(input, { target: { value: "test" } });
      fireEvent.click(clearBtn);

      // Fast-forward past original timeout
      vi.advanceTimersByTime(500);

      // Should only be called once (from clear, not from timeout)
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe("Change Event Support", () => {
    it("works with change events", () => {
      const changeCallback = vi.fn();

      const ChangeTestComponent = () => {
        const { debounceFn } = useDebounce(changeCallback, 300);

        const handleClick = () => {
          debounceFn({
            target: { value: "param1" },
          } as React.ChangeEvent<HTMLInputElement>);
        };

        return (
          <button onClick={handleClick} data-testid="change-btn">
            Click
          </button>
        );
      };

      render(<ChangeTestComponent />);

      const button = screen.getByTestId("change-btn");
      fireEvent.click(button);

      vi.advanceTimersByTime(300);

      expect(changeCallback).toHaveBeenCalledWith({
        target: { value: "param1" },
      });
    });

    it("works with empty change events", () => {
      const emptyCallback = vi.fn();

      const EmptyTestComponent = () => {
        const { debounceFn } = useDebounce(emptyCallback, 300);

        return (
          <button
            onClick={() =>
              debounceFn({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            data-testid="empty-btn"
          >
            Click
          </button>
        );
      };

      render(<EmptyTestComponent />);

      const button = screen.getByTestId("empty-btn");
      fireEvent.click(button);

      vi.advanceTimersByTime(300);

      expect(emptyCallback).toHaveBeenCalledWith({ target: { value: "" } });
    });
  });

  describe("Memory Management", () => {
    it("cleans up timeout on component unmount", () => {
      const callback = vi.fn();
      const { unmount } = render(
        <TestComponent callback={callback} delay={300} />,
      );

      const input = screen.getByTestId("test-input");
      fireEvent.change(input, { target: { value: "test" } });

      // Unmount before timeout
      unmount();

      vi.advanceTimersByTime(300);

      // Callback should not be called after unmount
      expect(callback).not.toHaveBeenCalled();
    });

    it("preserves latest arguments when multiple calls occur", () => {
      const callback = vi.fn();
      render(<TestComponent callback={callback} delay={300} />);

      const input = screen.getByTestId("test-input");
      const clearBtn = screen.getByTestId("clear-btn");

      fireEvent.change(input, { target: { value: "first" } });
      fireEvent.change(input, { target: { value: "second" } });
      fireEvent.change(input, { target: { value: "final" } });

      fireEvent.click(clearBtn);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "final" }),
        }),
      );
    });
  });
});

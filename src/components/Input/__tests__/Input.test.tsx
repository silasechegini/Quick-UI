import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Input from "../Input";

describe("Input Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders input with default props", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      // Check for CSS module class patterns instead of exact class names
      expect(input.className).toContain("input");
      expect(input.className).toContain("primary");
      expect(input.className).toContain("m");
    });

    it("renders with custom placeholder", () => {
      render(<Input placeholder="Enter text..." />);
      expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Input label="Email Address" id="email" />);
      expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
      expect(screen.getByText("Email Address")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      render(<Input helperText="This is helper text" />);
      expect(screen.getByText("This is helper text")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("applies primary variant by default", () => {
      render(<Input />);
      expect(screen.getByRole("textbox").className).toContain("primary");
    });

    it("applies secondary variant", () => {
      render(<Input variant="secondary" />);
      expect(screen.getByRole("textbox").className).toContain("secondary");
    });

    it("applies error variant", () => {
      render(<Input variant="error" />);
      expect(screen.getByRole("textbox").className).toContain("error");
    });

    it("applies success variant", () => {
      render(<Input variant="success" />);
      expect(screen.getByRole("textbox").className).toContain("success");
    });
  });

  describe("Sizes", () => {
    it("applies medium size by default", () => {
      render(<Input />);
      expect(screen.getByRole("textbox").className).toContain("m");
    });

    it("applies extra small size", () => {
      render(<Input size="xs" />);
      expect(screen.getByRole("textbox").className).toContain("xs");
    });

    it("applies small size", () => {
      render(<Input size="s" />);
      expect(screen.getByRole("textbox").className).toContain("s");
    });

    it("applies large size", () => {
      render(<Input size="l" />);
      expect(screen.getByRole("textbox").className).toContain("l");
    });

    it("applies extra large size", () => {
      render(<Input size="xl" />);
      expect(screen.getByRole("textbox").className).toContain("xl");
    });
  });

  describe("States", () => {
    it("shows error state with error message", () => {
      render(<Input error errorMessage="This field is required" />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("error");
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("overrides variant when error is true", () => {
      render(<Input variant="success" error errorMessage="Error occurred" />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("error");
      expect(input.className).not.toContain("success");
    });

    it("shows loading state", () => {
      render(<Input loading />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("loading");
      expect(input).toBeDisabled();
    });

    it("shows disabled state", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("applies full width", () => {
      render(<Input fullWidth />);
      expect(screen.getByRole("textbox").className).toContain("fullWidth");
    });
  });

  describe("Icons", () => {
    it("renders start icon", () => {
      render(<Input startIcon="search_icon" />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("hasStartIcon");
    });

    it("renders end icon", () => {
      render(<Input endIcon="clear_icon" />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("hasEndIcon");
    });

    it("renders loading icon when loading", () => {
      render(<Input loading />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("hasEndIcon");
      expect(input.className).toContain("loading");
    });

    it("prioritizes loading icon over end icon", () => {
      render(<Input loading endIcon="clear_icon" />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("hasEndIcon");
      expect(input.className).toContain("loading");
    });
  });

  describe("Event Handling", () => {
    it("calls onChange when input value changes", () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "test" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "test" }),
        }),
      );
    });

    it("calls onFocus when input receives focus", () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when input loses focus", () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      fireEvent.blur(input);

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("Custom Classes", () => {
    it("applies custom container class name", () => {
      const { container } = render(
        <Input containerClassName="custom-container" />,
      );
      expect(container.firstChild).toHaveClass("custom-container");
      expect((container.firstChild as HTMLElement).className).toContain(
        "inputContainer",
      );
    });

    it("applies custom input class name", () => {
      render(<Input className="custom-input" />);
      expect(screen.getByRole("textbox")).toHaveClass("custom-input");
    });
  });

  describe("Accessibility", () => {
    it("associates label with input using htmlFor", () => {
      render(<Input label="Email" id="email-input" />);
      const label = screen.getByText("Email");
      const input = screen.getByRole("textbox");

      expect(label).toHaveAttribute("for", "email-input");
      expect(input).toHaveAttribute("id", "email-input");
    });

    it("provides accessible error message", () => {
      render(
        <Input error errorMessage="This field is required" id="test-input" />,
      );
      const input = screen.getByRole("textbox");
      const errorMessage = screen.getByText("This field is required");

      expect(input.className).toContain("error");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("Clear Button", () => {
    it("shows clear button when clearable is true and input has value", () => {
      render(<Input clearable value="test" onChange={vi.fn()} />);
      const clearButton = screen.getByRole("button");
      expect(clearButton).toBeInTheDocument();
    });

    it("does not show clear button when clearable is false", () => {
      render(<Input clearable={false} value="test" onChange={vi.fn()} />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("does not show clear button when input has no value", () => {
      render(<Input clearable value="" onChange={vi.fn()} />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("calls onClear when clear button is clicked", () => {
      const handleClear = vi.fn();
      render(
        <Input
          clearable
          value="test"
          onChange={vi.fn()}
          onClear={handleClear}
        />,
      );

      const clearButton = screen.getByRole("button");
      fireEvent.click(clearButton);

      expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it("clears input value when clear button is clicked without onClear", () => {
      const handleChange = vi.fn();
      render(<Input clearable value="test" onChange={handleChange} />);

      const clearButton = screen.getByRole("button");
      fireEvent.click(clearButton);

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "" }),
        }),
      );
    });

    it("maintains focus on input after clearing", () => {
      const handleChange = vi.fn();
      render(<Input clearable value="test" onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      const clearButton = screen.getByRole("button");

      input.focus();
      fireEvent.click(clearButton);

      expect(document.activeElement).toBe(input);
    });

    it("applies correct CSS classes when clear button is present", () => {
      render(<Input clearable value="test" onChange={vi.fn()} />);
      const input = screen.getByRole("textbox");
      expect(input.className).toContain("hasClearButton");
    });
  });

  describe("Forward Ref", () => {
    it("forwards ref to input element", () => {
      const ref = vi.fn();
      render(<Input ref={ref} />);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });
  });
});

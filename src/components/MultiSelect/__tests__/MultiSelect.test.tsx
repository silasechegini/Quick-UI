import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import MultiSelect from "../MultiSelect";
import { MultiSelectOption } from "../MultiSelect.types";
import styles from "../styles.module.scss";
import { ChipProps } from "@components/Chip";

// Mock the Chip component
vi.mock("@components/Chip", () => ({
  Chip: ({ text, onRemove, disabled, interactive, ...props }: ChipProps) => (
    <div
      data-testid={`chip-${text}`}
      data-disabled={disabled}
      data-interactive={interactive}
      {...props}
    >
      {text}
      {onRemove && (
        <button
          data-testid={`chip-remove-${text}`}
          onClick={onRemove}
          disabled={disabled}
        >
          ×
        </button>
      )}
    </div>
  ),
}));

// Mock icon
vi.mock("@assets", () => ({
  iconSvgMapping: {
    clear_icon: ({ className }: { className: string }) => (
      <div data-testid="clear-icon" className={className}>
        Clear
      </div>
    ),
  },
}));

describe("MultiSelect Component", () => {
  const mockOptions: MultiSelectOption[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
    { label: "Elderberry", value: "elderberry" },
  ];

  const defaultProps = {
    options: mockOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render with default props", () => {
      render(<MultiSelect {...defaultProps} />);

      const combobox = screen.getByRole("combobox");
      const input = screen.getByRole("textbox");
      expect(combobox).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("placeholder", "Select options...");
    });

    it("should render with custom placeholder", () => {
      render(<MultiSelect {...defaultProps} placeholder="Choose fruits..." />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("placeholder", "Choose fruits...");
    });

    it("should render with custom className", () => {
      render(<MultiSelect {...defaultProps} className="custom-multiselect" />);

      const container = screen.getByRole("combobox");
      expect(container).toHaveClass("custom-multiselect");
    });

    it("should render disabled", () => {
      render(<MultiSelect {...defaultProps} disabled={true} />);

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("should auto focus when autoFocus is true", () => {
      render(<MultiSelect {...defaultProps} autoFocus={true} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveFocus();
    });

    it("should show basic multiselect with options when focused", async () => {
      render(<MultiSelect {...defaultProps} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
        expect(screen.getByLabelText(/Apple/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Banana/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Cherry/)).toBeInTheDocument();
      });
    });

    it("should not show dropdown initially", () => {
      render(<MultiSelect {...defaultProps} />);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("should show loading state", async () => {
      render(<MultiSelect {...defaultProps} isLoading={true} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
    });
  });

  describe("Option Selection", () => {
    it("should select an option when clicked", async () => {
      const mockOnChange = vi.fn();
      render(<MultiSelect {...defaultProps} onChange={mockOnChange} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        fireEvent.click(options[0]); // Click the Apple option
      });

      expect(mockOnChange).toHaveBeenCalledWith(["apple"]);
    });

    it("should show selected options as chips", async () => {
      render(<MultiSelect {...defaultProps} value={["apple"]} />);

      expect(screen.getByTestId("chip-Apple")).toBeInTheDocument();
    });

    it("should remove selection when chip remove button is clicked", async () => {
      const mockOnChange = vi.fn();
      render(
        <MultiSelect
          {...defaultProps}
          value={["apple"]}
          onChange={mockOnChange}
        />,
      );

      const removeButton = screen.getByTestId("chip-remove-Apple");
      fireEvent.click(removeButton);

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });
  });

  describe("Search Functionality", () => {
    it("should filter options based on search input", async () => {
      render(<MultiSelect {...defaultProps} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.change(input, { target: { value: "app" } });

      await waitFor(() => {
        expect(screen.getByLabelText(/Apple/)).toBeInTheDocument();
        expect(screen.queryByLabelText(/Banana/)).not.toBeInTheDocument();
      });
    });

    it("should show all options when search is cleared", async () => {
      render(<MultiSelect {...defaultProps} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "app" } });

      await waitFor(() => {
        expect(screen.queryByLabelText(/Banana/)).not.toBeInTheDocument();
      });

      fireEvent.change(input, { target: { value: "" } });

      await waitFor(() => {
        expect(screen.getByLabelText(/Apple/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Banana/)).toBeInTheDocument();
      });
    });

    it("should not search when searchable is false", async () => {
      render(<MultiSelect {...defaultProps} searchable={false} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "app" } });

      await waitFor(() => {
        expect(screen.getByLabelText(/Apple/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Banana/)).toBeInTheDocument();
      });
    });
  });

  describe("Multiple Selection", () => {
    it("should allow multiple selections", async () => {
      const mockOnChange = vi.fn();
      render(<MultiSelect {...defaultProps} onChange={mockOnChange} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        fireEvent.click(options[0]); // Apple
        fireEvent.click(options[1]); // Banana
      });

      expect(mockOnChange).toHaveBeenLastCalledWith(["apple", "banana"]);
    });

    it("should deselect option when clicked again", async () => {
      const mockOnChange = vi.fn();
      render(
        <MultiSelect
          {...defaultProps}
          value={["apple"]}
          onChange={mockOnChange}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        fireEvent.click(options[0]); // Click Apple to deselect
      });

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });

    it("should respect maxSelected limit", async () => {
      const mockOnChange = vi.fn();
      render(
        <MultiSelect
          {...defaultProps}
          maxSelected={2}
          onChange={mockOnChange}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        fireEvent.click(options[0]); // Apple
        fireEvent.click(options[1]); // Banana
        fireEvent.click(options[2]); // Cherry - should not be added
      });

      expect(mockOnChange).toHaveBeenLastCalledWith(["apple", "banana"]);
    });
  });

  describe("Clear Functionality", () => {
    it("should show clear button when options are selected", () => {
      render(<MultiSelect {...defaultProps} value={["apple"]} />);

      expect(screen.getByLabelText("Clear input")).toBeInTheDocument();
    });
    it("should not show clear button when no options are selected", () => {
      render(<MultiSelect {...defaultProps} />);

      expect(screen.queryByTestId("clear-icon")).not.toBeInTheDocument();
    });

    it("should clear all selections when clear button is clicked", () => {
      const mockOnChange = vi.fn();
      render(
        <MultiSelect
          {...defaultProps}
          value={["apple", "banana"]}
          onChange={mockOnChange}
        />,
      );

      const clearButton = screen.getByLabelText("Clear input");
      fireEvent.click(clearButton);

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });
    it("should not show clear button when clearable is false", () => {
      render(
        <MultiSelect {...defaultProps} value={["apple"]} clearable={false} />,
      );

      expect(screen.queryByTestId("clear-icon")).not.toBeInTheDocument();
    });
  });

  describe("Controlled Component", () => {
    it("should update when controlled value changes", () => {
      const { rerender } = render(<MultiSelect {...defaultProps} value={[]} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("placeholder", "Select options...");

      rerender(<MultiSelect {...defaultProps} value={["apple"]} />);
      expect(input).toHaveAttribute("placeholder", "Apple");
    });

    it("should call onChange when selection changes", async () => {
      const mockOnChange = vi.fn();
      render(
        <MultiSelect {...defaultProps} value={[]} onChange={mockOnChange} />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        fireEvent.click(options[0]); // Click Apple
      });

      expect(mockOnChange).toHaveBeenCalledWith(["apple"]);
    });
  });

  describe("Uncontrolled Component", () => {
    it("should maintain internal state when uncontrolled", async () => {
      const mockOnChange = vi.fn();
      render(
        <MultiSelect
          {...defaultProps}
          defaultValue={["apple"]}
          onChange={mockOnChange}
        />,
      );

      expect(screen.getByTestId("chip-Apple")).toBeInTheDocument();

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        fireEvent.click(options[1]); // Click Banana
      });

      expect(screen.getByTestId("chip-Apple")).toBeInTheDocument();
      expect(mockOnChange).toHaveBeenCalledWith(["apple", "banana"]);
    });

    it("should use defaultValue for initial selections", () => {
      render(
        <MultiSelect {...defaultProps} defaultValue={["apple", "banana"]} />,
      );

      expect(screen.getByTestId("chip-Apple")).toBeInTheDocument();
      expect(screen.getByTestId("chip-Banana")).toBeInTheDocument();
    });
  });

  describe("Placeholder Behavior", () => {
    it("should show default placeholder when no selections", () => {
      render(<MultiSelect {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("placeholder", "Select options...");
    });

    it("should show single selection label", () => {
      render(<MultiSelect {...defaultProps} value={["apple"]} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("placeholder", "Apple");
    });

    it("should show count for multiple selections", () => {
      render(
        <MultiSelect {...defaultProps} value={["apple", "banana", "cherry"]} />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("placeholder", "3 options selected");
    });
  });

  describe("Custom Rendering", () => {
    it("should use custom renderOption when provided", async () => {
      const customRender = (option: MultiSelectOption) => (
        <div data-testid={`custom-${option.value}`}>Custom: {option.label}</div>
      );

      render(<MultiSelect {...defaultProps} renderOption={customRender} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByTestId("custom-apple")).toBeInTheDocument();
        expect(screen.getByText("Custom: Apple")).toBeInTheDocument();
      });
    });

    it("should show selection state in custom renderer", async () => {
      const customRender = (option: MultiSelectOption, isSelected: boolean) => (
        <div>
          {option.label}
          {isSelected ? " ✓" : ""}
        </div>
      );

      render(
        <MultiSelect
          {...defaultProps}
          value={["apple"]}
          renderOption={customRender}
        />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByText("Apple ✓")).toBeInTheDocument();
        expect(screen.getByText("Banana")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<MultiSelect {...defaultProps} />);

      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-expanded", "false");
      expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
      expect(combobox).toHaveAttribute("aria-controls");
    });

    it("should update aria-expanded when dropdown opens", async () => {
      render(<MultiSelect {...defaultProps} />);

      const combobox = screen.getByRole("combobox");
      const input = screen.getByRole("textbox");

      fireEvent.focus(input);

      await waitFor(() => {
        expect(combobox).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should have proper listbox attributes", async () => {
      render(<MultiSelect {...defaultProps} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const listbox = screen.getByRole("listbox");
        expect(listbox).toHaveAttribute("aria-multiselectable", "true");
      });
    });

    it("should have proper option attributes", async () => {
      render(<MultiSelect {...defaultProps} value={["apple"]} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        expect(options[0]).toHaveAttribute("aria-selected", "true"); // Apple is selected
        expect(options[1]).toHaveAttribute("aria-selected", "false"); // Banana is not selected
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty options array", async () => {
      render(<MultiSelect options={[]} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByText("No options available")).toBeInTheDocument();
      });
    });

    it("should handle invalid selected values", () => {
      render(<MultiSelect {...defaultProps} value={["nonexistent"]} />);

      expect(screen.queryByTestId("chip-nonexistent")).not.toBeInTheDocument();
    });

    it("should handle name prop for forms", () => {
      render(<MultiSelect {...defaultProps} name="fruits" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("name", "fruits");
    });
  });

  describe("Mouse Interactions", () => {
    it("should highlight option on mouse enter", async () => {
      render(<MultiSelect {...defaultProps} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        fireEvent.mouseEnter(options[1]); // Banana

        expect(options[1]).toHaveClass(styles.highlighted);
      });
    });

    it("should handle click events on options", async () => {
      const mockOnChange = vi.fn();
      render(<MultiSelect {...defaultProps} onChange={mockOnChange} />);

      const input = screen.getByRole("textbox");
      fireEvent.focus(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        fireEvent.click(options[2]); // Click Cherry
      });

      expect(mockOnChange).toHaveBeenCalledWith(["cherry"]);
    });
  });
});

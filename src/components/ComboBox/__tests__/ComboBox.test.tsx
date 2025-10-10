import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ComboBox from "../ComboBox";
import { ComboBoxOption } from "../ComboBox.types";
import styles from "../styles.module.scss";

describe("ComboBox Component", () => {
  const mockOptions: ComboBoxOption[] = [
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
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("placeholder", "Select an option");
    });
    it("should render with custom placeholder", () => {
      render(<ComboBox {...defaultProps} placeholder="Choose fruit..." />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("placeholder", "Choose fruit...");
    });

    it("should render with custom className", () => {
      render(<ComboBox {...defaultProps} className="custom-combobox" />);

      const container = screen.getByRole("combobox").parentElement;
      expect(container).toHaveClass("custom-combobox");
    });

    it("should render disabled", () => {
      render(<ComboBox {...defaultProps} disabled={true} />);

      const input = screen.getByRole("combobox");
      expect(input).toBeDisabled();

      const container = input.parentElement;
      expect(container).toHaveClass(styles.disabled);
    });

    it("should auto focus when autoFocus is true", () => {
      render(<ComboBox {...defaultProps} autoFocus={true} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveFocus();
    });
  });

  describe("Dropdown Behavior", () => {
    it("should show dropdown when input is focused", async () => {
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      mockOptions.forEach((option) => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it("should hide dropdown when input is blurred", async () => {
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.blur(input);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should filter options based on input value", async () => {
      const user = userEvent.setup();
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.click(input);
      await user.type(input, "a");

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
        expect(screen.getByText("Banana")).toBeInTheDocument();
        expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
      });
    });

    it("should show no results message when no options match", async () => {
      const user = userEvent.setup();
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.click(input);
      await user.type(input, "xyz");

      await waitFor(() => {
        expect(screen.getByText("No results found")).toBeInTheDocument();
      });
    });

    it("should show loading message when isLoading is true", async () => {
      render(<ComboBox {...defaultProps} isLoading={true} />);

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
    });
  });

  describe("Selection Behavior", () => {
    it("should select option when clicked", async () => {
      const handleChange = vi.fn();
      render(<ComboBox {...defaultProps} onChange={handleChange} />);

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.mouseDown(screen.getByText("Apple"));

      expect(handleChange).toHaveBeenCalledWith("apple", mockOptions[0]);
      expect(input).toHaveValue("Apple");
    });

    it("should clear input when empty value is selected", async () => {
      const handleChange = vi.fn();
      render(
        <ComboBox
          {...defaultProps}
          onChange={handleChange}
          defaultValue="apple"
        />,
      );

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("Apple");

      // Simulate clearing the selection
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "" } });

      expect(input).toHaveValue("");
    });
  });

  describe("Controlled Component", () => {
    it("should work as controlled component", () => {
      const { rerender } = render(<ComboBox {...defaultProps} value="apple" />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("Apple");

      rerender(<ComboBox {...defaultProps} value="banana" />);
      expect(input).toHaveValue("Banana");

      rerender(<ComboBox {...defaultProps} value={""} />);
      expect(input).toHaveValue("");
    });

    it("should update value when controlled value changes", () => {
      const { rerender } = render(<ComboBox {...defaultProps} value={null} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("");

      rerender(<ComboBox {...defaultProps} value="cherry" />);
      expect(input).toHaveValue("Cherry");
    });
  });

  describe("Uncontrolled Component", () => {
    it("should work as uncontrolled component with defaultValue", () => {
      render(<ComboBox {...defaultProps} defaultValue="banana" />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("Banana");
    });

    it("should update internal state when typing", async () => {
      const user = userEvent.setup();
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.click(input);
      await user.type(input, "ap");

      expect(input).toHaveValue("ap");
    });
  });

  describe("Search Functionality", () => {
    it("should call onSearch when provided", async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup();

      render(
        <ComboBox
          {...defaultProps}
          onSearch={handleSearch}
          debounceDelay={100}
        />,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);
      await user.type(input, "test");

      await waitFor(
        () => {
          expect(handleSearch).toHaveBeenCalledWith("test");
        },
        { timeout: 200 },
      );
    });

    it("should debounce search calls", async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup();

      render(
        <ComboBox
          {...defaultProps}
          onSearch={handleSearch}
          debounceDelay={100}
        />,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);
      await user.type(input, "abc");

      // Should not call immediately
      expect(handleSearch).not.toHaveBeenCalled();

      // Should call after debounce delay
      await waitFor(
        () => {
          expect(handleSearch).toHaveBeenCalledWith("abc");
        },
        { timeout: 200 },
      );
    });

    it("should not filter locally when onSearch is provided", async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup();

      render(<ComboBox {...defaultProps} onSearch={handleSearch} />);

      const input = screen.getByRole("combobox");
      await user.click(input);
      await user.type(input, "a");

      // Should show all options since filtering is handled externally
      await waitFor(() => {
        mockOptions.forEach((option) => {
          expect(screen.getByText(option.label)).toBeInTheDocument();
        });
      });
    });
  });

  describe("Custom Rendering", () => {
    it("should use custom renderOption when provided", async () => {
      const renderOption = (option: ComboBoxOption, isActive: boolean) => (
        <div data-testid={`custom-${option.value}`}>
          Custom: {option.label} {isActive ? "(active)" : ""}
        </div>
      );

      render(<ComboBox {...defaultProps} renderOption={renderOption} />);

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByTestId("custom-apple")).toBeInTheDocument();
        expect(screen.getByText("Custom: Apple")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-autocomplete", "list");
      expect(input).toHaveAttribute("aria-expanded", "false");
      expect(input).toHaveAttribute("aria-controls", "combo-box-list");
    });

    it("should update aria-expanded when dropdown opens", async () => {
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-expanded", "false");

      fireEvent.focus(input);

      await waitFor(() => {
        expect(input).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should have proper option roles and attributes", async () => {
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      await waitFor(() => {
        const listbox = screen.getByRole("listbox");
        expect(listbox).toHaveAttribute("id", "combo-box-list");

        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(mockOptions.length);

        options.forEach((option, index) => {
          expect(option).toHaveAttribute("id", `combo-box-option-${index}`);
          expect(option).toHaveAttribute("aria-selected", "false");
        });
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty options array", () => {
      render(<ComboBox options={[]} />);

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    it("should handle options with numeric values", () => {
      const numericOptions = [
        { label: "One", value: 1 },
        { label: "Two", value: 2 },
      ];

      const handleChange = vi.fn();
      render(<ComboBox options={numericOptions} onChange={handleChange} />);

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      fireEvent.mouseDown(screen.getByText("One"));

      expect(handleChange).toHaveBeenCalledWith("1", numericOptions[0]);
    });

    it("should handle invalid defaultValue gracefully", () => {
      render(<ComboBox {...defaultProps} defaultValue="invalid-value" />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("");
    });

    it("should handle null/undefined values gracefully", () => {
      const { rerender } = render(
        <ComboBox {...defaultProps} value={undefined} />,
      );

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("");

      rerender(<ComboBox {...defaultProps} value={null} />);
      expect(input).toHaveValue("");
    });

    it("should maintain focus when clicking inside dropdown", async () => {
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      fireEvent.focus(input);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Click on dropdown container (not an option)
      const listbox = screen.getByRole("listbox");
      fireEvent.click(listbox);

      // Dropdown should remain open
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });

  describe("Event Handling", () => {
    it("should handle input change events", async () => {
      const user = userEvent.setup();
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.click(input);
      await user.type(input, "test");

      expect(input).toHaveValue("test");
    });

    it("should handle focus and blur events", async () => {
      render(<ComboBox {...defaultProps} />);

      const input = screen.getByRole("combobox");

      fireEvent.focus(input);
      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      fireEvent.blur(input);
      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });
  });
});

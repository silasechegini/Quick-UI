import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useMultiSelect } from "../useMultiSelect";
import { MultiSelectOption } from "../../MultiSelect.types";

const mockUseDeferredValue = vi.fn();
vi.mock("react", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react");
  return {
    ...actual,
    useDeferredValue: <T>(value: T): T => mockUseDeferredValue(value),
  };
});

describe("useMultiSelect Hook", () => {
  const mockOptions: MultiSelectOption[] = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ];

  const defaultProps = {
    options: mockOptions,
    defaultValue: [],
    isControlled: false,
    value: undefined,
    onChange: undefined,
    maxSelected: undefined,
    inputRef: { current: null } as React.RefObject<HTMLInputElement | null>,
    searchable: true,
    placeholder: "Select options...",
  };

  beforeEach(() => {
    // Reset the mock to return the input value immediately (no deferring in tests)
    mockUseDeferredValue.mockImplementation((value) => value);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize with empty selection in uncontrolled mode", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      expect(result.current.selected).toEqual([]);
      expect(result.current.filteredOptions).toEqual(mockOptions);
      expect(result.current.isOpen).toBe(false);
      expect(result.current.highlightedIndex).toBe(0);
      expect(result.current.inputValue).toBe("");
      expect(result.current.selectedOptions).toEqual([]);
      expect(result.current.renderInputText).toBe("Select options...");
    });

    it("should initialize with defaultValue in uncontrolled mode", () => {
      const propsWithDefault = {
        ...defaultProps,
        defaultValue: ["1", "2"],
      };

      const { result } = renderHook(() => useMultiSelect(propsWithDefault));

      expect(result.current.selected).toEqual(["1", "2"]);
      expect(result.current.selectedOptions).toEqual([
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ]);
      expect(result.current.renderInputText).toBe("2 options selected");
    });

    it("should initialize with controlled value", () => {
      const propsControlled = {
        ...defaultProps,
        isControlled: true,
        value: ["apple", "banana"],
      };

      const { result } = renderHook(() => useMultiSelect(propsControlled));

      expect(result.current.selected).toEqual(["apple", "banana"]);
      expect(result.current.selectedOptions).toEqual([
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
      ]);
      expect(result.current.renderInputText).toBe("2 options selected");
    });
  });

  describe("Controlled vs Uncontrolled Behavior", () => {
    it("should update selected when controlled value changes", () => {
      const propsControlled = {
        ...defaultProps,
        isControlled: true,
        value: [mockOptions[0].value],
      };

      const { result, rerender } = renderHook(
        (props) => useMultiSelect(props),
        {
          initialProps: propsControlled,
        },
      );

      expect(result.current.selected).toEqual(["1"]);

      // Update the controlled value
      rerender({
        ...propsControlled,
        value: ["1", "2"],
      });

      expect(result.current.selected).toEqual(["1", "2"]);
    });

    it("should not update internal state when controlled", () => {
      const mockOnChange = vi.fn();
      const propsControlled = {
        ...defaultProps,
        isControlled: true,
        value: ["1"],
        onChange: mockOnChange,
      };

      const { result } = renderHook(() => useMultiSelect(propsControlled));

      act(() => {
        result.current.handleSelect(mockOptions[1], 1);
      });

      // Should call onChange but not update internal state
      expect(mockOnChange).toHaveBeenCalledWith(["1", "2"]);
      expect(result.current.selected).toEqual(["1"]); // Should remain unchanged
    });
  });

  describe("Option Selection", () => {
    it("should add option when not selected", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      act(() => {
        result.current.handleSelect(mockOptions[0], 0);
      });

      expect(result.current.selected).toEqual(["1"]);
      expect(result.current.selectedOptions).toEqual([mockOptions[0]]);
      expect(result.current.renderInputText).toBe("Option 1");
      expect(result.current.highlightedIndex).toBe(0);
    });

    it("should remove option when already selected", () => {
      const propsWithSelection = {
        ...defaultProps,
        defaultValue: ["1", "2"],
      };

      const { result } = renderHook(() => useMultiSelect(propsWithSelection));

      act(() => {
        result.current.handleSelect(mockOptions[0], 0);
      });

      expect(result.current.selected).toEqual(["2"]);
      expect(result.current.selectedOptions).toEqual([mockOptions[1]]);
      expect(result.current.renderInputText).toBe("Option 2");
    });

    it("should call onChange when selection changes", () => {
      const mockOnChange = vi.fn();
      const propsWithOnChange = {
        ...defaultProps,
        onChange: mockOnChange,
      };

      const { result } = renderHook(() => useMultiSelect(propsWithOnChange));

      act(() => {
        result.current.handleSelect(mockOptions[0], 0);
      });

      expect(mockOnChange).toHaveBeenCalledWith(["1"]);
    });

    it("should respect maxSelected limit", () => {
      const propsWithMax = {
        ...defaultProps,
        maxSelected: 2,
        defaultValue: ["1", "2"],
      };

      const { result } = renderHook(() => useMultiSelect(propsWithMax));

      // Try to add a third option
      act(() => {
        result.current.handleSelect(mockOptions[2], 2);
      });

      // Should not add the third option
      expect(result.current.selected).toEqual(["1", "2"]);
    });

    it("should focus input and clear search when searchable after selection", () => {
      const mockInputRef: React.RefObject<HTMLInputElement> = {
        current: {
          focus: vi.fn(),
        } as unknown as HTMLInputElement,
      };

      const propsSearchable = {
        ...defaultProps,
        inputRef: mockInputRef,
        searchable: true,
      };

      const { result } = renderHook(() => useMultiSelect(propsSearchable));

      // Set input value first
      act(() => {
        result.current.setInputValue("test");
      });

      act(() => {
        result.current.handleSelect(mockOptions[0], 0);
      });

      expect(result.current.inputValue).toBe("");
      expect(mockInputRef.current.focus).toHaveBeenCalled();
    });

    it("should close dropdown when not searchable after selection", () => {
      const propsNotSearchable = {
        ...defaultProps,
        searchable: false,
      };

      const { result } = renderHook(() => useMultiSelect(propsNotSearchable));

      // Open dropdown first
      act(() => {
        result.current.setIsOpen(true);
      });

      act(() => {
        result.current.handleSelect(mockOptions[0], 0);
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe("Option Removal", () => {
    it("should remove specific option", () => {
      const propsWithSelection = {
        ...defaultProps,
        defaultValue: ["1", "2", "3"],
      };

      const { result } = renderHook(() => useMultiSelect(propsWithSelection));

      act(() => {
        result.current.handleRemove("2");
      });

      expect(result.current.selected).toEqual(["1", "3"]);
      expect(result.current.selectedOptions).toEqual([
        mockOptions[0],
        mockOptions[2],
      ]);
    });

    it("should call onChange when removing option", () => {
      const mockOnChange = vi.fn();
      const propsWithOnChange = {
        ...defaultProps,
        defaultValue: ["1", "2"],
        onChange: mockOnChange,
      };

      const { result } = renderHook(() => useMultiSelect(propsWithOnChange));

      act(() => {
        result.current.handleRemove("1");
      });

      expect(mockOnChange).toHaveBeenCalledWith(["2"]);
    });
  });

  describe("Clear All Functionality", () => {
    it("should clear all selections", () => {
      const propsWithSelection = {
        ...defaultProps,
        defaultValue: ["1", "2", "3"],
      };

      const { result } = renderHook(() => useMultiSelect(propsWithSelection));

      act(() => {
        result.current.handleClearAll();
      });

      expect(result.current.selected).toEqual([]);
      expect(result.current.selectedOptions).toEqual([]);
      expect(result.current.isOpen).toBe(false);
      expect(result.current.renderInputText).toBe("Select options...");
    });

    it("should focus input and clear search when searchable after clear all", () => {
      const mockInputRef: React.RefObject<HTMLInputElement> = {
        current: {
          focus: vi.fn(),
        } as unknown as HTMLInputElement,
      };

      const propsSearchable = {
        ...defaultProps,
        inputRef: mockInputRef,
        searchable: true,
        defaultValue: ["1", "2"],
      };

      const { result } = renderHook(() => useMultiSelect(propsSearchable));

      // Set input value
      act(() => {
        result.current.setInputValue("search");
      });

      act(() => {
        result.current.handleClearAll();
      });

      expect(result.current.inputValue).toBe("");
      expect(mockInputRef.current.focus).toHaveBeenCalled();
    });

    it("should call onChange when clearing all", () => {
      const mockOnChange = vi.fn();
      const propsWithOnChange = {
        ...defaultProps,
        defaultValue: ["1", "2"],
        onChange: mockOnChange,
      };

      const { result } = renderHook(() => useMultiSelect(propsWithOnChange));

      act(() => {
        result.current.handleClearAll();
      });

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });
  });

  describe("Search Functionality", () => {
    it("should filter options based on search input when searchable", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      act(() => {
        result.current.setInputValue("apple");
      });

      expect(result.current.filteredOptions).toEqual([
        { label: "Apple", value: "apple" },
      ]);
    });

    it("should filter options case-insensitively", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      act(() => {
        result.current.setInputValue("OPTION");
      });

      expect(result.current.filteredOptions).toEqual([
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
      ]);
    });

    it("should not filter options when not searchable", () => {
      const propsNotSearchable = {
        ...defaultProps,
        searchable: false,
      };

      const { result } = renderHook(() => useMultiSelect(propsNotSearchable));

      act(() => {
        result.current.setInputValue("apple");
      });

      expect(result.current.filteredOptions).toEqual(mockOptions);
    });

    it("should show all options when search is empty", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      // First set a search value
      act(() => {
        result.current.setInputValue("apple");
      });

      expect(result.current.filteredOptions).toEqual([
        { label: "Apple", value: "apple" },
      ]);

      // Then clear it
      act(() => {
        result.current.setInputValue("");
      });

      expect(result.current.filteredOptions).toEqual(mockOptions);
    });

    it("should trim whitespace from search input", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      act(() => {
        result.current.setInputValue("  apple  ");
      });

      expect(result.current.filteredOptions).toEqual([
        { label: "Apple", value: "apple" },
      ]);
    });
  });

  describe("Options Update", () => {
    it("should update filtered options when options prop changes", () => {
      const { result, rerender } = renderHook(
        (props) => useMultiSelect(props),
        {
          initialProps: defaultProps,
        },
      );

      const newOptions = [{ label: "New Option", value: "new" }];

      rerender({
        ...defaultProps,
        options: newOptions,
      });

      expect(result.current.filteredOptions).toEqual(newOptions);
    });
  });

  describe("Render Input Text", () => {
    it("should show placeholder when no options selected", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      expect(result.current.renderInputText).toBe("Select options...");
    });

    it("should show single option label when one option selected", () => {
      const propsWithSelection = {
        ...defaultProps,
        defaultValue: ["1"],
      };

      const { result } = renderHook(() => useMultiSelect(propsWithSelection));

      expect(result.current.renderInputText).toBe("Option 1");
    });

    it("should show count when multiple options selected", () => {
      const propsWithSelection = {
        ...defaultProps,
        defaultValue: ["1", "2", "3"],
      };

      const { result } = renderHook(() => useMultiSelect(propsWithSelection));

      expect(result.current.renderInputText).toBe("3 options selected");
    });
  });

  describe("State Management", () => {
    it("should update highlighted index", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      act(() => {
        result.current.setHighlightedIndex(2);
      });

      expect(result.current.highlightedIndex).toBe(2);
    });

    it("should update open state", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      act(() => {
        result.current.setIsOpen(true);
      });

      expect(result.current.isOpen).toBe(true);
    });

    it("should update input value", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      act(() => {
        result.current.setInputValue("test input");
      });

      expect(result.current.inputValue).toBe("test input");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty options array", () => {
      const propsEmpty = {
        ...defaultProps,
        options: [],
      };

      const { result } = renderHook(() => useMultiSelect(propsEmpty));

      expect(result.current.filteredOptions).toEqual([]);
      expect(result.current.selectedOptions).toEqual([]);
    });

    it("should handle undefined onChange gracefully", () => {
      const propsNoOnChange = {
        ...defaultProps,
        onChange: undefined,
      };

      const { result } = renderHook(() => useMultiSelect(propsNoOnChange));

      // Should not throw when selecting
      expect(() => {
        act(() => {
          result.current.handleSelect(mockOptions[0], 0);
        });
      }).not.toThrow();
    });

    it("should handle selecting non-existent option", () => {
      const { result } = renderHook(() => useMultiSelect(defaultProps));

      const nonExistentOption = {
        label: "Non-existent",
        value: "non-existent",
      };

      act(() => {
        result.current.handleSelect(nonExistentOption, 0);
      });

      expect(result.current.selected).toEqual(["non-existent"]);
      // selectedOptions should be empty since the option doesn't exist in the options array
      expect(result.current.selectedOptions).toEqual([]);
    });

    it("should handle removing non-existent value", () => {
      const propsWithSelection = {
        ...defaultProps,
        defaultValue: ["1", "2"],
      };

      const { result } = renderHook(() => useMultiSelect(propsWithSelection));

      act(() => {
        result.current.handleRemove("non-existent");
      });

      // Should remain unchanged
      expect(result.current.selected).toEqual(["1", "2"]);
    });
  });
});

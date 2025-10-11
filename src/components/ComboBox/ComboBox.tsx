import React, { useState, useEffect, useRef } from "react";
import { ComboBoxProps, ComboBoxOption } from "./ComboBox.types";
import styles from "./styles.module.scss";
import { PLACE_HOLDER } from "./ComboBox.utils";
import { useDebounce } from "../../utils";

const ComboBox: React.FC<ComboBoxProps> = ({
  options = [],
  onChange,
  value,
  defaultValue,
  onSearch,
  debounceDelay = 300,
  placeholder = PLACE_HOLDER,
  isLoading = false,
  disabled = false,
  renderOption,
  className = "",
  autoFocus,
}) => {
  const isControlled = value !== undefined && value !== null;

  const comboRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getLabelByValue = (val: string | number | null | undefined): string =>
    options.find((opt) => opt.value === val)?.label ?? "";

  const [inputValue, setInputValue] = useState<string>(() => {
    return isControlled
      ? getLabelByValue(value)
      : getLabelByValue(defaultValue);
  });

  const [filteredOptions, setFilteredOptions] =
    useState<ComboBoxOption[]>(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const { debounceFn: debouncedSearch } = useDebounce((...args: unknown[]) => {
    const searchValue = args[0] as string;
    if (onSearch) {
      onSearch(searchValue);
    }
  }, debounceDelay);

  const handleFilteredOptions = (input: string) => {
    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredOptions(filtered);
  };

  // Sync input value with controlled value
  useEffect(() => {
    if (isControlled) {
      setInputValue(getLabelByValue(value));
    }
  }, [value, options]);

  useEffect(() => {
    if (onSearch) {
      setFilteredOptions(options);
    } else {
      const currentInput = inputValue || "";
      handleFilteredOptions(currentInput);
    }
  }, [options, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    // Always update inputValue for immediate UI feedback, even in controlled mode
    setInputValue(newVal);

    if (onSearch) {
      debouncedSearch(newVal);
    } else {
      handleFilteredOptions(newVal);
    }

    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: ComboBoxOption, index: number) => {
    const selectedLabel = option.label;

    // Always update the input display value for immediate feedback
    setInputValue(selectedLabel);

    setIsOpen(false);
    setFilteredOptions(options);
    setHighlightedIndex(index);

    onChange?.(
      typeof option.value === "number" ? option.value.toString() : option.value,
      option,
    );
  };

  const handleBlur = (e: React.FocusEvent) => {
    const nextFocusedElement = e.relatedTarget as HTMLElement | null;
    if (!comboRef.current?.contains(nextFocusedElement)) {
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    setFilteredOptions(options);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleSelect(filteredOptions[highlightedIndex], highlightedIndex);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div
      ref={comboRef}
      className={`${styles.comboBox} ${disabled ? styles.disabled : ""} ${className}`}
      onBlurCapture={handleBlur}
      onFocusCapture={handleFocus}
    >
      <input
        ref={inputRef}
        type="text"
        className={styles.comboBox__input}
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-autocomplete="list"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="combo-box-list"
        aria-activedescendant={
          isOpen &&
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
            ? `combo-box-option-${highlightedIndex}`
            : undefined
        }
      />

      {isOpen && (
        <ul
          className={styles.comboBox__list}
          role="listbox"
          id="combo-box-list"
        >
          {isLoading && (
            <li className={styles.comboBox__loading}>Loading...</li>
          )}

          {!isLoading && filteredOptions.length === 0 && (
            <li className={styles.comboBox__empty}>No results found</li>
          )}

          {!isLoading &&
            filteredOptions.map((opt, index) => (
              <li
                key={opt.value}
                id={`combo-box-option-${index}`}
                className={`${styles.comboBox__option} ${
                  index === highlightedIndex ? styles.active : ""
                }`}
                onMouseDown={() => handleSelect(opt, index)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={index === highlightedIndex}
              >
                {renderOption
                  ? renderOption(opt, index === highlightedIndex)
                  : opt.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;

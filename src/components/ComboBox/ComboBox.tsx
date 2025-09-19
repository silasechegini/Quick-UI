import React, { useState, useEffect, useRef } from "react";
import { ComboBoxProps, ComboBoxOption } from "./ComboBox.types";
import styles from "./styles.module.scss";
import { PLACE_HOLDER } from "./ComboBox.utils";

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
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input value with controlled value
  useEffect(() => {
    if (isControlled) {
      setInputValue(getLabelByValue(value));
    }
  }, [value, options]);

  // Filter options or run search on input change
  useEffect(() => {
    if (onSearch) {
      const timeout = setTimeout(() => {
        onSearch(inputValue);
      }, debounceDelay);
      return () => clearTimeout(timeout);
    } else {
      const filtered = options.filter((opt) =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }
  }, [inputValue, options, onSearch, debounceDelay]);

  // Recalculate filteredOptions when options change (fallback search)
  useEffect(() => {
    if (!onSearch) {
      handleFilteredOptions(inputValue);
    }
  }, [options, inputValue, onSearch]);

  const handleFilteredOptions = (input: string) => {
    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredOptions(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (!isControlled) {
      setInputValue(newVal);
    }

    if (onSearch) {
      onSearch(newVal);
    } else {
      handleFilteredOptions(newVal);
    }

    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: ComboBoxOption, index: number) => {
    const selectedLabel = option.label;

    if (!isControlled) {
      setInputValue(selectedLabel);
    }

    setIsOpen(false);
    onChange?.(
      typeof option.value === "number" ? option.value.toString() : option.value,
      option,
    );

    setHighlightedIndex(index);
  };

  return (
    <div
      className={`${styles.comboBox} ${disabled ? styles.disabled : ""} ${className}`}
    >
      <input
        ref={inputRef}
        type="text"
        className={styles.comboBox__input}
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
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

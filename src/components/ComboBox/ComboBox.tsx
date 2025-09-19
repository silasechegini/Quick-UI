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
      handleFilteredOptions(inputValue);
    }
  }, [inputValue, options, onSearch, debounceDelay]);

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

import React, { useState, useEffect, useRef } from "react";
import { ComboBoxProps, ComboBoxOption } from "./ComboBox.types";
import styles from "./styles.module.scss";

const ComboBox: React.FC<ComboBoxProps> = ({
  options = [],
  onChange,
  onSearch,
  debounceDelay = 300,
  placeholder = "Select...",
  isLoading = false,
  disabled = false,
  renderOption,
  className = "",
  autoFocus,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] =
    useState<ComboBoxOption[]>(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

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
  }, [inputValue, options]);

  const handleSelect = (option: ComboBoxOption, index: number) => {
    setInputValue(option.label);
    setIsOpen(false);
    const stringValue =
      typeof option.value === "number" ? option.value.toString() : option.value;
    onChange?.(stringValue, option);
    setHighlightedIndex(index);
  };

  return (
    <div
      className={`${styles.comboBox} ${disabled ? "disabled" : ""} ${className}`}
    >
      <input
        ref={inputRef}
        type="text"
        className={styles.comboBox__input}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-autocomplete="list"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="combo-box-list"
        aria-activedescendant={`combo-box-option-${highlightedIndex}`}
      />

      {isOpen && (
        <ul className="combo-box__list" role="listbox" id="combo-box-list">
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

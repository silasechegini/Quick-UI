import React, { useState, useEffect, useRef } from "react";
import type { MultiSelectProps, MultiSelectOption } from "./MultiSelect.types";
import iconSvgMapping from "@assets/iconSvgMapping ";
import styles from "./styles.module.scss";

const CloseIcon = iconSvgMapping["close_icon"];

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  defaultValue = [],
  onChange,
  placeholder = "Select options...",
  isLoading = false,
  disabled = false,
  searchable = true,
  debounceDelay = 300,
  renderOption,
  className = "",
  name,
  autoFocus = false,
  maxSelected,
  clearable = true,
}) => {
  const isControlled = value !== undefined;
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<(string | number)[]>(() =>
    isControlled ? value! : defaultValue,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [filteredOptions, setFilteredOptions] =
    useState<MultiSelectOption[]>(options);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isControlled) setSelected(value!);
  }, [value]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounce inputValue changes
  useEffect(() => {
    const handler = setTimeout(() => {
      const query = inputValue.toLowerCase().trim();

      if (query === "") {
        setFilteredOptions(options);
        return;
      }

      const filtered = options.filter((opt) =>
        opt.label.toLowerCase().includes(query),
      );
      setFilteredOptions(filtered);
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [inputValue, options, debounceDelay]);

  const updateSelection = (newSelected: (string | number)[]) => {
    if (!isControlled) {
      setSelected(newSelected);
    }
    onChange?.(newSelected);
  };

  const handleSelect = (option: MultiSelectOption, index: number) => {
    const exists = selected.includes(option.value);
    const newSelected = exists
      ? selected.filter((v) => v !== option.value)
      : [...selected, option.value];

    if (!exists && maxSelected && newSelected.length > maxSelected) return;
    updateSelection(newSelected);
    setHighlightedIndex(index);
    if (searchable) {
      setInputValue("");
      inputRef.current?.focus();
    } else {
      setIsOpen(false);
    }
  };

  const handleRemove = (val: string | number) => {
    const newSelected = selected.filter((v) => v !== val);
    updateSelection(newSelected);
  };

  const handleClearAll = () => {
    updateSelection([]);
    setIsOpen(false);
    if (searchable) {
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const selectedOptions = options.filter((opt) => selected.includes(opt.value));

  return (
    <div className={`${styles.multiSelect} ${className}`} ref={wrapperRef}>
      <div
        className={`${styles.inputWrapper} ${disabled ? styles.disabled : ""}`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className={styles.tags}>
          {selectedOptions.map((opt) => (
            <span key={opt.value} className={styles.tag}>
              {opt.label}
              <span
                className={styles.removeIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(opt.value);
                }}
              >
                <CloseIcon aria-label="Remove tag" />
              </span>
            </span>
          ))}
          {searchable && (
            <input
              type="text"
              name={name}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsOpen(true)}
              ref={inputRef}
              placeholder={selected.length ? "" : placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              className={styles.input}
            />
          )}
        </div>

        {clearable && selected.length > 0 && (
          <button
            className={styles.clearBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            type="button"
          >
            <CloseIcon aria-label="Remove tag" className={styles.closeIcon} />
          </button>
        )}
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {isLoading ? (
            <li className={styles.loading}>Loading...</li>
          ) : filteredOptions.length === 0 ? (
            <li className={styles.empty}>No options</li>
          ) : (
            filteredOptions.map((opt, index) => {
              const isSelected = selected.includes(opt.value);
              const isHighlighted = highlightedIndex === index;

              return (
                <li
                  key={opt.value}
                  className={`${styles.option} ${isSelected ? styles.selected : ""} ${
                    isHighlighted ? styles.highlighted : ""
                  }`}
                  onClick={() => handleSelect(opt, index)}
                >
                  {renderOption ? (
                    renderOption(opt, isSelected, isHighlighted)
                  ) : (
                    <span>{opt.label}</span>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;

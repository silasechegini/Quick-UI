import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useDeferredValue,
  useId,
} from "react";
import type { MultiSelectProps, MultiSelectOption } from "./MultiSelect.types";
import { iconSvgMapping } from "@assets";
import styles from "./styles.module.scss";

const CloseIcon = iconSvgMapping["close_icon"];

const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  options,
  value,
  defaultValue = [],
  onChange,
  placeholder = "Select options...",
  isLoading = false,
  disabled = false,
  searchable = true,
  renderOption,
  className = "",
  name,
  autoFocus = false,
  maxSelected,
  clearable = true,
}) => {
  const generatedId = useId();
  const componentId = id ?? `multiselect-${generatedId}`;
  const dropdownId = `${componentId}-dropdown`;
  const isControlled = value !== undefined;
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<(string | number)[]>(() =>
    isControlled
      ? value!
      : options
          .filter((opt) => defaultValue.includes(opt.value))
          .map((opt) => opt.value),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [filteredOptions, setFilteredOptions] =
    useState<MultiSelectOption[]>(options);
  const debouncedValue = useDeferredValue(inputValue);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isControlled) setSelected(value!);
  }, [value, isControlled]);

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

  useEffect(() => {
    const query = debouncedValue.toLowerCase().trim();

    if (query === "" || !searchable) {
      setFilteredOptions(options);
      return;
    }

    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(query),
    );
    setFilteredOptions(filtered);
  }, [debouncedValue, options, searchable]);

  const updateSelection = useCallback(
    (newSelected: (string | number)[]) => {
      if (!isControlled) {
        setSelected(newSelected);
      }
      onChange?.(newSelected);
    },
    [isControlled, onChange],
  );

  const handleSelect = useCallback(
    (option: MultiSelectOption, index: number) => {
      const exists = selected.includes(option.value);
      const newSelected = exists
        ? selected.filter((v) => v !== option.value)
        : [...selected, option.value];

      if (!exists && maxSelected && newSelected.length > maxSelected) {
        return;
      }

      updateSelection(newSelected);
      setHighlightedIndex(index);

      if (searchable) {
        setInputValue("");
        inputRef.current?.focus();
      } else {
        setIsOpen(false);
      }
    },
    [selected, maxSelected, searchable, updateSelection],
  );

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

  const renderInputText = () => {
    if (selectedOptions.length === 0) return placeholder;
    if (selectedOptions.length === 1) return selectedOptions[0].label;
    return `${selectedOptions.length} options selected`;
  };

  return (
    <>
      <div
        className={`${styles.multiSelect} ${className}`}
        ref={wrapperRef}
        id={componentId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={dropdownId}
      >
        <div
          className={`${styles.inputWrapper} ${disabled ? styles.disabled : ""}`}
          onClick={() => inputRef.current?.focus()}
        >
          <div className={styles.tags}>
            <input
              type="text"
              name={name}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsOpen(true)}
              ref={inputRef}
              placeholder={renderInputText()}
              disabled={disabled}
              autoFocus={autoFocus}
              className={styles.input}
            />
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
          <ul
            className={styles.dropdown}
            role="listbox"
            aria-multiselectable="true"
            id={dropdownId}
          >
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
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {renderOption ? (
                      renderOption(opt, isSelected, isHighlighted)
                    ) : (
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className={styles.checkbox}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className={styles.labelText}>{opt.label}</span>
                      </label>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
      <div className={styles.tagContainer}>
        {selectedOptions.map((opt) => (
          <span key={opt.value} className={styles.tag}>
            {opt.label}
            <span
              className={styles.clearBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(opt.value);
              }}
            >
              <CloseIcon aria-label="Remove tag" className={styles.closeIcon} />
            </span>
          </span>
        ))}
      </div>
    </>
  );
};

export default MultiSelect;

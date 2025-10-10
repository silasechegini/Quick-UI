import React, { useState, useEffect, useRef, useId } from "react";
import type { MultiSelectProps, MultiSelectOption } from "./MultiSelect.types";
import styles from "./styles.module.scss";
import { Chip } from "@components/Chip";
import { Input } from "@components/Input";
import { useMultiSelect } from "./hooks/useMultiSelect";

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
  useState<MultiSelectOption[]>(options);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    selected,
    filteredOptions,
    isOpen,
    highlightedIndex,
    inputValue,
    setInputValue,
    handleSelect,
    handleRemove,
    handleClearAll,
    renderInputText,
    setIsOpen,
    setHighlightedIndex,
    selectedOptions,
    computeEndIcon,
  } = useMultiSelect({
    options,
    defaultValue,
    isControlled,
    value,
    onChange,
    maxSelected,
    inputRef,
    searchable,
    placeholder,
  });

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
        <Input
          ref={inputRef}
          name={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={renderInputText}
          disabled={disabled}
          autoFocus={autoFocus}
          clearable={clearable && selected.length > 0}
          onClear={handleClearAll}
          endIcon={computeEndIcon}
          loading={isLoading}
          className={styles.input}
          configuration="multi-select"
        />

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
                          aria-hidden="true"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className={styles.customCheckbox} />
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
          <Chip
            key={opt.value}
            text={opt.label}
            interactive={true}
            onRemove={(e) => {
              e.stopPropagation();
              handleRemove(opt.value);
            }}
            size="small"
            variant="outline"
            disabled={disabled}
          />
        ))}
      </div>
    </>
  );
};

export default MultiSelect;

import React, { useEffect, useRef, useId } from "react";
import type { MultiSelectProps } from "./MultiSelect.types";
import styles from "./styles.module.scss";
import { Chip } from "@components/Chip";
import { Input } from "@components/Input";
import { useMultiSelect } from "./hooks/useMultiSelect";
import { CHIP_SIZES, CHIP_VARIANTS } from "@components/Chip/Chip.types";
import { INPUT_CONFIGURATIONS } from "@components/Input/Input.types";
import { ICONS } from "../../assets/iconType";

/**
 * MultiSelect component that allows users to select multiple options from a dropdown list.
 * Features include search functionality, custom option rendering, and controlled/uncontrolled modes.
 *
 * @param props - The props for the MultiSelect component
 * @param props.id - Optional ID for the multiselect element
 * @param props.options - Array of options to display in the dropdown
 * @param props.value - Controlled value for selected options
 * @param props.defaultValue - Default selected options for uncontrolled mode (default: [])
 * @param props.onChange - Callback function called when selection changes
 * @param props.placeholder - Placeholder text to display when no options are selected (default: "Select options...")
 * @param props.isLoading - Whether the component is in a loading state (default: false)
 * @param props.disabled - Whether the component is disabled (default: false)
 * @param props.searchable - Whether users can search/filter options (default: true)
 * @param props.renderOption - Custom function to render individual options
 * @param props.className - Additional CSS classes to apply to the component (default: "")
 * @param props.name - Name attribute for form submission
 * @param props.autoFocus - Whether the input should be focused on mount (default: false)
 * @param props.maxSelected - Maximum number of options that can be selected
 * @param props.clearable - Whether the component should show a clear all button (default: true)
 * @param props.loadingText - Text to display when the component is in a loading state (default: "Loading...")
 * @param props.noOptionsText - Text to display when there are no options available (default: "No options available")
 * @returns JSX.Element representing the multiselect component
 */
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
  loadingText = "Loading...",
  noOptionsText = "No options available",
  clearable = true,
}) => {
  const generatedId = useId();
  const componentId = id ?? `multiselect-${generatedId}`;
  const dropdownId = `${componentId}-dropdown`;
  const isControlled = value !== undefined;
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
          endIcon={isOpen ? ICONS.CHEVRON_UP_ICON : ICONS.CHEVRON_DOWN_ICON}
          loading={isLoading}
          className={styles.input}
          containerClassName={styles.inputWrapper}
          configuration={INPUT_CONFIGURATIONS.MULTI_SELECT}
        />

        {isOpen && (
          <ul
            className={styles.dropdown}
            role="listbox"
            aria-multiselectable="true"
            id={dropdownId}
          >
            {isLoading ? (
              <li className={styles.loading}>{loadingText}</li>
            ) : filteredOptions.length === 0 ? (
              <li className={styles.empty}>{noOptionsText}</li>
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
            size={CHIP_SIZES.SMALL}
            variant={CHIP_VARIANTS.OUTLINE}
            disabled={disabled}
          />
        ))}
      </div>
    </>
  );
};

export default MultiSelect;

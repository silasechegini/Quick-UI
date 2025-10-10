import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MultiSelectOption } from "../MultiSelect.types";
import { IconKey } from "@assets/iconType";

const useMultiSelect = ({
  options,
  defaultValue,
  isControlled,
  value,
  onChange,
  maxSelected,
  inputRef,
  searchable,
  placeholder,
}: {
  options: MultiSelectOption[];
  defaultValue: (string | number)[];
  isControlled: boolean;
  value: (string | number)[] | undefined;
  onChange?: (value: (string | number)[]) => void;
  maxSelected?: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchable: boolean;
  placeholder: string;
}) => {
  const [selected, setSelected] = useState<(string | number)[]>(() =>
    isControlled
      ? value!
      : options
          .filter((opt) => defaultValue.includes(opt.value))
          .map((opt) => opt.value),
  );
  const [filteredOptions, setFilteredOptions] =
    useState<MultiSelectOption[]>(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDeferredValue(inputValue);

  useEffect(() => {
    if (isControlled) setSelected(value!);
  }, [value, isControlled]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

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

  const selectedOptions = useMemo(
    () => options.filter((opt) => selected.includes(opt.value)),
    [options, selected],
  );

  const renderInputText = useMemo(() => {
    if (selectedOptions.length === 0) return placeholder;
    if (selectedOptions.length === 1) return selectedOptions[0].label;
    return `${selectedOptions.length} options selected`;
  }, [selectedOptions, placeholder]);

  const computeEndIcon: IconKey | undefined = useMemo(() => {
    if (selectedOptions.length > 0) return undefined;
    return isOpen ? "chevron_up_icon" : "chevron_down_icon";
  }, [selectedOptions, isOpen]);

  return {
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
  };
};

export { useMultiSelect };

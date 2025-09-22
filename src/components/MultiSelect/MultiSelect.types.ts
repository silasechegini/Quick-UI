export interface MultiSelectOption {
  label: string;
  value: string | number;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (selected: (string | number)[]) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  debounceDelay?: number;
  renderOption?: (
    option: MultiSelectOption,
    isSelected: boolean,
    isHighlighted: boolean,
  ) => React.ReactNode;
  className?: string;
  name?: string;
  autoFocus?: boolean;
  maxSelected?: number;
  clearable?: boolean;
}

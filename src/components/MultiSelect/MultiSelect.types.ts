export interface MultiSelectOption {
  label: string;
  value: string | number;
}

export interface MultiSelectProps {
  id?: string;
  options: MultiSelectOption[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (selected: (string | number)[]) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  searchable?: boolean;
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

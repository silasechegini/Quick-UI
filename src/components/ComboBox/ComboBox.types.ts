export type ComboBoxOption = {
  label: string;
  value: string | number;
  group?: string;
  disabled?: boolean;
};

export interface ComboBoxProps {
  options: ComboBoxOption[];
  placeholder?: string;
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null, option?: ComboBoxOption) => void;
  onSearch?: (input: string) => void | Promise<ComboBoxOption[]>;
  debounceDelay?: number;
  isLoading?: boolean;
  disabled?: boolean;
  renderOption?: (option: ComboBoxOption, isActive: boolean) => React.ReactNode;
  renderValue?: (option: ComboBoxOption) => React.ReactNode;
  className?: string;
  name?: string;
  required?: boolean;
  autoFocus?: boolean;
}

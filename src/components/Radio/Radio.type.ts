import { InputHTMLAttributes } from "react";

export interface RadioItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  value: string | number;
  checked?: boolean;
  disabled?: boolean;
  name: string;
  description?: React.ReactNode;
  error?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps {
  name: string;
  value?: string | number;
  defaultValue?: string | number;
  radioItems: RadioOption[];
  onChange?: (
    value: string | number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  disabled?: boolean;
  className?: string;
  error?: string;
  description?: React.ReactNode;
}

export interface RadioOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

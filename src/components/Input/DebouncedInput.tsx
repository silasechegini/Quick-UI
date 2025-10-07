import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import { DebouncedInputProps } from "./Input.types";
import Input from "./Input";

export interface DebouncedInputHandle {
  resetDebounce: () => void;
  clearDebounce: () => void;
  getValue: () => string;
}

const DebouncedInput = forwardRef<DebouncedInputHandle, DebouncedInputProps>(
  (
    {
      onChange,
      onClear,
      debounceDelay = 300,
      defaultValue,
      error,
      value: controlledValue,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(
      defaultValue?.toString() || controlledValue?.toString() || "",
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const { debounceFn, resetDebounce, clearDebounce } = useDebounce(
      (...args: unknown[]) => {
        if (onChange) {
          onChange(args[0] as React.ChangeEvent<HTMLInputElement>);
        }
      },
      debounceDelay,
    );

    useImperativeHandle(ref, () => ({
      resetDebounce,
      clearDebounce,
      getValue: () => inputValue,
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      debounceFn(e);
    };

    const handleClearInput = () => {
      if (onClear) {
        onClear();
      }
      setInputValue("");
    };

    return (
      <Input
        ref={inputRef}
        onChange={handleChange}
        value={inputValue}
        error={error}
        onClear={handleClearInput}
        {...props}
      />
    );
  },
);

DebouncedInput.displayName = "DebouncedInput";
export default DebouncedInput;

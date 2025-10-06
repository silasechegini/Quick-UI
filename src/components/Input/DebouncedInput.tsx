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
  ({ onChange, debounceDelay = 300, defaultValue, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(
      defaultValue?.toString() || "",
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const { debounceFn, resetDebounce, clearDebounce } = useDebounce(
      (...args: unknown[]) => {
        if (onChange) {
          // Assume the first argument is the event
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

    return (
      <Input
        ref={inputRef}
        onChange={handleChange}
        value={inputValue}
        {...props}
      />
    );
  },
);

DebouncedInput.displayName = "DebouncedInput";
export default DebouncedInput;

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
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
      debounceDelay = 300,
      defaultValue,
      clearable,
      onClear,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(
      defaultValue?.toString() || "",
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const focusTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const lastFocusStateRef = useRef<{
      hasFocus: boolean;
      selectionStart: number | null;
      selectionEnd: number | null;
    }>({
      hasFocus: false,
      selectionStart: null,
      selectionEnd: null,
    });

    const { debounceFn, resetDebounce, clearDebounce } = useDebounce(
      (...args: unknown[]) => {
        if (onChange) {
          // Assume the first argument is the event
          onChange(args[0] as React.ChangeEvent<HTMLInputElement>);
        }
      },
      debounceDelay,
    );

    // Force focus restoration after any re-render that might have caused focus loss
    useLayoutEffect(() => {
      if (lastFocusStateRef.current.hasFocus && inputRef.current) {
        const input = inputRef.current;
        const currentActiveElement = document.activeElement;

        // If focus was lost, restore it
        if (currentActiveElement !== input) {
          // Clear any existing timeout
          if (focusTimeoutRef.current) {
            clearTimeout(focusTimeoutRef.current);
          }

          // Use a micro-task to ensure DOM is ready
          focusTimeoutRef.current = setTimeout(() => {
            if (input && lastFocusStateRef.current.hasFocus) {
              input.focus();

              // Restore cursor position if available
              const { selectionStart, selectionEnd } =
                lastFocusStateRef.current;
              if (selectionStart !== null && selectionEnd !== null) {
                try {
                  input.setSelectionRange(selectionStart, selectionEnd);
                } catch (e) {
                  // Silently fail if selection range is invalid
                  if (process.env.NODE_ENV === "development") {
                    console.debug("Could not restore cursor position:", e);
                  }
                }
              }
            }
          }, 0);
        }
      }
    });

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (focusTimeoutRef.current) {
          clearTimeout(focusTimeoutRef.current);
        }
      };
    }, []);

    useImperativeHandle(ref, () => ({
      resetDebounce,
      clearDebounce,
      getValue: () => inputValue,
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      debounceFn(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      lastFocusStateRef.current.hasFocus = true;
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      lastFocusStateRef.current.hasFocus = false;
      lastFocusStateRef.current.selectionStart = null;
      lastFocusStateRef.current.selectionEnd = null;
      props.onBlur?.(e);
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Capture cursor position on key events
      const target = e.target as HTMLInputElement;
      lastFocusStateRef.current.selectionStart = target.selectionStart;
      lastFocusStateRef.current.selectionEnd = target.selectionEnd;
      props.onKeyUp?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      // Capture cursor position on click events
      const target = e.target as HTMLInputElement;
      lastFocusStateRef.current.selectionStart = target.selectionStart;
      lastFocusStateRef.current.selectionEnd = target.selectionEnd;
      props.onClick?.(e);
    };

    const handleClear = () => {
      setInputValue("");

      // Trigger onChange immediately for clear action (not debounced)
      if (onChange) {
        const syntheticEvent = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }

      if (onClear) {
        onClear();
      }

      // Focus the input after clearing
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    return (
      <Input
        ref={inputRef}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onClick={handleClick}
        value={inputValue}
        clearable={clearable}
        onClear={handleClear}
        {...props}
      />
    );
  },
);

DebouncedInput.displayName = "DebouncedInput";
export default DebouncedInput;

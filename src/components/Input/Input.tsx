import { forwardRef } from "react";
import { InputProps } from "./Input.types";
import { Icon } from "../Icon";
import styles from "./styles.module.scss";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "primary",
      size = "m",
      fullWidth = false,
      label,
      helperText,
      error = false,
      errorMessage,
      loading = false,
      startIcon,
      endIcon,
      clearable = false,
      onClear,
      containerClassName,
      className,
      disabled,
      id,
      value,
      ...props
    },
    ref,
  ) => {
    // Generate unique ID if not provided and label exists
    const inputId = id || (label ? `input-${crypto.randomUUID()}` : undefined);

    const containerClasses = [styles.inputContainer, containerClassName]
      .filter(Boolean)
      .join(" ");

    // Override variant to error if error prop is true
    const effectiveVariant = error ? "error" : variant;

    // Determine if clear button should be shown
    const showClearButton =
      clearable && value && String(value).length > 0 && !disabled && !loading;

    // Determine what to show in the end position
    const showEndIcon = !loading && !showClearButton && endIcon;
    const showLoading = loading;

    const handleClearClick = () => {
      if (onClear) {
        onClear();
      } else if (props.onChange) {
        // Create a synthetic event to trigger onChange with empty value
        const syntheticEvent = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        props.onChange(syntheticEvent);
      }

      // Focus the input after clearing
      if (ref && typeof ref === "object" && ref.current) {
        ref.current.focus();
      }
    };

    return (
      <div className={containerClasses}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {startIcon && (
            <div className={styles.startIcon}>
              <Icon name={startIcon} size={16} />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              styles.input,
              styles[effectiveVariant],
              styles[size],
              fullWidth && styles.fullWidth,
              startIcon && styles.hasStartIcon,
              (showEndIcon || showLoading) && styles.hasEndIcon,
              showClearButton && styles.hasClearButton,
              loading && styles.loading,
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            disabled={disabled || loading}
            value={value}
            {...props}
          />

          {showLoading ? (
            <div className={styles.endIcon}>
              <Icon name="loading_icon" size={16} />
            </div>
          ) : showClearButton ? (
            <button
              type="button"
              onClick={handleClearClick}
              className={styles.clearButton}
              aria-label="Clear input"
              tabIndex={-1}
            >
              <Icon name="clear_icon" size={16} />
            </button>
          ) : showEndIcon ? (
            <div className={styles.endIcon}>
              <Icon name={endIcon} size={16} />
            </div>
          ) : null}
        </div>

        {errorMessage && error && (
          <div className={styles.errorMessage}>
            <Icon name="close_icon" size={12} />
            {errorMessage}
          </div>
        )}

        {helperText && !error && (
          <div className={styles.helperText}>{helperText}</div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;

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
      containerClassName,
      className,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    // Generate unique ID if not provided and label exists
    const inputId =
      id ||
      (label ? `input-${Math.random().toString(36).substr(2, 9)}` : undefined);

    const containerClasses = [styles.inputContainer, containerClassName]
      .filter(Boolean)
      .join(" ");

    // Override variant to error if error prop is true
    const effectiveVariant = error ? "error" : variant;

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
              (endIcon || loading) && styles.hasEndIcon,
              loading && styles.loading,
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            disabled={disabled || loading}
            {...props}
          />

          {loading ? (
            <div className={styles.endIcon}>
              <Icon name="loading_icon" size={16} />
            </div>
          ) : endIcon ? (
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

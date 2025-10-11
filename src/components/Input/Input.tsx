import { forwardRef, useMemo } from "react";
import { INPUT_CONFIGURATIONS, InputProps } from "./Input.types";
import { Icon } from "../Icon";
import styles from "./styles.module.scss";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "..";

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
    const shouldShowClear = useMemo(() => {
      if (
        props.configuration === INPUT_CONFIGURATIONS.MULTI_SELECT &&
        clearable
      ) {
        return true;
      }
      return (
        clearable && value && String(value).length > 0 && !loading && !disabled
      );
    }, [clearable, value, loading, disabled, props.configuration]);

    // Determine the actual end icon to show
    const actualEndIcon = shouldShowClear ? "clear_icon" : endIcon;

    const handleClearClick = () => {
      if (onClear) {
        onClear();
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
              shouldShowClear && styles.hasClearButton,
              actualEndIcon && !shouldShowClear && styles.hasEndIcon,
              loading && styles.hasEndIcon,
              loading && styles.loading,
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            disabled={disabled || loading}
            value={value}
            {...props}
          />

          {loading ? (
            <div className={styles.endIcon}>
              <Icon name="loading_icon" size={16} />
            </div>
          ) : shouldShowClear ? (
            <div className={styles.clearButton}>
              <Button
                variant={BUTTON_VARIANTS.PLAIN}
                size={BUTTON_SIZES.EXTRASMALL}
                icon={<Icon name="clear_icon" size={16} />}
                onClick={handleClearClick}
                onMouseDown={(e) => e.preventDefault()}
                type="button"
                tabIndex={-1}
                aria-label="Clear input"
              />
            </div>
          ) : actualEndIcon ? (
            <div className={styles.endIcon}>
              <Icon name={actualEndIcon} size={16} />
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

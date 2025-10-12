import { forwardRef, useMemo } from "react";
import { INPUT_CONFIGURATIONS, InputProps } from "./Input.types";
import { Icon } from "../Icon";
import styles from "./styles.module.scss";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "..";

/**
 * Input component that provides a flexible text input with various styling options.
 * Supports icons, labels, error states, loading states, and clearable functionality.
 *
 * @param props - The props for the Input component
 * @param props.variant - The visual style variant of the input (default: "primary")
 * @param props.size - The size of the input (default: "m")
 * @param props.fullWidth - Whether the input should take the full width of its container (default: false)
 * @param props.label - Optional label text to display above the input
 * @param props.helperText - Optional helper text to display below the input
 * @param props.error - Whether the input is in an error state (default: false)
 * @param props.errorMessage - Error message to display when in error state
 * @param props.loading - Whether the input is in a loading state (default: false)
 * @param props.startIcon - Icon to display at the start of the input
 * @param props.endIcon - Icon to display at the end of the input
 * @param props.clearable - Whether the input should show a clear button when it has content (default: false)
 * @param props.onClear - Callback function called when the clear button is clicked
 * @param props.containerClassName - Additional CSS classes to apply to the input container
 * @param props.className - Additional CSS classes to apply to the input element
 * @param props.disabled - Whether the input is disabled
 * @param props.id - The ID attribute for the input element
 * @param props.value - The controlled value of the input
 * @param ref - Ref forwarded to the input element
 * @returns JSX.Element representing the input component
 */
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
        clearable &&
        !loading &&
        !disabled
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

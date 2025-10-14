import { forwardRef } from "react";
import { RadioItemProps } from "./Radio.type";
import { combineClasses } from "../../utils/classNames";
import styles from "./styles.module.scss";

const RadioItem = forwardRef<HTMLInputElement, RadioItemProps>(
  (
    {
      label,
      value,
      checked,
      disabled,
      name,
      description,
      error,
      className = "",
      labelClassName = "",
      inputClassName = "",
      onChange,
      ...rest
    },
    ref,
  ) => {
    const id = `${name}-${value}`;

    const inputStyles = combineClasses(
      styles.radioInput,
      inputClassName,
      error ? styles.radioItemError : "",
    );

    const customStyles = combineClasses(
      styles.radioCustom,
      error ? styles.radioItemError : "",
    );

    const containerStyles = combineClasses(
      styles.radioItemContainer,
      className,
    );

    const labelStyles = combineClasses(
      styles.radioLabel,
      labelClassName,
      disabled ? styles.radioLabel__disabled : "",
    );

    return (
      <div className={containerStyles}>
        <label htmlFor={id} className={labelStyles}>
          <input
            ref={ref}
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            className={inputStyles}
            onChange={onChange}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : description ? `${id}-desc` : undefined
            }
            {...rest}
          />
          <span className={customStyles} aria-hidden="true" />
          <span className={styles.radioLabelText}>{label}</span>
        </label>
        {description && (
          <div id={`${id}-desc`} className={styles.radioDescription}>
            {description}
          </div>
        )}
        {error && (
          <div id={`${id}-error`} className={styles.radioError} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  },
);

RadioItem.displayName = "RadioItem";

export default RadioItem;

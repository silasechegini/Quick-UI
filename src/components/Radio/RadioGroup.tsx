import { FC, useState, useCallback } from "react";
import RadioItem from "./RadioItem";
import { RadioGroupProps } from "./Radio.type";
import { combineClasses } from "../../utils";
import styles from "./styles.module.scss";

const RadioGroup: FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  radioItems,
  onChange,
  disabled = false,
  className,
  error,
  description,
}) => {
  // Handle controlled vs uncontrolled pattern
  const [internalValue, setInternalValue] = useState<
    string | number | undefined
  >(defaultValue);
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      // Convert to number if the original value was a number
      const radioItem = radioItems.find(
        (item) => item.value.toString() === newValue,
      );
      const typedValue = radioItem ? radioItem.value : newValue;

      if (!isControlled) {
        setInternalValue(typedValue);
      }

      onChange?.(typedValue, event);
    },
    [isControlled, onChange, radioItems],
  );

  const containerClasses = combineClasses(
    styles.radioGroupContainer,
    className,
    disabled ? styles.radioGroupContainer__disabled : "",
  );

  return (
    <div className={containerClasses} role="radiogroup">
      {description && (
        <div className={styles.radioGroupDescription}>{description}</div>
      )}

      {radioItems.map((item, index) => (
        <RadioItem
          key={`${item.value}-${index}`}
          name={name}
          label={item.label}
          value={item.value}
          checked={selectedValue === item.value}
          disabled={disabled || item.disabled}
          description={item.description}
          onChange={handleRadioChange}
        />
      ))}

      {error && (
        <div className={styles.radioGroupError} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default RadioGroup;

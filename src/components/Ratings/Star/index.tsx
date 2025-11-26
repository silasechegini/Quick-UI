import React, {
  useState,
  useCallback,
  useMemo,
  forwardRef,
  useId,
} from "react";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";
import { StarRatingProps, StarItemProps, StarSize } from "./types";
import { buildClassNames } from "@utils/index";
import styles from "./styles.module.scss";

// Size mappings
const SIZE_MAP: Record<StarSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
  "extra-large": 32,
};

// Star Item Component
const StarItem = React.memo<StarItemProps>(
  ({
    filled,
    halfFilled,
    hovered,
    size,
    activeColor,
    inactiveColor,
    hoverColor,
    filledIcon: FilledIcon = FaStar,
    emptyIcon: EmptyIcon = FaRegStar,
    variant,
    disabled,
    readOnly,
    onClick,
    onMouseEnter,
    onMouseLeave,
    className,
    style,
    index,
    "aria-label": ariaLabel,
  }) => {
    const isInteractive = !disabled && !readOnly;

    const getStarColor = () => {
      if (disabled) return "var(--star-disabled-color)";
      if (hovered && hoverColor) return hoverColor;
      if (filled || halfFilled) return activeColor;
      return inactiveColor;
    };

    const getStarIcon = () => {
      if (halfFilled) return FaStarHalf;
      if (filled) return FilledIcon;
      return EmptyIcon;
    };

    const StarIcon = getStarIcon();

    const starClasses = buildClassNames(
      [styles.star],
      {
        [styles.starFilled]: !!filled,
        [styles.starHalf]: !!halfFilled,
        [styles.starHovered]: !!hovered,
        [styles.starDisabled]: !!disabled,
        [styles.starReadOnly]: !!readOnly,
        [styles.starInteractive]: !!isInteractive,
        [styles[`star${variant.charAt(0).toUpperCase() + variant.slice(1)}`]]:
          true,
      },
      className,
    );

    return (
      <StarIcon
        className={starClasses}
        size={size}
        color={getStarColor()}
        onClick={isInteractive ? onClick : undefined}
        onMouseEnter={isInteractive ? onMouseEnter : undefined}
        onMouseLeave={isInteractive ? onMouseLeave : undefined}
        style={{
          cursor: isInteractive ? "pointer" : "default",
          ...style,
        }}
        aria-label={ariaLabel || `Star ${index + 1}`}
        role="button"
        tabIndex={isInteractive ? 0 : -1}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick();
          }
        }}
      />
    );
  },
);

StarItem.displayName = "StarItem";

// Main StarRating Component
export const StarRating = forwardRef<HTMLDivElement, StarRatingProps>(
  (
    {
      count = 5,
      value,
      defaultValue = 0,
      onChange,
      onStarClick,
      onStarHover,
      onStarLeave,
      size = "medium",
      variant = "filled",
      activeColor = "#ffc107",
      inactiveColor = "#e4e5e9",
      hoverColor,
      filledIcon,
      emptyIcon,
      allowHalf = false,
      readOnly = false,
      disabled = false,
      showValue = false,
      valueFormatter,
      className,
      style,
      starClassName,
      starStyle,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      id,
      "data-testid": testId,
      children,
    },
    ref,
  ) => {
    const generatedId = useId();
    const componentId = id || generatedId;

    // State management - controlled vs uncontrolled
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoveredValue, setHoveredValue] = useState<number | null>(null);

    const currentValue = isControlled ? value : internalValue;
    const displayValue = hoveredValue !== null ? hoveredValue : currentValue;

    // Calculate star size
    const starSize = typeof size === "number" ? size : SIZE_MAP[size];

    // Validate props
    const validatedCount = Math.max(1, Math.min(count, 10)); // Limit to reasonable range

    // Event handlers
    const handleStarClick = useCallback(
      (starIndex: number) => {
        if (disabled || readOnly) return;

        const newRating = allowHalf ? starIndex + 0.5 : starIndex + 1;
        const finalRating = Math.min(newRating, validatedCount);

        if (!isControlled) {
          setInternalValue(finalRating);
        }

        onChange?.(finalRating);
        onStarClick?.(starIndex, finalRating);
      },
      [
        disabled,
        readOnly,
        allowHalf,
        validatedCount,
        isControlled,
        onChange,
        onStarClick,
      ],
    );

    const handleStarHover = useCallback(
      (starIndex: number) => {
        if (disabled || readOnly) return;

        const hoverRating = starIndex + 1;
        setHoveredValue(hoverRating);
        onStarHover?.(starIndex, hoverRating);
      },
      [disabled, readOnly, onStarHover],
    );

    const handleMouseLeave = useCallback(() => {
      if (disabled || readOnly) return;

      setHoveredValue(null);
      onStarLeave?.();
    }, [disabled, readOnly, onStarLeave]);

    // Generate stars
    const stars = useMemo(
      () =>
        Array.from({ length: validatedCount }, (_, index) => {
          const starValue = index + 1;
          const isHovered = hoveredValue !== null && starValue <= hoveredValue;
          const isFilled = starValue <= displayValue;
          const isHalfFilled = allowHalf && starValue - 0.5 === displayValue;

          return (
            <StarItem
              key={index}
              index={index}
              filled={isFilled && !isHalfFilled}
              halfFilled={isHalfFilled}
              hovered={isHovered}
              size={starSize}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              hoverColor={hoverColor}
              filledIcon={filledIcon}
              emptyIcon={emptyIcon}
              variant={variant}
              disabled={disabled}
              readOnly={readOnly}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
              onMouseLeave={handleMouseLeave}
              className={starClassName}
              style={starStyle}
              aria-label={`Rate ${starValue} out of ${validatedCount} stars`}
            />
          );
        }),
      [
        validatedCount,
        displayValue,
        hoveredValue,
        allowHalf,
        starSize,
        activeColor,
        inactiveColor,
        hoverColor,
        filledIcon,
        emptyIcon,
        variant,
        disabled,
        readOnly,
        handleStarClick,
        handleStarHover,
        handleMouseLeave,
        starClassName,
        starStyle,
      ],
    );

    // Format display value
    const formattedValue = valueFormatter
      ? valueFormatter(currentValue)
      : `${currentValue}/${validatedCount}`;

    const sizeClassName =
      typeof size === "string"
        ? styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`]
        : undefined;

    const containerClasses = buildClassNames(
      [styles.starRatingContainer],
      {
        [styles.disabled]: disabled,
        [styles.readOnly]: readOnly,
        ...(sizeClassName && { [sizeClassName]: true }),
      },
      className,
    );

    return (
      <div
        ref={ref}
        className={containerClasses}
        style={style}
        onMouseLeave={handleMouseLeave}
        id={componentId}
        data-testid={testId}
        role="radiogroup"
        aria-label={ariaLabel || `Rating: ${formattedValue}`}
        aria-labelledby={ariaLabelledBy}
        aria-required={false}
        aria-readonly={readOnly}
        aria-disabled={disabled}
      >
        <div className={styles.starsWrapper} role="group">
          {stars}
        </div>

        {showValue && (
          <span className={styles.valueDisplay} aria-live="polite">
            {formattedValue}
          </span>
        )}

        {children && <div className={styles.childrenWrapper}>{children}</div>}
      </div>
    );
  },
);

StarRating.displayName = "StarRating";

export default StarRating;

import React, {
  useState,
  useCallback,
  useMemo,
  forwardRef,
  useId,
} from "react";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";
import {
  StarRatingProps,
  StarItemProps,
  StarSize,
  STAR_VARIANTS,
  STAR_SIZES,
} from "./types";
import { buildClassNames } from "@utils/index";
import styles from "./styles.module.scss";

// Size mappings
const SIZE_MAP: Record<StarSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
  xLarge: 32,
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
    onKeyDown,
    tabIndex = -1,
    className,
    style,
    index,
    "aria-label": ariaLabel,
    "aria-checked": ariaChecked,
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
        [styles[
          `star${variant
            .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
            .replace(/^./, (c) => c.toUpperCase())}`
        ]]: true,
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
        aria-checked={ariaChecked}
        role="radio"
        tabIndex={tabIndex}
        onKeyDown={isInteractive ? onKeyDown : undefined}
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
      size = STAR_SIZES.MEDIUM,
      variant = STAR_VARIANTS.FILLED,
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
    const [focusedStarIndex, setFocusedStarIndex] = useState<number | null>(
      null,
    );

    const currentValue = isControlled ? value : internalValue;
    const displayValue = hoveredValue !== null ? hoveredValue : currentValue;

    // Calculate star size
    const starSize =
      typeof size === "number" ? size : SIZE_MAP[size as StarSize];

    // Validate props
    const validatedCount = Math.max(1, Math.min(count, 10)); // Limit to reasonable range

    // Event handlers
    const handleStarClick = useCallback(
      (starIndex: number, event?: React.MouseEvent) => {
        if (disabled || readOnly) return;

        let newRating = starIndex + 1; // Default to full star

        // If allowHalf is true and we have mouse event, detect position within star
        if (allowHalf && event) {
          const rect = event.currentTarget.getBoundingClientRect();
          const clickX = event.clientX - rect.left;
          const starWidth = rect.width;

          // If click is in the left half of the star, set half rating
          if (clickX <= starWidth / 2) {
            newRating = starIndex + 0.5;
          }
        }

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

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent, starIndex: number) => {
        if (disabled || readOnly) return;

        switch (event.key) {
          case "ArrowLeft":
          case "ArrowDown": {
            event.preventDefault();
            const prevIndex =
              starIndex > 0 ? starIndex - 1 : validatedCount - 1;
            setFocusedStarIndex(prevIndex);
            // Focus the previous star element
            try {
              const parent = event.currentTarget?.parentElement;
              if (!parent) return;
              const starElements = parent.querySelectorAll('[role="radio"]');
              if (starElements && starElements[prevIndex]) {
                (starElements[prevIndex] as HTMLElement).focus();
              }
            } catch (error) {
              console.error(error);
              // Silently handle errors during testing when elements may be unmounted
            }
            break;
          }

          case "ArrowRight":
          case "ArrowUp": {
            event.preventDefault();
            const nextIndex =
              starIndex < validatedCount - 1 ? starIndex + 1 : 0;
            setFocusedStarIndex(nextIndex);
            // Focus the next star element
            try {
              const parent = event.currentTarget?.parentElement;
              if (!parent) return;
              const starElements = parent.querySelectorAll('[role="radio"]');
              if (starElements && starElements[nextIndex]) {
                (starElements[nextIndex] as HTMLElement).focus();
              }
            } catch (error) {
              console.error(error);
              // Silently handle errors during testing when elements may be unmounted
            }
            break;
          }

          case "Enter":
          case " ":
            event.preventDefault();
            handleStarClick(starIndex, event as unknown as React.MouseEvent);
            break;

          case "Home": {
            event.preventDefault();
            setFocusedStarIndex(0);
            try {
              const parent = event.currentTarget?.parentElement;
              if (!parent) return;
              const starElements = parent.querySelectorAll('[role="radio"]');
              if (starElements && starElements[0]) {
                (starElements[0] as HTMLElement).focus();
              }
            } catch (error) {
              console.error(error);
              // Silently handle errors during testing when elements may be unmounted
            }
            break;
          }

          case "End": {
            event.preventDefault();
            const lastIndex = validatedCount - 1;
            setFocusedStarIndex(lastIndex);
            try {
              const parent = event.currentTarget?.parentElement;
              if (!parent) return;
              const starElements = parent.querySelectorAll('[role="radio"]');
              if (starElements && starElements[lastIndex]) {
                (starElements[lastIndex] as HTMLElement).focus();
              }
            } catch (error) {
              console.error(error);
              // Silently handle errors during testing when elements may be unmounted
            }
            break;
          }
        }
      },
      [
        disabled,
        readOnly,
        validatedCount,
        handleStarClick,
        setFocusedStarIndex,
      ],
    );

    // Generate stars
    const stars = useMemo(
      () =>
        Array.from({ length: validatedCount }, (_, index) => {
          const starValue = index + 1;
          const isHovered = hoveredValue !== null && starValue <= hoveredValue;
          const isFilled = starValue <= displayValue;
          const isHalfFilled = allowHalf && starValue - 0.5 === displayValue;
          const isSelected = Math.ceil(currentValue) === starValue;
          const isChecked = isFilled || isHalfFilled; // For ARIA, checked means this star is filled
          const shouldBeFocusable = index === 0 || isSelected; // First star or currently selected star gets tabIndex=0

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
              onClick={(event) => handleStarClick(index, event)}
              onMouseEnter={() => handleStarHover(index)}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(event) => handleKeyDown(event, index)}
              tabIndex={shouldBeFocusable && !disabled && !readOnly ? 0 : -1}
              className={starClassName}
              style={starStyle}
              aria-label={`${isSelected ? "Current rating: " : ""}${starValue} out of ${validatedCount} stars`}
              aria-checked={isChecked}
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
        handleKeyDown,
        starClassName,
        starStyle,
        currentValue,
        focusedStarIndex,
      ],
    );

    // Format display value
    const formattedValue = valueFormatter
      ? valueFormatter(currentValue)
      : `${currentValue}/${validatedCount}`;

    const sizeClassName =
      typeof size === "string"
        ? styles[
            `size${size
              .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
              .replace(/^./, (c) => c.toUpperCase())}`
          ]
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

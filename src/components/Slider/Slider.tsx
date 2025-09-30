import React, { useRef, useCallback } from "react";
import { SingleValueSliderProps } from "./Slider.types";
import { useSlider } from "./hooks/useSlider";
import { valueToPercent } from "./utils/math";
import styles from "./styles.module.scss";
import { useSliderSizeClasses } from "./hooks/useSliderSizeClasses";

const Slider: React.FC<SingleValueSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  size = "medium",
  value: controlledValue,
  defaultValue = 0,
  onChange,
  disabled = false,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const { value, updateValue } = useSlider<number>({
    min,
    max,
    step,
    defaultValue,
    controlledValue,
    onChange,
  });

  const sizeClasses = useSliderSizeClasses(styles, size);

  // Map mouse position to slider value
  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const percent = (clientX - trackRect.left) / trackRect.width;
      const newVal = min + percent * (max - min);
      updateValue(newVal);
    },
    [min, max, updateValue],
  );

  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();

      const move = (ev: MouseEvent | TouchEvent) => handlePointerMove(ev);
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("mouseup", up);
        document.removeEventListener("touchend", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("touchmove", move, { passive: false });
      document.addEventListener("mouseup", up);
      document.addEventListener("touchend", up);

      handlePointerMove(e.nativeEvent as MouseEvent);
    },
    [disabled, handlePointerMove],
  );

  const percent = valueToPercent(value, min, max);

  return (
    <div
      ref={trackRef}
      className={[
        styles.slider,
        sizeClasses.slider,
        disabled && styles.disabled,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
    >
      {/* Track */}
      <div className={`${styles.track} ${sizeClasses.track}`} />

      {/* Filled Track */}
      <div
        className={`${styles.filled} ${sizeClasses.filled}`}
        style={{ width: `${percent}%` }}
      />

      {/* Thumb */}
      <div
        className={`${styles.thumb} ${sizeClasses.thumb}`}
        style={{ left: `${percent}%` }}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowRight" || e.key === "ArrowUp")
            updateValue(value + step);
          if (e.key === "ArrowLeft" || e.key === "ArrowDown")
            updateValue(value - step);
          if (e.key === "Home") updateValue(min);
          if (e.key === "End") updateValue(max);
          if (e.key === "PageUp") updateValue(value + step * 10);
          if (e.key === "PageDown") updateValue(value - step * 10);
        }}
      />
    </div>
  );
};

export default Slider;

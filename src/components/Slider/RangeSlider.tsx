import React, { useRef, useCallback } from "react";
import { RangeSliderProps } from "./Slider.types";
import { useSlider } from "./hooks/useSlider";
import { valueToPercent } from "./utils/math";
import styles from "./styles.module.scss";

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = [20, 80],
  onChange,
  disabled = false,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const { value, updateValue } = useSlider<[number, number]>({
    min,
    max,
    step,
    defaultValue,
    controlledValue,
    onChange,
  });

  const [low, high] = value;

  const getPercent = (val: number) => valueToPercent(val, min, max);

  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent, activeThumb: "low" | "high") => {
      if (!trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const percent = (clientX - trackRect.left) / trackRect.width;
      const newVal = min + percent * (max - min);

      if (activeThumb === "low") {
        updateValue([Math.min(newVal, high), high]);
      } else {
        updateValue([low, Math.max(newVal, low)]);
      }
    },
    [min, max, low, high, updateValue],
  );

  const handlePointerDown = useCallback(
    (thumb: "low" | "high") => (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();

      const move = (ev: MouseEvent | TouchEvent) =>
        handlePointerMove(ev, thumb);
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

      handlePointerMove(e.nativeEvent as MouseEvent, thumb);
    },
    [disabled, handlePointerMove],
  );

  const lowPercent = getPercent(low);
  const highPercent = getPercent(high);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled || !trackRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const percent = (clientX - trackRect.left) / trackRect.width;
      const clickValue = min + percent * (max - min);

      // Determine which thumb is closer to the click
      const lowDistance = Math.abs(clickValue - low);
      const highDistance = Math.abs(clickValue - high);

      if (lowDistance <= highDistance) {
        updateValue([Math.min(clickValue, high), high]);
      } else {
        updateValue([low, Math.max(clickValue, low)]);
      }
    },
    [disabled, min, max, low, high, updateValue],
  );

  return (
    <div
      ref={trackRef}
      className={`${styles.slider} ${disabled ? styles.disabled : ""} ${
        className ?? ""
      }`}
      onMouseDown={handleTrackClick}
      onTouchStart={handleTrackClick}
    >
      {/* Track */}
      <div className={styles.track} />

      {/* Filled range */}
      <div
        className={styles.filled}
        style={{
          left: `${lowPercent}%`,
          width: `${highPercent - lowPercent}%`,
        }}
      />

      {/* Low Thumb */}
      <div
        className={styles.thumb}
        style={{ left: `${lowPercent}%` }}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-label="Minimum value"
        aria-valuemin={min}
        aria-valuemax={high}
        aria-valuenow={low}
        aria-disabled={disabled}
        onMouseDown={handlePointerDown("low")}
        onTouchStart={handlePointerDown("low")}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowRight" || e.key === "ArrowUp")
            updateValue([Math.min(low + step, high), high]);
          if (e.key === "ArrowLeft" || e.key === "ArrowDown")
            updateValue([low - step, high]);
          if (e.key === "Home") updateValue([min, high]);
          if (e.key === "End") updateValue([high, high]); // clamp to high
        }}
      />

      {/* High Thumb */}
      <div
        className={styles.thumb}
        style={{ left: `${highPercent}%` }}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-label="Maximum value"
        aria-valuemin={low}
        aria-valuemax={max}
        aria-valuenow={high}
        aria-disabled={disabled}
        onMouseDown={handlePointerDown("high")}
        onTouchStart={handlePointerDown("high")}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowRight" || e.key === "ArrowUp")
            updateValue([low, high + step]);
          if (e.key === "ArrowLeft" || e.key === "ArrowDown")
            updateValue([low, Math.max(low, high - step)]);
          if (e.key === "Home") updateValue([low, low]); // clamp to low
          if (e.key === "End") updateValue([low, max]);
        }}
      />
    </div>
  );
};

export default RangeSlider;

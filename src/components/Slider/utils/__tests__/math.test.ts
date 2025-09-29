import { clamp, roundToStep, valueToPercent } from "../math";

describe("math utilities", () => {
  describe("clamp", () => {
    it("should return the value when within bounds", () => {
      expect(clamp(50, 0, 100)).toBe(50);
      expect(clamp(25.5, 0, 100)).toBe(25.5);
      expect(clamp(0, 0, 100)).toBe(0);
      expect(clamp(100, 0, 100)).toBe(100);
    });

    it("should return min when value is below minimum", () => {
      expect(clamp(-10, 0, 100)).toBe(0);
      expect(clamp(-50.5, -25, 75)).toBe(-25);
      expect(clamp(5, 10, 20)).toBe(10);
    });

    it("should return max when value is above maximum", () => {
      expect(clamp(150, 0, 100)).toBe(100);
      expect(clamp(100.5, 0, 100)).toBe(100);
      expect(clamp(25, 10, 20)).toBe(20);
    });

    it("should handle negative ranges", () => {
      expect(clamp(-50, -100, -25)).toBe(-50);
      expect(clamp(-150, -100, -25)).toBe(-100);
      expect(clamp(0, -100, -25)).toBe(-25);
    });

    it("should handle decimal values", () => {
      expect(clamp(0.5, 0.25, 0.75)).toBe(0.5);
      expect(clamp(0.1, 0.25, 0.75)).toBe(0.25);
      expect(clamp(0.9, 0.25, 0.75)).toBe(0.75);
    });

    it("should handle min equals max", () => {
      expect(clamp(50, 42, 42)).toBe(42);
      expect(clamp(30, 42, 42)).toBe(42);
      expect(clamp(100, 42, 42)).toBe(42);
    });

    it("should handle zero values", () => {
      expect(clamp(0, -10, 10)).toBe(0);
      expect(clamp(5, 0, 0)).toBe(0);
      expect(clamp(-5, 0, 0)).toBe(0);
    });
  });

  describe("roundToStep", () => {
    it("should round to the nearest step from min", () => {
      // Step of 1
      expect(roundToStep(5, 1, 0)).toBe(5);
      expect(roundToStep(5.4, 1, 0)).toBe(5);
      expect(roundToStep(5.6, 1, 0)).toBe(6);

      // Step of 5
      expect(roundToStep(23, 5, 0)).toBe(25);
      expect(roundToStep(22, 5, 0)).toBe(20);
      expect(roundToStep(22.5, 5, 0)).toBe(25); // Exactly halfway rounds up
    });

    it("should handle different starting points (min)", () => {
      // Min of 10, step of 5: valid values are 10, 15, 20, 25...
      expect(roundToStep(13, 5, 10)).toBe(15);
      expect(roundToStep(12, 5, 10)).toBe(10);
      expect(roundToStep(17.5, 5, 10)).toBe(20); // Exactly halfway rounds up

      // Min of -10, step of 3: valid values are -10, -7, -4, -1, 2...
      expect(roundToStep(-8, 3, -10)).toBe(-7);
      expect(roundToStep(-9, 3, -10)).toBe(-10);
    });

    it("should handle decimal steps", () => {
      // Step of 0.1
      expect(roundToStep(0.25, 0.1, 0)).toBeCloseTo(0.2);
      expect(roundToStep(0.24, 0.1, 0)).toBeCloseTo(0.2);
      expect(roundToStep(0.26, 0.1, 0)).toBeCloseTo(0.3);

      // Step of 0.5
      expect(roundToStep(1.3, 0.5, 0)).toBeCloseTo(1.5);
      expect(roundToStep(1.2, 0.5, 0)).toBeCloseTo(1.0);
    });

    it("should handle step larger than value range", () => {
      // If step is 10 but we're only 3 units from min
      expect(roundToStep(3, 10, 0)).toBe(0);
      expect(roundToStep(7, 10, 0)).toBe(10);
    });

    it("should handle negative values with negative min", () => {
      // Min of -100, step of 10: valid values are -100, -90, -80...
      expect(roundToStep(-95, 10, -100)).toBe(-90);
      expect(roundToStep(-85, 10, -100)).toBe(-80);
      expect(roundToStep(-96, 10, -100)).toBe(-100);
    });

    it("should handle exact step values", () => {
      expect(roundToStep(0, 5, 0)).toBe(0);
      expect(roundToStep(5, 5, 0)).toBe(5);
      expect(roundToStep(10, 5, 0)).toBe(10);
    });

    it("should handle fractional steps with integer values", () => {
      expect(roundToStep(1, 0.25, 0)).toBeCloseTo(1);
      expect(roundToStep(1.1, 0.25, 0)).toBeCloseTo(1);
      expect(roundToStep(1.15, 0.25, 0)).toBeCloseTo(1.25);
    });
  });

  describe("valueToPercent", () => {
    it("should convert values to percentages correctly", () => {
      expect(valueToPercent(50, 0, 100)).toBe(50);
      expect(valueToPercent(25, 0, 100)).toBe(25);
      expect(valueToPercent(0, 0, 100)).toBe(0);
      expect(valueToPercent(100, 0, 100)).toBe(100);
    });

    it("should handle different ranges", () => {
      // Range 0-50, value 25 = 50%
      expect(valueToPercent(25, 0, 50)).toBe(50);

      // Range 10-20, value 15 = 50%
      expect(valueToPercent(15, 10, 20)).toBe(50);

      // Range 0-200, value 50 = 25%
      expect(valueToPercent(50, 0, 200)).toBe(25);
    });

    it("should handle negative ranges", () => {
      // Range -100 to 0, value -50 = 50%
      expect(valueToPercent(-50, -100, 0)).toBe(50);

      // Range -50 to -25, value -37.5 = 50%
      expect(valueToPercent(-37.5, -50, -25)).toBe(50);

      // Range -100 to 100, value 0 = 50%
      expect(valueToPercent(0, -100, 100)).toBe(50);
    });

    it("should handle decimal values", () => {
      expect(valueToPercent(0.5, 0, 1)).toBe(50);
      expect(valueToPercent(0.25, 0, 1)).toBe(25);
      expect(valueToPercent(0.75, 0.5, 1)).toBe(50);
    });

    it("should handle values at boundaries", () => {
      expect(valueToPercent(10, 10, 20)).toBe(0);
      expect(valueToPercent(20, 10, 20)).toBe(100);
    });

    it("should handle values outside range", () => {
      // Value below minimum
      expect(valueToPercent(-10, 0, 100)).toBe(-10);

      // Value above maximum
      expect(valueToPercent(150, 0, 100)).toBe(150);
    });

    it("should handle min equals max (edge case)", () => {
      // When min equals max, any value should result in division by zero
      // This would return Infinity or -Infinity in JavaScript
      expect(valueToPercent(42, 50, 50)).toBe(-Infinity);
      expect(valueToPercent(50, 50, 50)).toBeNaN();
      expect(valueToPercent(60, 50, 50)).toBe(Infinity);
    });

    it("should handle very small ranges with precision", () => {
      expect(valueToPercent(0.05, 0, 0.1)).toBe(50);
      expect(valueToPercent(0.025, 0, 0.1)).toBe(25);
      expect(valueToPercent(0.075, 0, 0.1)).toBe(75);
    });

    it("should handle large numbers", () => {
      expect(valueToPercent(500000, 0, 1000000)).toBe(50);
      expect(valueToPercent(250000, 0, 1000000)).toBe(25);
    });
  });
});

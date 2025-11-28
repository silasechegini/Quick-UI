import { describe, it, expect } from "vitest";
import { toPascalCase } from "../toPascalCase";

describe("toPascalCase", () => {
  it("converts simple lowercase string to PascalCase", () => {
    expect(toPascalCase("small")).toBe("Small");
  });

  it("converts hyphen-separated string to PascalCase", () => {
    expect(toPascalCase("extra-large")).toBe("ExtraLarge");
  });

  it("converts underscore-separated string to PascalCase", () => {
    expect(toPascalCase("very_large")).toBe("VeryLarge");
  });

  it("converts multiple hyphenated words to PascalCase", () => {
    expect(toPascalCase("very-extra-large")).toBe("VeryExtraLarge");
  });

  it("handles already capitalized first letter", () => {
    expect(toPascalCase("Large")).toBe("Large");
  });

  it("handles mixed case with separators", () => {
    expect(toPascalCase("medium-Large")).toBe("MediumLarge");
  });

  it("handles single character input", () => {
    expect(toPascalCase("s")).toBe("S");
  });

  it("handles empty string", () => {
    expect(toPascalCase("")).toBe("");
  });

  it("handles string with only separators", () => {
    expect(toPascalCase("-")).toBe("");
  });

  it("handles string starting with separator", () => {
    expect(toPascalCase("-small")).toBe("Small");
  });

  it("handles string ending with separator", () => {
    expect(toPascalCase("small-")).toBe("Small");
  });

  it("handles multiple consecutive separators", () => {
    expect(toPascalCase("small--large")).toBe("SmallLarge");
  });

  it("handles mixed separators (hyphens and underscores)", () => {
    expect(toPascalCase("size-extra_large")).toBe("SizeExtraLarge");
  });

  it("handles all uppercase input", () => {
    expect(toPascalCase("LARGE")).toBe("Large");
  });

  it("handles mixed case without separators", () => {
    expect(toPascalCase("mediumSize")).toBe("Mediumsize");
  });

  it("handles numbers in the string", () => {
    expect(toPascalCase("size-2xl")).toBe("Size2xl");
  });

  it("handles complex mixed input with multiple separators", () => {
    expect(toPascalCase("extra-large_size-variant")).toBe(
      "ExtraLargeSizeVariant",
    );
  });

  it("handles strings with spaces (edge case)", () => {
    expect(toPascalCase("medium large")).toBe("MediumLarge");
  });

  it("handles all uppercase with separators", () => {
    expect(toPascalCase("EXTRA-LARGE_SIZE")).toBe("ExtraLargeSize");
  });

  it("handles leading and trailing spaces", () => {
    expect(toPascalCase("  small-size  ")).toBe("SmallSize");
  });
});

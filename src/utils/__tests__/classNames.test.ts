import { buildClassNames, combineClasses } from "../classNames";

describe("buildClassNames", () => {
  it("should combine base classes with conditional classes", () => {
    const result = buildClassNames(["base", "component"], {
      active: true,
      disabled: false,
      large: true,
    });
    expect(result).toBe("base component active large");
  });

  it("should handle empty base classes", () => {
    const result = buildClassNames([], {
      active: true,
      disabled: false,
    });
    expect(result).toBe("active");
  });

  it("should handle empty conditional classes", () => {
    const result = buildClassNames(["base", "component"], {});
    expect(result).toBe("base component");
  });

  it("should include custom className when provided", () => {
    const result = buildClassNames(["base"], { active: true }, "custom-class");
    expect(result).toBe("base active custom-class");
  });

  it("should ignore custom className when undefined", () => {
    const result = buildClassNames(["base"], { active: true }, undefined);
    expect(result).toBe("base active");
  });

  it("should handle all false conditions", () => {
    const result = buildClassNames(["base"], {
      active: false,
      disabled: false,
      large: false,
    });
    expect(result).toBe("base");
  });

  it("should handle all true conditions", () => {
    const result = buildClassNames(["base"], {
      active: true,
      disabled: true,
      large: true,
    });
    expect(result).toBe("base active disabled large");
  });

  it("should filter out falsy base classes", () => {
    const result = buildClassNames(["base", "", "component"], { active: true });
    expect(result).toBe("base component active");
  });

  it("should work with complex class names", () => {
    const result = buildClassNames(
      ["btn", "btn-primary"],
      {
        "btn--large": true,
        "btn--disabled": false,
        btn_with_icon: true,
      },
      "my-custom-btn",
    );
    expect(result).toBe(
      "btn btn-primary btn--large btn_with_icon my-custom-btn",
    );
  });
});

describe("combineClasses", () => {
  it("should combine string classes", () => {
    const result = combineClasses("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("should filter out falsy values", () => {
    const isEmpty = false;
    const isActive = false;
    const result = combineClasses(
      "class1",
      isActive && "class2",
      null,
      undefined,
      "class3",
      isEmpty && "class4",
    );
    expect(result).toBe("class1 class3");
  });

  it("should handle conditional classes with logical operators", () => {
    const isActive = true;
    const isDisabled = false;
    const customClass = "custom";

    const result = combineClasses(
      "base",
      isActive && "active",
      isDisabled && "disabled",
      customClass,
    );
    expect(result).toBe("base active custom");
  });

  it("should handle empty input", () => {
    const result = combineClasses();
    expect(result).toBe("");
  });

  it("should handle all falsy values", () => {
    const result = combineClasses(false, null, undefined, "");
    expect(result).toBe("");
  });

  it("should handle mixed types correctly", () => {
    const isActive = true;
    const isDisabled = false;
    const result = combineClasses(
      "base",
      isActive && "active",
      isDisabled && "disabled",
      null,
      undefined,
      "final",
    );
    expect(result).toBe("base active final");
  });

  it("should work with ternary operators", () => {
    const variant = "primary";
    const size = "large";

    const result = combineClasses(
      "btn",
      variant === "primary" ? "btn-primary" : "btn-secondary",
      size === "large" ? "btn-lg" : "btn-sm",
    );
    expect(result).toBe("btn btn-primary btn-lg");
  });
});

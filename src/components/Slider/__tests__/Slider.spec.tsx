import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../Slider";
import { mockBoundingClientRect } from "../../testUtils/test_utils";

describe("Slider (SingleValueSlider)", () => {
  it("renders with default value", () => {
    render(<Slider defaultValue={30} />);
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-valuenow", "30");
  });

  it("calls onChange when value changes (uncontrolled)", () => {
    const handleChange = jest.fn();
    render(<Slider defaultValue={20} onChange={handleChange} />);
    const thumb = screen.getByRole("slider");

    fireEvent.keyDown(thumb, { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith(21);
  });

  it("works in controlled mode", () => {
    const handleChange = jest.fn();
    render(<Slider value={50} onChange={handleChange} />);
    const thumb = screen.getByRole("slider");

    fireEvent.keyDown(thumb, { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith(51);
    expect(thumb).toHaveAttribute("aria-valuenow", "50");
  });

  it("increments/decrements with arrow keys", () => {
    render(<Slider defaultValue={10} />);
    const thumb = screen.getByRole("slider");

    fireEvent.keyDown(thumb, { key: "ArrowUp" });
    expect(thumb).toHaveAttribute("aria-valuenow", "11");

    fireEvent.keyDown(thumb, { key: "ArrowDown" });
    expect(thumb).toHaveAttribute("aria-valuenow", "10");
  });

  it("jumps to min/max with Home/End keys", () => {
    render(<Slider defaultValue={30} min={0} max={100} />);
    const thumb = screen.getByRole("slider");

    fireEvent.keyDown(thumb, { key: "End" });
    expect(thumb).toHaveAttribute("aria-valuenow", "100");

    fireEvent.keyDown(thumb, { key: "Home" });
    expect(thumb).toHaveAttribute("aria-valuenow", "0");
  });

  it("ignores input when disabled", () => {
    const handleChange = jest.fn();
    render(<Slider defaultValue={40} disabled onChange={handleChange} />);
    const thumb = screen.getByRole("slider");

    fireEvent.keyDown(thumb, { key: "ArrowRight" });
    expect(thumb).toHaveAttribute("aria-valuenow", "40");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("updates value when clicked on track", () => {
    render(<Slider defaultValue={0} />);
    const slider = screen.getByRole("slider").parentElement!;

    mockBoundingClientRect(slider, { left: 0, width: 100 });

    fireEvent.mouseDown(slider, { clientX: 50 }); // middle of track
    const thumb = screen.getByRole("slider");
    expect(Number(thumb.getAttribute("aria-valuenow"))).toBeGreaterThan(40);
  });
});

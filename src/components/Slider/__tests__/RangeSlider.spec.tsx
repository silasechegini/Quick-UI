import { render, screen, fireEvent } from "@testing-library/react";
import RangeSlider from "../RangeSlider";
import { mockBoundingClientRect } from "../../testUtils/test_utils";

describe("RangeSlider (dual-thumb)", () => {
  it("renders with default values", () => {
    render(<RangeSlider defaultValue={[10, 90]} />);
    const thumbs = screen.getAllByRole("slider");
    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "10");
    expect(thumbs[1]).toHaveAttribute("aria-valuenow", "90");
  });

  it("calls onChange when values change (uncontrolled)", () => {
    const handleChange = jest.fn();
    render(<RangeSlider defaultValue={[20, 40]} onChange={handleChange} />);
    const thumbs = screen.getAllByRole("slider");

    fireEvent.keyDown(thumbs[0], { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith([21, 40]);

    fireEvent.keyDown(thumbs[1], { key: "ArrowLeft" });
    expect(handleChange).toHaveBeenCalledWith([21, 39]);
  });

  it("works in controlled mode", () => {
    const handleChange = jest.fn();
    render(<RangeSlider value={[30, 60]} onChange={handleChange} />);
    const thumbs = screen.getAllByRole("slider");

    fireEvent.keyDown(thumbs[0], { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith([31, 60]);
    // Value does not update internally in controlled mode
    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "30");
  });

  it("prevents low thumb from crossing high thumb", () => {
    render(<RangeSlider defaultValue={[40, 50]} />);
    const thumbs = screen.getAllByRole("slider");

    fireEvent.keyDown(thumbs[0], { key: "ArrowRight" }); // try to move low beyond high
    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "50");
    expect(thumbs[1]).toHaveAttribute("aria-valuenow", "50");
  });

  it("prevents high thumb from crossing low thumb", () => {
    render(<RangeSlider defaultValue={[40, 41]} />);
    const thumbs = screen.getAllByRole("slider");

    fireEvent.keyDown(thumbs[1], { key: "ArrowLeft" }); // try to move high below low
    expect(thumbs[1]).toHaveAttribute("aria-valuenow", "40");
    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "40");
  });

  it("moves thumbs when clicking on track (closer thumb moves)", () => {
    render(<RangeSlider defaultValue={[20, 80]} />);
    const slider = screen.getAllByRole("slider")[0].parentElement!;

    mockBoundingClientRect(slider, { left: 0, width: 100 });

    fireEvent.mouseDown(slider, { clientX: 10 }); // closer to low thumb
    const thumbs = screen.getAllByRole("slider");
    expect(Number(thumbs[0].getAttribute("aria-valuenow"))).toBeLessThan(20);

    fireEvent.mouseDown(slider, { clientX: 90 }); // closer to high thumb
    expect(Number(thumbs[1].getAttribute("aria-valuenow"))).toBeGreaterThan(80);
  });

  it("ignores input when disabled", () => {
    const handleChange = jest.fn();
    render(
      <RangeSlider defaultValue={[25, 75]} disabled onChange={handleChange} />,
    );
    const thumbs = screen.getAllByRole("slider");

    fireEvent.keyDown(thumbs[0], { key: "ArrowRight" });
    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "25");
    expect(handleChange).not.toHaveBeenCalled();
  });
});

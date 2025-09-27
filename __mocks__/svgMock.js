const React = require("react");

const SvgMock = React.forwardRef((props, ref) => {
  return React.createElement("svg", {
    ...props,
    ref,
    "data-testid": props["data-testid"] || "mock-svg",
  });
});

SvgMock.displayName = "SvgMock";

// For ReactComponent imports
module.exports = {
  ReactComponent: SvgMock,
  default: SvgMock,
};

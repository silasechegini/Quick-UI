module.exports = new Proxy(
  {},
  {
    get: function (target, name) {
      if (name === "__esModule") return false;
      if (name === "default")
        return new Proxy(
          {},
          {
            get: function (target, name) {
              return `_${String(name)}_ee88d4`;
            },
          },
        );
      return `_${String(name)}_ee88d4`;
    },
  },
);

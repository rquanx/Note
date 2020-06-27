const path = require("path");
module.exports = {
  entry: { e1: ["src/test.js", "src/entry.js"], e2: "src/s2/entry2.js" },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    library: "Test"
  }
};

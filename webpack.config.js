const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "static/js"),
    filename: "main.bundle.js"
  },
  devtool: "inline-source-map"
};

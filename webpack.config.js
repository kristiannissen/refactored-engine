const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    serviceworker: "./src/serviceworker.js"
  },
  output: {
    path: path.resolve(__dirname, "static/js"),
    filename: "[name].js"
  },
  devtool: "inline-source-map"
};

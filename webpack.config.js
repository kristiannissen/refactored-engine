const path = require("path");

module.exports = {
  entry: {
    app_index: "./src/app-index.js",
    app_list: "./src/app-list.js",
    serviceworker: "./src/serviceworker.js"
  },
  output: {
    path: path.resolve(__dirname, "static/js"),
    filename: "[name].js"
  },
  devtool: "inline-source-map"
};

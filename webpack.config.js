const path = require("path");

module.exports = {
  entry: {
    app_main: "./src/app-main.js",
    serviceworker: "./src/serviceworker.js"
  },
  output: {
    path: path.resolve(__dirname, "static/js"),
    filename: "[name].bundle.js",
    /* chunkFilename: "[name].bundle.js",*/
    publicPath: "/static/js/"
  },
  devtool: "inline-source-map"
};

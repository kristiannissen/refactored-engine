const path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'main.bundle.js'
  },
  devtool: 'inline-source-map'
};
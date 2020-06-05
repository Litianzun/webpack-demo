const common = require("./webpack.common");
const merge = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  mode: "development",
  devServer: {
    contentBase: "../dist",
    port: 1234,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  performance: {
    hints: 'warning'
  }
});

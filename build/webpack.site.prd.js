const path = require("path");
const merge = require("webpack-merge");
const config = require("./webpack.site.dev");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(config, {
  mode: "production",
  output: {
    path: path.join(__dirname, "../docs/dist"),
    publicPath: "./",
    filename: "[name].[hash:8].js",
    chunkFilename: "async_[name].[chunkhash:8].js"
  },
  plugins: [new CleanWebpackPlugin()]
});

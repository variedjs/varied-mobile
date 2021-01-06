const path = require("path");
const merge = require("webpack-merge");
const config = require("./webpack.base");
const os = require("os");
const HtmlWebpackPlugin = require("html-webpack-plugin");
function getIPAddress() {
  let interfaces = os.networkInterfaces();
  let host = null;
  Object.values(interfaces).forEach(value => {
    for (let i = 0; i < value.length; i++) {
      let alias = value[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        host = alias.address;
      }
    }
  });
  return host;
}

module.exports = merge(config, {
  entry: {
    "varied-docs": "./docs/site/desktop/main.js",
    "varied-mobile": "./docs/site/mobile/main.js"
  },
  devServer: {
    open: false,
    progress: true,
    host: getIPAddress(),
    port: "8888",
    stats: "errors-only",
    disableHostCheck: true
  },
  output: {
    path: path.join(__dirname, "../docs/dist"),
    publicPath: "/",
    chunkFilename: "async_[name].js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunks: {
          chunks: "all",
          minChunks: 2,
          minSize: 0,
          name: "chunks"
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["chunks", "varied-docs"],
      template: path.join(__dirname, "../docs/site/desktop/index.html"),
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["chunks", "varied-mobile"],
      template: path.join(__dirname, "../docs/site/mobile/index.html"),
      filename: "mobile.html"
    })
  ]
});

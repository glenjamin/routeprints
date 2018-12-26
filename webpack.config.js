const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const path = p => require("path").resolve(__dirname, p);

const prod = process.env.NODE_ENV == "production";

const outputDir = "";

const stats = {
  cachedAssets: false,
  children: false,
  chunks: false,
  modules: false
};

module.exports = {
  mode: prod ? "production" : "development",
  devtool: prod ? "source-map" : "cheap-module-eval-source-map",
  context: __dirname,
  entry: { app: ["./client/index.tsx"] },
  output: {
    path: outputDir,
    filename: prod ? "[name].[contenthash].js" : "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path("./client"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path("client/index.html")
    }),
    new CleanWebpackPlugin([outputDir])
  ],
  optimization: {
    splitChunks: { chunks: "all" },
    runtimeChunk: "single"
  },
  stats,
  devServer: {
    stats,
    overlay: true
  }
};

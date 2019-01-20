const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = p => require("path").resolve(__dirname, p);

const prod = process.env.NODE_ENV == "production";

const outputDir = path("./dist");

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
      },
      {
        test: /\.scss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([outputDir]),
    new HtmlWebpackPlugin({
      template: path("client/index.html")
    }),
    new MiniCssExtractPlugin(),
    prod &&
      new webpack.NormalModuleReplacementPlugin(
        /ErrorBoundary$/,
        require.resolve("./client/components/ErrorBoundary.production.tsx")
      )
  ].filter(Boolean),
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

import webpack from "webpack";

import CleanWebpackPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

import { Express } from "express";

const path = (p: string) => require("path").resolve(__dirname, "..", p);

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
  entry: { app: [path("client/index.tsx")] },
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
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([outputDir], {
      root: path(".")
    }),
    new HtmlWebpackPlugin({
      template: path("client/index.html")
    })
  ],
  optimization: {
    splitChunks: { chunks: "all" },
    runtimeChunk: "single"
  },
  stats,
  devServer: {
    stats,
    overlay: true,
    before: (app: Express) => {
      // Late bind the reference to the module
      app.use((...args) => require(path("./server/app")).default(...args));
      // So we can hack in auto reloading
      require("./utils/watch-module-cache").default(path("./server"));
    }
  },
  performance: {
    maxEntrypointSize: 1e6 // 1MB
  }
};

if (prod) {
  module.exports.plugins.push(
    new MiniCssExtractPlugin({
      filename: prod ? "[name].[contenthash].css" : "[name].css"
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /ErrorBoundary$/,
      require.resolve("../client/components/ErrorBoundary.production.tsx")
    )
  );
}

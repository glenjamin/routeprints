const path = p => require("path").resolve(__dirname, p);

const prod = process.env.NODE_ENV == "production";

module.exports = {
  mode: prod ? "production" : "development",
  context: __dirname,
  entry: ["./client/index.tsx"],
  output: {
    path: path("./dist"),
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
        loader: "babel-loader"
      }
    ]
  },
  plugins: []
};

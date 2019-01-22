require("@babel/register")({
  only: [/\.ts$/],
  extensions: [".ts"],
  cache: true
});

module.exports = require("./server/webpack.config");

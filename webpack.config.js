require("@babel/register")({
  only: [/\.ts$/],
  extensions: [".ts"]
});

module.exports = require("./server/webpack.config");

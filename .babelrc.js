module.exports = {
  presets: [
    "@babel/react",
    ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
    ["@babel/env", { modules: false }]
  ]
};

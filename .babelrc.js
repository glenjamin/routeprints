module.exports = {
  presets: [
    "@babel/preset-react",
    ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
    ["@babel/preset-env", { modules: false }]
  ]
};

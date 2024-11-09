const config = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: { version: "3.39", proposals: true }
      }
    ],
    "@babel/preset-typescript"
  ]
}

module.exports = config

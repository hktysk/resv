module.exports = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  entry: {
    "assets/js/build/main.js": "./assets/js/src/main.ts",
    "lib/index.js" : "./lib/index.ts"
  },
  output: {
    path: __dirname,
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  }
}

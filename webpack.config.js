module.exports = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  entry: {
    "assets/js/build/main.js": "./assets/js/src/main.ts",
    "bin/index.js" : "./bin/index.ts"
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

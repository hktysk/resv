module.exports = {
  mode: "development",
  entry: "./assets/js/src/main.ts",
  output: {
    path: `${__dirname }/assets/js/build`,
    filename: "main.js"
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
    extensions: [".ts"]
  }
}

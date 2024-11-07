const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  name: "app-router-implement",

  mode: "development", // or production

  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./src/app.js"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),
  ],
};

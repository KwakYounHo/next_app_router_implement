const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  name: "app-router-implement",

  mode: "development", // or production

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  entry: {
    app: ["./src/app.tsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
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

  devServer: {
    port: 3333,
    compress: true,
    open: true,
  },
};

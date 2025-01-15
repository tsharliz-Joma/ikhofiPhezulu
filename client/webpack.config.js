// File: webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const envFileName = `.env.${isProduction ? "production" : "development"}`;

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      clean: true, // Cleans the output directory before every build
    },
    resolve: {
      extensions: [".js", ".jsx"], // Support JSX and JS files
      fallback: {
        vm: require.resolve("vm-browserify"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
      }),
      new Dotenv({
        path: path.resolve(__dirname, envFileName), // Loads environment-specific .env file
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, "public"),
      },
      historyApiFallback: true, // Support React Router
      open: true,
      hot: true,
      port: 3000,
    },
    devtool: isProduction ? "source-map" : "eval-source-map", // Source maps for development
  };
};

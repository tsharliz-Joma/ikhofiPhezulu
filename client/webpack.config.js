// File: webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const envFileName = `.env.${isProduction ? "production" : "development"}`;

  const plugins = [
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new Dotenv({
      path: path.resolve(__dirname, envFileName), // Loads environment-specific .env file
    }),
    new CopyPlugin({
      patterns: [{from: "public/404.html", to: "404.html"}],
    }),
  ];

  if (!isProduction) {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.[contenthash].js",
      clean: true, // Cleans the output directory before every build
    },
    resolve: {
      extensions: [".js", ".jsx"], // Support JSX and JS files
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      fallback: {
        vm: require.resolve("vm-browserify"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
        buffer: require.resolve("buffer/"),
        process: require.resolve("process/browser.js"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(mp4|webm|ogg)$/,
          type: "asset/resource",
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: isProduction ? [] : ["react-refresh/babel"],
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
    plugins: plugins,

    devServer: {
      static: {
        directory: path.resolve(__dirname, "build"),
      },
      historyApiFallback: true, // Support React Router
      open: true,
      hot: true,
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:1969",
          changeOrigin: true,
        },
      },
    },
    devtool: isProduction ? "source-map" : "eval-source-map", // Source maps for development
  };
};

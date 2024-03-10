const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  devServer: {
    host: "localhost",
    open: true,
  },
  entry: "./src/obelisk.ts",
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        exclude: ["/node_modules/"],
        loader: "ts-loader",
        test: /\.(ts|tsx)$/i,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  output: {
    library: {
      type: "module",
    },
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }

  return config;
};

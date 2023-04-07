import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const env = {
  entry: "./src/index.js",
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    library: {
      type: "module",
    },
    globalObject: "this",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

export default env;

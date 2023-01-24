const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

const { override, addLessLoader } = require("customize-cra");

const customize = () => (config) => {
  if (config.mode === "production") {
    // IE support
    config.entry = [
      "core-js/modules/es.promise",
      path.resolve(__dirname, "src/index.js"),
    ];
    config.output.publicPath = "";
    // remove licence.txt
    config.optimization.minimizer = [
      new TerserPlugin({
        extractComments: false,
      }),
    ];
  }
  return config;
};

module.exports = override(addLessLoader(), customize());

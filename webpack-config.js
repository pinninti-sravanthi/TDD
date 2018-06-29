const fs = require('fs')
const path = require("path");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

/**
 * Output directory.
 */
const OUTPUT_DIRECTORY = "out";
const entriesPath = './src';
const regex = /.*\.[t|j]sx?$/;

let browserConfig = {
  mode : 'development',
  target: 'web',
  externals: [nodeExternals({
    modulesFromFile: true,
    whitelist: ['jquery']
  })],
  entry: {},
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].map",
    publicPath: "/",
    path: path.resolve(__dirname, OUTPUT_DIRECTORY)
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['env', {
                    "targets": {
                      "chrome": 52,
                      "browsers": ["last 2 versions", "safari 7"]
                    },
                    "modules": false,
                    "useBuiltIns": true,
                    "loose": true,
                    "debug": false
                  }]],
                  plugins: [require('babel-plugin-transform-object-rest-spread')]
              }
            }
        }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".ts", ".tsx"]
  },
  plugins: [
    new HardSourceWebpackPlugin({}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    })
  ],
  devtool: false
};

const readDirRecursiveSync = (folder, filter) => {
    const currentPath = fs.readdirSync(folder).map(f => path.join(folder, f))
    const files = currentPath.filter(filter)

    const directories = currentPath
        .filter(f => fs.statSync(f).isDirectory())
        .map(f => readDirRecursiveSync(f, filter))
        .reduce((cur, next) => [...cur, ...next], [])

    const output = [...files, ...directories];
    return output;
}

const getEntries = (folder, regex) =>
    readDirRecursiveSync(folder, f => f.match(regex))
    .map((file) => {
        return {
            name: path.basename(file, path.extname(file)),
            path: path.resolve(file)
        }
    })
    .reduce((memo, file) => {
        memo[file.name] = file.path
        return memo
    }, {})

const getWebpackConfig = ( outputDirectory, entriesPath, regex ) => {
    return [
        Object.assign({}, browserConfig, {
            entry: getEntries(entriesPath, regex)
        }),
    ].map(s => {
        // s.vendor = ['jquery'];
        s.output.path = path.resolve(__dirname, outputDirectory)
        return s
    });
}

module.exports = getWebpackConfig(OUTPUT_DIRECTORY, entriesPath, regex);

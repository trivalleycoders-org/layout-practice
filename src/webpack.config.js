// Initialization
const webpack = require('webpack');

// File ops
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Folder ops
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

// PostCSS support
const postcssImport = require('postcss-easy-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

// Constants
const APP = path.join(__dirname, 'app');
const BUILD = path.join(__dirname, 'build');
const STYLE = path.join(__dirname, 'app/styles/style.css');
const PUBLIC = path.join(__dirname, 'app/public');
const TEMPLATE = path.join(__dirname, 'app/templates/index.html');
const TEMPLATE_PATH = path.join(__dirname, 'app/templates');
const NODE_MODULES = path.join(__dirname, 'node_modules');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

const entry = {
  app: APP,
  style: STYLE,
};

const output = {
  path: BUILD,
  filename: '[name].js',
  publicPath: '/'
};

const resolve = {
  extensions: ['', '.js', '.jsx', '.css']
};

const jsxLoader = {
  test: /\.jsx?$/,
  loaders: ['babel?cacheDirectory'],
  include: APP
};

const cssLoader = {
  test: /\.css$/,
  loaders: ['style', 'css', 'postcss'],
  include: [APP, NODE_MODULES]
};

const jsonLoader = {
  test: /\.json$/,
  loader: 'json',
  include: [APP, NODE_MODULES]
};

const rawLoader = {
  test: /\.html$/,
  loader: 'raw-loader',
  include: TEMPLATE_PATH,
}

const postcss = function processPostcss(webpack) {  // eslint-disable-line no-shadow
  return [
    postcssImport({
      addDependencyTo: webpack
    }),
    precss,
    autoprefixer({ browsers: ['last 2 versions'] })
  ];
};

const devServer = {
  historyApiFallback: true,
  hot: true,
  progress: true,

  stats: 'errors-only',

  host: HOST,
  port: PORT,

  // CopyWebpackPlugin: This is required for webpack-dev-server.
  // The path should be an absolute path to your build destination.
  outputPath: BUILD
};

const plugins = [
  // Required to inject NODE_ENV within React app.
  // Reduntant package.json script entry does not do that, but required for .babelrc
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development') // eslint-disable-line quote-props
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new CopyWebpackPlugin([
    { from: PUBLIC, to: BUILD }
  ],
    {
      ignore: [
        // Doesn't copy Mac storage system files
        '.DS_Store'
      ]
    }
  ),
  new HtmlWebpackPlugin({
    template: TEMPLATE,
    // JS placed at the bottom of the body element
    inject: 'body'
  })
]

module.exports = {
  devtool: 'source-map',
  entry,
  output,
  resolve,
  postcss,
  devServer,
  plugins,
  module: { loaders: [
    jsxLoader,
    cssLoader,
    jsonLoader,
    rawLoader,
  ] }
};

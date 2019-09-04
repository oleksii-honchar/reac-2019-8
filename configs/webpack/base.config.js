const path = require('path');
const webpack = require('webpack');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

console.log('[config:webpack:snippet] Base loaded');

const pkg = require('../../package.json');

module.exports = (env) => ({
  cache: true,
  devServer: {
    // http2: true,
    port: process.env.SERVE_PORT,
    contentBase: path.join(__dirname, '../../dist'),
    publicPath: '/assets/',
    writeToDisk: true,
  },
  entry: {
    bundle: './src/index.tsx',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.html', '.ts', '.tsx'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: './assets/',
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      'PKG_NAME': JSON.stringify(pkg.name),
      'PKG_VERSION': JSON.stringify(pkg.version),
    }),
    new LoaderOptionsPlugin({
      debug: process.env.NODE_ENV !== 'production',
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: '.',
      ignore: [ '*.hbs' ],
    }]),
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
  node: false,
});

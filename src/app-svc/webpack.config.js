const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Short usage reference
// `NODE_ENV` = development | test | production
// `LOG_LEVEL` = error | warn | info | debug

const baseCfg = {
  target: 'node',
  cache: true,
  resolve: {
    extensions: ['.js'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  output: {
    path: path.join(__dirname, '../../dist/app-svc'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /\.(spec|e2e)\.js$/,
          /node_modules/,
        ],
      },
    ],
    noParse: [
      /\.(spec|e2e)\.js$/,
      /LICENSE/,
      /README.md/,
    ],
  },
  entry: {
    bundle: './src/index.js',
  },
  plugins: [
    new LoaderOptionsPlugin({
      debug: true,
    }),
    new CopyWebpackPlugin([{
      from: './src/libs/views', to: '../../dist/app-svc/libs/views',
    }]),
    // new BundleAnalyzerPlugin(),
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    setImmediate: false,
    __dirname: false,
    __filename: false,
  },
}

console.log('Building app-svc bundle...')
console.log(`[${process.env.NODE_ENV}] config used...`)

let finalCfg
if (process.env.NODE_ENV === 'production') {
  // minification not used because it does not work (
  finalCfg = baseCfg
} else {
  finalCfg = webpackMerge(baseCfg, {
    devtool: 'inline-source-map',
  })
}

module.exports = finalCfg

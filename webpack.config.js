const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Short usage reference
// `NODE_ENV` = development | test | production
// `LOG_LEVEL` = error | warn | info | debug

const $pkg = require('./package.json');

function getBase64Package () {
  return JSON.stringify(Buffer.from(JSON.stringify({
    name: $pkg.name,
    version: $pkg.version,
  })).toString('base64'));
}

const baseCfg = {
  cache: true,
  devServer: {
    http2: true,
    port: process.env.SERVE_PORT,
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/assets/',
    writeToDisk: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.html'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: './assets/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'source-map-loader',
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: [
          /\.(spec|e2e)\.js$/,
          /node_modules/,
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
      {
        test: /\.(jpe?g|png|svg|gif|cur)$/,
        exclude: /icons/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        },
      },
      {
        test: /\.svg/,
        include: /icons/,
        use: [{
          loader: 'svg-inline-loader',
          options: {
            removeSVGTagAttrs: false,
          },
        }],
      },
      {
        test: /\.css$/,
        include: /src\/assets/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /src\/assets/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
    noParse: [
      /\.(spec|e2e)\.jsx?$/,
      /LICENSE/,
      /README.md/,
    ],
  },
  entry: {
    bundle: './src/index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      PKG: getBase64Package(),
    }),
    new LoaderOptionsPlugin({
      debug: process.env.NODE_ENV !== 'production',
    }),
    new CopyWebpackPlugin([{
      from: './src/assets', to: '.'
    }]),
    // new BundleAnalyzerPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
  node: false,
};

console.log(`Building app [${$pkg.name}] bundle...`);
console.log(`[${process.env.NODE_ENV}] config used...`);

let finalCfg;
if (process.env.NODE_ENV === 'production') {
  finalCfg = webpackMerge(baseCfg, {
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.jsx?$|\.css$|\.html$/,
          exclude: [
            /\.(spec|e2e)\.js$/,
            /node_modules/,
          ],
          parallel: true,
        }),
      ],
    },
    plugins: [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.jsx?$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0,
      }),
    ],
  });
} else {
  finalCfg = webpackMerge(baseCfg, {
    devtool: 'inline-source-map',
  });
}

module.exports = finalCfg;

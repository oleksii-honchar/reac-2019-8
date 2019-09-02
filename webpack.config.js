const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// Short usage reference
// `NODE_ENV` = development | test | production
// `LOG_LEVEL` = error | warn | info | debug

const pkg = require('./package.json');

console.log('[config:webpack] config loaded');

const baseCfg = {
  cache: true,
  devServer: {
    // http2: true,
    port: process.env.SERVE_PORT,
    contentBase: path.join(__dirname, '../dist'),
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
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: './assets/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.[tj]sx?$/,
        use: 'source-map-loader',
      },
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.join(__dirname, './babel.config.js')
          },
        },
        exclude: [
          /\.(spec|e2e)\.[tj]sx?$/,
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
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  'postcss-preset-env': {},
                  'cssnano': {},
                  'env': process.env.NODE_ENV,
                },
                path: './config/postcss.config.js',
              },
            },
          },
        ],
      },
    ],
    noParse: [
      /\.(spec|e2e)\.jsx?$/,
      /LICENSE/,
      /README.md/,
    ],
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
      from: './src/assets', to: '.',
    }]),
    // new BundleAnalyzerPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
  node: false,
};

console.log(`[config:webpack] Building app [${pkg.name}] bundle...`);
console.log(`[config:webpack] "${process.env.NODE_ENV}" config used...`);

let finalCfg;
if (process.env.NODE_ENV === 'production') {
  finalCfg = webpackMerge(baseCfg, {
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.[tj]sx?$|\.css$|\.html$/,
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
        test: /\.[tj]sx?$|\.css$|\.html$/,
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

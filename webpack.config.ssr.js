const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const WebpackShellPlugin = require('./src/libs/WebpackShellPlugin');
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
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.html'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  output: {
    path: path.join(__dirname, '../../dist/static'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    library: '[name]',
    libraryTarget: 'umd',
    publicPath: './static/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
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
    'bundle.ssr': ['@babel/polyfill', './src/index.ssr.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      PKG: getBase64Package(),
    }),
    new LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  node: {
    fs: 'empty',
    __dirname: false,
    __filename: false,
    global: true,
    crypto: 'empty',
    process: true,
    console: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
  },
  optimization: {
    nodeEnv: false,
  },
};

console.log(`[${process.env.NODE_ENV}] config used...`);

let finalCfg = baseCfg;

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
    plugins: [
      new WebpackShellPlugin({
        onBuildStart: [`echo "Building app [${$pkg.name}] SSR bundle..."`],
        onBuildEnd: [
          'sleep 3s && echo "touching api-gw to restart..." && touch ../api-gw/src/index.js',
        ],
      }),
    ],
  });
}


module.exports = finalCfg;

const path = require('path');

console.log('[config:webpack:snippet] Module loaded');

module.exports = {
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
            configFile: path.join(__dirname, '../babel.config.js')
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
                path: path.join(__dirname, '../postcss.config.js'),
              },
            },
          },
        ],
      }
    ],
    noParse: [
      /\.(spec|e2e)\.jsx?$/,
      /LICENSE/,
      /README.md/,
    ],
  }
};

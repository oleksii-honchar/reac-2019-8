const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const webpackMerge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// Short usage reference
// `NODE_ENV` = development | test | production
// `LOG_LEVEL` = error | warn | info | debug

const pkg = require('../package.json');

const reactCfg = require('./webpack/react.config');
const moduleCfg = require('./webpack/module.config');
const baseCfg = require('./webpack/base.config')
const prodCfg = require('./webpack/prod.config')

console.log(`[config:webpack] "${pkg.name}"config composition started`);

function generateIndexHtml (env) {
  const data = {
    NODE_ENV: process.env.NODE_ENV
  };

  const tmplPath = path.join(__dirname, '../src/assets/index.hbs');
  const source = fs.readFileSync(tmplPath, 'utf-8');

  const tmpl = hbs.compile(source);
  const html = tmpl(data);

  const destPath = path.join(__dirname, '../dist/');
  try {
    fs.mkdirSync(destPath, { recursive:true });
  } catch (e) {
    console.error(e);
  }
  fs.writeFileSync(destPath + 'index.html', html, 'utf8');
}

module.exports = (env) => {
  env = env ? env : {};
  env.BUILD_ANALYZE = env.BUILD_ANALYZE ? env.BUILD_ANALYZE : null;

  console.log(`[config:webpack] "${process.env.NODE_ENV}" mode used...`);

  generateIndexHtml(env);

  let cfg = baseCfg(env);

  cfg = webpackMerge(cfg, moduleCfg);
  cfg = webpackMerge(cfg, reactCfg);

  if (env.BUILD_ANALYZE === 'true') {
    console.log('[config:webpack] bundle analyzer included')

    cfg = webpackMerge(cfg, {
      plugins: [ new BundleAnalyzerPlugin() ]
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    cfg = webpackMerge(cfg, {
      devtool: 'inline-source-map',
    });

    console.log('[config:webpack] config composition completed');

    return cfg;
  }

  cfg = webpackMerge(cfg, prodCfg);

  console.log('[config:webpack] config composition completed');
  return cfg;
}

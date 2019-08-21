module.exports = {
  'extends': [
    'airbnb-base'
  ],
  'rules': {
    'semi': [
      'error',
      'never'
    ],
    'space-before-function-paren': [
      'error',
      'always'
    ],
    'import/prefer-default-export': 'off',
  },
  'env': {
    'node': true,
    'es6': true
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'codeFrame': false,
    'ecmaFeatures': {
      'modules': true,
      'experimentalObjectRestSpread': true
    }
  },
  'plugins': [
    'babel'
  ],
  'settings': {
    'import/resolver': {
      'babel-module': {}
    }
  }
}

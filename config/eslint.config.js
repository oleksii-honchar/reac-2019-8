const path = require('path');
console.log(__dirname)
module.exports = {
  'extends': [
    'airbnb-base'
  ],
  'rules': {
    'space-before-function-paren': [
      'error',
      'always',
    ],
    'class-methods-use-this': ['error', {
      'exceptMethods': [
        'render',
      ],
    }],
    'function-paren-newline': [
      'error',
      'consistent'
    ],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'React'
      }
    ],
    'import/prefer-default-export': 'off',
    'max-len': [
      'error',
      {
        'code': 90,
        'tabWidth': 2,
        'ignoreComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true
      }
    ],
    'react/jsx-no-bind': [2, { 'ignoreRefs': true }],
    'react/jsx-no-duplicate-props': 2,
    'react/self-closing-comp': 2,
    'react/prefer-es6-class': 2,
    'react/no-string-refs': 2,
    'react/require-render-return': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    'react/jsx-no-comment-textnodes': 2,
    'react/jsx-curly-spacing': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'jest/no-disabled-tests': 1,
    'jest/no-focused-tests': 1,
    'jest/no-identical-title': 2,
  },
  'settings': {
    'import/resolver': {
      'babel-module': {}
    },
    'react': {
      'pragma': 'h',
      'version': 'detect'
    },
  },
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
  },
  'globals': {
    'PKG': true,
    'beforeEach': true,
    'afterEach': true,
    'describe': true,
    'it': true,
    'expect': true,
  },
  'plugins': [
    'babel',
    'react',
    'jest',
    'json',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'allowImportExportEverywhere': false,
    'codeFrame': false,
    'ecmaFeatures': {
      'modules': true,
      'jsx': true,
      'experimentalObjectRestSpread': true,
    },
    'babelOptions': {
      'root': __dirname,
      'rootMode': 'upward-optional',
      // 'configFile': path.join(__dirname, './babel.config.js')
    }
  },
};

module.exports = {
  'extends': [
    'airbnb-base',
    'prettier/react'
  ],
  'rules': {
    'prettier/prettier': 'error',
    'space-before-function-paren': [
      'error',
      'always',
    ],
    'class-methods-use-this': ['error', {
      'exceptMethods': [
        'render',
      ],
    }],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'React'
      }
    ],
    'import/prefer-default-export': 'off',
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
      'babel-module': {},
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
  'parser': 'babel-eslint',
  'plugins': [
    'babel',
    'prettier',
    'react',
    'jest',
    'json',
  ],
  'parserOptions': {
    'sourceType': 'module',
    'allowImportExportEverywhere': false,
    'codeFrame': false,
    'ecmaFeatures': {
      'modules': true,
      'jsx': true,
      'experimentalObjectRestSpread': true,
    },
  },
};

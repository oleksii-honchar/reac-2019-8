console.log('[config:jest] config loaded')

module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  collectCoverage: true,
  coverageReporters: [
    'json',
    'lcov',
    'text',
  ],
  collectCoverageFrom: [
    '**/src/**/*.js?(x)',
    '!**/node_modules/**',
  ],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|png|ttf)$': '<rootDir>/src/tests/mocks/emptyModule.js',
  },
};

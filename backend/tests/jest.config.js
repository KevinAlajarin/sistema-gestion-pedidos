module.exports = {
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/services/**/*.js',
    '!src/services/BaseService.js' 
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ]
};
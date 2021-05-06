module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  plugins: ['mocha'],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false }]
  }
}

module.exports = {
  parser: 'babel-eslint',

  globals: {
    fetch: false,
  },

  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',

  },
};

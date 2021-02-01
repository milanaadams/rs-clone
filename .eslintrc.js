module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",

  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
  'linebreak-style': ['error', 'windows'],
  'max-len': ["error", { "code": 140 }]
  }
};

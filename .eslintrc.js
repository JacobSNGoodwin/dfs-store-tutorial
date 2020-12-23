module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: 2020,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/vue",
  ],
  rules: {
    "prettier/prettier": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { args: "all", argsIgnorePattern: "^_" },
    ],
  },
};

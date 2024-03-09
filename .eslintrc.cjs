const path = require("node:path");

const paddingLineBetweenStatements = [
  "error",
  { blankLine: "always", next: "return", prev: "*" },
]
  .concat(
    [
      "multiline-block-like",
      "multiline-expression",
      "multiline-const",
      "const",
      "type",
      "interface",
      "if",
    ]
      .map((item) => [
        { blankLine: "always", next: "*", prev: item },
        { blankLine: "always", next: item, prev: "*" },
      ])
      .flat(),
  )
  .concat([
    {
      blankLine: "any",
      next: ["singleline-const"],
      prev: ["singleline-const"],
    },
  ]);

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint", "@stylistic", "perfectionist", "import"],
  rules: {
    "@next/next/no-img-element": "off",

    "@stylistic/padding-line-between-statements": paddingLineBetweenStatements,

    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-var-requires": "off",

    "arrow-body-style": "error",
    "camelcase": "off",
    "global-require": "off",

    "import/no-duplicates": "error",

    "jsx-a11y/anchor-is-valid": "off",

    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-else-return": "error",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-useless-return": "error",
    "object-shorthand": "error",

    "perfectionist/sort-classes": "error",
    "perfectionist/sort-enums": "error",
    "perfectionist/sort-exports": "error",
    "perfectionist/sort-interfaces": "error",
    "perfectionist/sort-object-types": "error",
    "perfectionist/sort-objects": "error",
    "perfectionist/sort-union-types": "error",

    "prefer-const": "error",
    "prefer-destructuring": ["error"],
    "prefer-spread": "error",
    "prefer-template": "error",
    "quote-props": ["error", "consistent-as-needed"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

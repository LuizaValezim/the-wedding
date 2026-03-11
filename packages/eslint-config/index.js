module.exports = {
  extends: ["eslint:recommended", "prettier"],
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
  },
};

const { defineConfig } = require("eslint-define-config");

/*
 * TODO(code-quality):
 * Need to revisit this configuration if https://github.com/microsoft/TypeScript/issues/42357 is shipped in TypeScript
 */

module.exports = defineConfig({
  extends: ["plugin:functional/all"],
  overrides: [
    {
      extends: ["plugin:functional/off"],
      files: ["*.test.ts", "*.js", ...["figma-sync", "node-lib", "story-test"].map(name => `packages/${name}/src/**`)],
    },
  ],
  plugins: ["functional"],
  rules: {
    "functional/functional-parameters": "off",
    "functional/no-conditional-statements": "off",
    "functional/no-expression-statements": ["warn", { ignoreVoid: true }],
    "functional/no-return-void": "off",
    "functional/prefer-immutable-types": "off",
    "functional/type-declaration-immutability": "off",
  },
});

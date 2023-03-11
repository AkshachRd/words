const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: ["plugin:unicorn/all"],
  overrides: [
    {
      /*
       * TODO(code-quality):
       * Need to remove some ignores after https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1484 is resolved.
       */
      files: ["*.*.{js,ts,tsx}", "index.ts", "main.{ts,tsx}", "**/.storybook/**"],
      rules: {
        "unicorn/filename-case": "off",
      },
    },
    {
      files: ["*.js"],
      rules: {
        "unicorn/filename-case": ["error", { case: "kebabCase" }],
      },
    },
    {
      files: ["**/hooks/**.ts"],
      rules: {
        "unicorn/filename-case": ["error", { case: "camelCase" }],
      },
    },
  ],
  rules: {
    "unicorn/filename-case": ["error", { case: "pascalCase" }],
    "unicorn/no-keyword-prefix": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          Props: true,
          Ref: true,
          env: true,
          props: true,
          ref: true,
        },
      },
    ],
  },
});

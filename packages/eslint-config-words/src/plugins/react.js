const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: ["plugin:react/all", "plugin:react/jsx-runtime"],
  rules: {
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/jsx-max-depth": ["error", { max: 10 }],
    "react/jsx-no-literals": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-children-prop": "off",
    "react/no-unused-prop-types": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});

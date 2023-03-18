const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: ["plugin:@typescript-eslint/all"],
  overrides: [
    {
      files: ["*.test.ts"],
      rules: {
        "@typescript-eslint/no-magic-numbers": "off",
      },
    },
    {
      // See https://github.com/typescript-eslint/typescript-eslint/issues/2607 for more information.
      files: ["*.tsx", "**/context/**/*.ts"],
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          {
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "forbid",
            selector: "variable",
            trailingUnderscore: "forbid",
          },
        ],
      },
    },
    {
      files: ["*.stories.tsx"],
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          {
            format: ["PascalCase"],
            leadingUnderscore: "forbid",
            modifiers: ["exported"],
            selector: "variable",
            trailingUnderscore: "forbid",
          },
        ],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          "JSX.Element": {
            fixWith: "ReactElement",
            message: 'Prefer React "ReactNode" or "ReactElement"  type over "JSX.Element" type',
          },
          PropsWithChildren: {
            fixWith: "ChildrenProps",
            message: 'Prefer Words UI library "ChildrenProps" type over React "PropsWithChildren" type',
          },
          "React.FC":
            "Prefer regular function. See https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/",
          "React.FunctionComponent":
            "Prefer regular function. See https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/",
          Readonly:
            "We decided not to enforce immutable types and hope that TypeScript language immutability by default will be shipped some day: https://github.com/microsoft/TypeScript/issues/32758",
        },
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { fixStyle: "inline-type-imports", prefer: "type-imports" },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: {
          // Copied from default configuration https://typescript-eslint.io/rules/member-ordering/#default-configuration
          memberTypes: [
            // Index signature
            "signature",
            "call-signature",

            // Fields
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            "#private-static-field",

            "public-decorated-field",
            "protected-decorated-field",
            "private-decorated-field",

            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "#private-instance-field",

            "public-abstract-field",
            "protected-abstract-field",

            "public-field",
            "protected-field",
            "private-field",
            "#private-field",

            "static-field",
            "instance-field",
            "abstract-field",

            "decorated-field",

            "field",

            // Static initialization
            "static-initialization",

            // Constructors
            "public-constructor",
            "protected-constructor",
            "private-constructor",

            "constructor",

            // Getters
            "public-static-get",
            "protected-static-get",
            "private-static-get",
            "#private-static-get",

            "public-decorated-get",
            "protected-decorated-get",
            "private-decorated-get",

            "public-instance-get",
            "protected-instance-get",
            "private-instance-get",
            "#private-instance-get",

            "public-abstract-get",
            "protected-abstract-get",

            "public-get",
            "protected-get",
            "private-get",
            "#private-get",

            "static-get",
            "instance-get",
            "abstract-get",

            "decorated-get",

            "get",

            // Setters
            "public-static-set",
            "protected-static-set",
            "private-static-set",
            "#private-static-set",

            "public-decorated-set",
            "protected-decorated-set",
            "private-decorated-set",

            "public-instance-set",
            "protected-instance-set",
            "private-instance-set",
            "#private-instance-set",

            "public-abstract-set",
            "protected-abstract-set",

            "public-set",
            "protected-set",
            "private-set",
            "#private-set",

            "static-set",
            "instance-set",
            "abstract-set",

            "decorated-set",

            "set",

            // Methods
            "public-static-method",
            "protected-static-method",
            "private-static-method",
            "#private-static-method",

            "public-decorated-method",
            "protected-decorated-method",
            "private-decorated-method",

            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
            "#private-instance-method",

            "public-abstract-method",
            "protected-abstract-method",

            "public-method",
            "protected-method",
            "private-method",
            "#private-method",

            "static-method",
            "instance-method",
            "abstract-method",

            "decorated-method",

            "method",
          ],
          order: "alphabetically",
        },
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        format: ["camelCase"],
        leadingUnderscore: "forbid",
        selector: ["default"],
        trailingUnderscore: "forbid",
      },
      {
        format: [],
        leadingUnderscore: "allow",
        selector: ["objectLiteralProperty", "objectLiteralMethod"],
        trailingUnderscore: "allow",
      },
      {
        format: ["PascalCase"],
        leadingUnderscore: "forbid",
        selector: ["typeLike"],
        trailingUnderscore: "forbid",
      },
      // Ignore "lodash" variable:
      {
        filter: {
          match: true,
          regex: "^_$",
        },
        format: [],
        selector: "variable",
      },
    ],
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-magic-numbers": ["error", { ignore: [0, 1, 2, 4, 8, 16, 24, 32] }],
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/require-array-sort-compare": ["error", { ignoreStringArrays: true }],
  },
});

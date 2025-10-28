import nextPlugin from "eslint-config-next";
import prettierPlugin from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nextPlugin,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function"
        }
      ]
    }
  },
  prettierPlugin
];

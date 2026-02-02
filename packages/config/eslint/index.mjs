import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

/**
 * Shared ESLint configuration for all PixTools apps
 * @param {Object} options
 * @param {string[]} options.ignores - Additional paths to ignore
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
export function createEslintConfig(options = {}) {
  const { ignores = [] } = options;
  
  return tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      plugins: {
        react: reactPlugin,
        "react-hooks": reactHooksPlugin,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        // TypeScript
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        
        // React
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        
        // General
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "prefer-const": "error",
        "no-var": "error",
      },
    },
    {
      ignores: [
        "node_modules/**",
        ".next/**",
        "out/**",
        "dist/**",
        "*.config.js",
        "*.config.mjs",
        ...ignores,
      ],
    }
  );
}

// Default export for simple usage
export default createEslintConfig();

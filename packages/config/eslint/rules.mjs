/**
 * Shared ESLint rules for all PixTools apps
 * Import these into your app's eslint.config.mjs
 */
export const pixToolsRules = {
  // TypeScript
  "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  "@typescript-eslint/no-explicit-any": "warn",
  
  // React
  "react/self-closing-comp": "error",
  "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
  
  // General
  "no-console": ["warn", { allow: ["warn", "error"] }],
  "prefer-const": "error",
  "no-var": "error",
};

export const pixToolsIgnores = [
  ".next/**",
  "out/**",
  "build/**",
  "dist/**",
  "node_modules/**",
  "next-env.d.ts",
];

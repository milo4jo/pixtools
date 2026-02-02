import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import { pixToolsRules, pixToolsIgnores } from "@pixtools/config/eslint/rules";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  globalIgnores(pixToolsIgnores),
  {
    rules: pixToolsRules,
  },
]);

export default eslintConfig;

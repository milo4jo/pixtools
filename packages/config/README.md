# @pixtools/config

Shared configuration for all PixTools apps.

## Usage

### TypeScript

In your app's `tsconfig.json`:

```json
{
  "extends": "@pixtools/config/typescript/nextjs",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

### ESLint (Next.js Apps)

For Next.js apps, import shared rules and ignores:

```javascript
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
```

### ESLint (Non-Next.js)

For other packages:

```javascript
import { createEslintConfig } from "@pixtools/config/eslint";

export default createEslintConfig();
```

### PostCSS (Tailwind v4)

In your app's `postcss.config.mjs`:

```javascript
export { default } from "@pixtools/config/postcss";
```

### Tailwind CSS

Import the base styles in your `globals.css`:

```css
@import "@pixtools/config/tailwind/globals.css";

/* App-specific styles below */
```

Or copy and customize the base file for app-specific theming.

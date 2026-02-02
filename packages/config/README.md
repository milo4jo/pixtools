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

### ESLint

In your app's `eslint.config.mjs`:

```javascript
import { createEslintConfig } from "@pixtools/config/eslint";

export default createEslintConfig({
  ignores: ["some-specific-path/**"],
});
```

Or use the default:

```javascript
export { default } from "@pixtools/config/eslint";
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

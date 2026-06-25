# @my-org/ui-kit

A React 19 UI kit built with **Vite 8** (library mode), **Vanilla Extract**
(zero-runtime, typed CSS-in-TS) and **Radix UI** primitives. Components are
previewed with **Storybook**.

## Features

- ⚛️ React 19 + TypeScript, ships ESM + CJS + type declarations
- 🎨 Vanilla Extract design system — a fully typed token theme
  (colors, spacing, radius, font sizes/weights, shadows, z-index)
- 🧩 Radix-based components styled with Vanilla Extract `recipe()` (the typed
  replacement for `cva`), composed with `clsx`
- 📚 Storybook for interactive component docs
- ✅ ESLint flat config (typescript-eslint, react-hooks, jsx-a11y, storybook) + Prettier

## Install (in a consuming app)

```bash
yarn add @my-org/ui-kit react react-dom
```

Import the stylesheet once (e.g. in your root layout/entry):

```ts
import '@my-org/ui-kit/styles.css';
```

Then use components:

```tsx
import { Text } from '@my-org/ui-kit';

export function Example() {
  return (
    <>
      <Text variant="h1">Hello world</Text>
      <Text variant="muted">A typographic primitive.</Text>
      <Text variant="code">@my-org/ui-kit</Text>
    </>
  );
}
```

### Theming

The design system is the single source of truth for tokens, defined once in
`src/theme/tokens.css.ts`. Tokens are available two ways:

**1. Typed `vars` (inside `*.css.ts`, fully autocompleted):**

```ts
import { style } from '@vanilla-extract/css';
import { vars } from '@my-org/ui-kit';

export const card = style({
  backgroundColor: vars.color.card,
  color: vars.color.cardForeground,
  padding: vars.space.lg,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.sm,
});
```

**2. Plain CSS variables** — every token is emitted on `:root` with a stable,
human-readable name derived from its path (`--color-primary`, `--space-md`,
`--radius-sm`, …). Use them in any stylesheet, or override them to retheme:

```css
:root {
  --color-primary: oklch(0.55 0.2 250); /* rebrand the whole kit */
  --radius-md: 0.25rem;
}
```

Both stay in sync automatically — overriding a CSS variable also updates every
component that references it through `vars`.

## Components

### `Text`

Polymorphic typography primitive.

| Prop       | Type                                                                                          | Default | Description                                  |
| ---------- | --------------------------------------------------------------------------------------------- | ------- | -------------------------------------------- |
| `variant`  | `h1 \| h2 \| h3 \| h4 \| p \| lead \| large \| small \| muted \| blockquote \| code`          | `p`     | Visual style + default semantic HTML element |
| `weight`   | `normal \| medium \| semibold \| bold`                                                        | —       | Font weight override                         |
| `align`    | `left \| center \| right`                                                                     | —       | Text alignment                               |
| `truncate` | `boolean`                                                                                      | —       | Truncate overflow with ellipsis              |
| `as`       | `React.ElementType`                                                                           | —       | Override the rendered element                |

## Scripts

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `yarn dev`             | Build the library in watch mode              |
| `yarn build`           | Type-check and build (ESM, CJS, d.ts, CSS)   |
| `yarn storybook`       | Run Storybook dev server on port 6006        |
| `yarn build-storybook` | Build the static Storybook site              |
| `yarn lint`            | Run ESLint                                   |
| `yarn typecheck`       | Type-check without emitting                  |
| `yarn format`          | Format with Prettier                         |

## Publishing

`yarn build` produces `dist/`. The `prepublishOnly` hook runs the build
automatically, and `files` limits the published package to `dist/`.

```bash
yarn publish --access public
```

## Adding more components

Place new components under `src/components/<group>/<name>/` (e.g. `actions/`,
`foundation/`), re-export them from `src/index.ts`, and add a `*.stories.tsx`
file next to each component. Define styles in a colocated `*.styles.css.ts`
file using Vanilla Extract `recipe()` / `style()` and the design tokens
(`vars`), then compose class names with the `mergeClassNames()` helper.

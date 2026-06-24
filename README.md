# @my-org/ui-kit

A React 19 UI kit built with **Vite 8** (library mode), **Tailwind CSS v4**, and
**shadcn/ui** primitives. Components are previewed with **Storybook**.

## Features

- ⚛️ React 19 + TypeScript, ships ESM + CJS + type declarations
- 🎨 Tailwind CSS v4 theme (CSS-first, shadcn token system, light/dark)
- 🧩 shadcn-style components (`class-variance-authority`, `clsx`, `tailwind-merge`)
- 📚 Storybook for interactive component docs
- ✅ ESLint 9 flat config (typescript-eslint, react-hooks, jsx-a11y, storybook) + Prettier

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

All theme tokens are CSS variables defined in `src/styles/globals.css`
(`--background`, `--primary`, `--radius`, …). Override them in your app — or
add a `.dark` class to a parent element to enable dark mode.

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

## Adding more shadcn components

Place new components under `src/components/<group>/<name>/` (e.g. `actions/`,
`foundation/`), re-export them from `src/index.ts`, and add a `*.stories.tsx`
file next to each component. Use the `mergeClassNames()` helper (exported from
the package) to compose Tailwind classes.

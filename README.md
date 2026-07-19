# @choco-vanille/ui

> **⚠️ Personal project notice:** This library is primarily built for personal use. It is published publicly as a convenience, but comes with no guarantees of stability, long-term maintenance, or backward compatibility. Use it at your own risk.

A React 19 UI kit built with **Vite** (library mode), **Vanilla Extract**
(zero-runtime, typed CSS-in-TS) and **Base UI** primitives. Components are
previewed with **Storybook**.

## Features

- ⚛️ React 19 + TypeScript, ships ESM + CJS + type declarations
- 🎨 Vanilla Extract design system — a fully typed token theme
  (colors, spacing, radius, font sizes/weights, shadows, z-index)
- 🧩 Base UI components styled with Vanilla Extract `recipe()` (the typed
  replacement for `cva`), composed with `clsx`
- 📚 Storybook for interactive component docs
- ✅ ESLint flat config (typescript-eslint, react-hooks, jsx-a11y, storybook) + Prettier

## Installation

```bash
# npm
npm install @choco-vanille/ui react react-dom

# yarn
yarn add @choco-vanille/ui react react-dom

# pnpm
pnpm add @choco-vanille/ui react react-dom
```

Import the stylesheet once (e.g. in your root layout/entry):

```ts
import '@choco-vanille/ui/styles.css';
```

Then use components:

```tsx
import { Text } from '@choco-vanille/ui';

export function Example() {
  return (
    <>
      <Text variant="h1">Hello world</Text>
      <Text variant="muted">A typographic primitive.</Text>
      <Text variant="code">@choco-vanille/ui</Text>
    </>
  );
}
```

## Components

| Category | Components |
|---|---|
| **Foundation** | `Icon`, `Typography` |
| **Layout** | `Box`, `Flex`, `Grid`, `Image`, `Separator`, `Form`, `Fieldset`, `Legend` |
| **Actions** | `Button`, `IconButton`, `ToggleButton`, `ToggleIconButton`, `ToggleButtonGroup` |
| **Forms** | `Autocomplete`, `Calendar`, `Checkbox`, `DatePicker`, `RadioGroup`, `Select`, `Switch`, `TextArea`, `TextField` |
| **Data Display** | `Avatar`, `AvatarGroup`, `Badge`, `Table` |
| **Surfaces** | `Accordion`, `Card`, `Collapsible` |
| **Navigation** | `Tabs`, `Link` |
| **Overlay** | `Tooltip`, `DropdownMenu`, `Popover`, `HoverCard`, `Dialog`, `Drawer` |
| **Feedback** | `Skeleton`, `Callout`, `Toast`, `Progress` |
| **Theme** | `ThemeProvider`, `useTheme` |

## Theming

The design system is the single source of truth for tokens, organised by
category under `src/theme/tokens/` (`colors.ts`, `spacing.ts`, `radii.ts`,
`typography.ts`, `shadows.ts`, `zIndex.ts`, `motion.ts`) and built on top of a
primitive OKLCH `palette.ts`. The typed contract and the light/dark theme
registration live in `src/theme/contract.css.ts`.

The kit ships with complete **light and dark** themes. Dark mode follows the
OS by default (`prefers-color-scheme`) and can be forced per-subtree:

```html
<html data-theme="dark"> ...   <!-- force dark -->
<html data-theme="light"> ...  <!-- force light -->
<html> ...                     <!-- auto: follow the OS -->
```

Tokens are available two ways:

**1. Typed `vars` (inside `*.css.ts`, fully autocompleted):**

```ts
import { style } from '@vanilla-extract/css';
import { vars } from '@choco-vanille/ui';

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

## License

[MIT](./LICENSE)


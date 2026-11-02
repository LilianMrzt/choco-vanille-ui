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

The package entry automatically loads its stylesheet. Then use components:

```tsx
import { Typography } from '@choco-vanille/ui';

export function Example() {
  return (
    <>
      <Typography variant="h1">Hello world</Typography>
      <Typography variant="muted">A typographic primitive.</Typography>
      <Typography variant="code">@choco-vanille/ui</Typography>
    </>
  );
}
```

For integrations that require explicit CSS loading, the stylesheet remains
available at `@choco-vanille/ui/styles.css`.

## Components

| Category | Components |
|---|---|
| **Foundation** | `Icon`, `Typography` |
| **Layout** | `Box`, `Flex`, `Grid`, `Inset`, `Image`, `Separator`, `Form`, `Fieldset`, `Legend` |
| **Actions** | `Button`, `IconButton`, `Toggle`, `ToggleGroup` |
| **Forms** | `Autocomplete`, `Calendar`, `Checkbox`, `CheckboxGroup`, `DatePicker`, `RadioGroup`, `RichTextEditor`, `Select`, `Slider`, `Switch`, `TextArea`, `TextField`, `NumberField` |
| **Data Display** | `Avatar`, `AvatarGroup`, `Badge`, `RichTextRenderer`, `Table` |
| **Surfaces** | `Accordion`, `Card`, `Collapsible` |
| **Navigation** | `Tabs`, `Link`, `Pagination`, `Breadcrumbs`, `Stepper`, `StepIndicator` |
| **Overlay** | `Tooltip`, `DropdownMenu`, `ContextMenu`, `Popover`, `HoverCard`, `Dialog`, `AlertDialog`, `Drawer`, `Panel`, `Command` |
| **Feedback** | `Skeleton`, `Callout`, `Toast`, `Progress`, `EmptyState`, `Spinner` |
| **Theme** | `ThemeProvider`, `useTheme` |

## Theming

The design system is the single source of truth for tokens. The palette,
semantic colors and other token categories live under `src/theme/tokens/`.
Complete light and dark themes are assembled under
`src/theme/themes/`, and their CSS variables are registered by
`src/theme/styles/contract/contract.css.ts`.

Built-in color ramps use sRGB hex values, with blue primary and violet secondary
colors. Semantic names include `surface`, `surfaceElevated`, `surfaceMuted`,
`foregroundMuted`, `foregroundSubtle`, `neutral`, `danger`, `accent*`, and
`focusRing`. These replace the previous color token and CSS variable names;
update consumer theme objects and overrides accordingly. Component intent props
remain independent (for example, Button's `color="destructive"` uses `danger`
tokens).
`ThemeColors`, `ThemeEditorColors`, and `Theme` accept customizable string
values; `ThemeColorOverrides` types the provider's partial semantic color
overrides. All are exported from `@choco-vanille/ui`.

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
  backgroundColor: vars.color.surface,
  color: vars.color.surfaceForeground,
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
  --color-primary: oklch(0.55 0.2 250); /* override this token */
  --radius-md: 0.25rem;
}
```

Both stay in sync automatically — overriding a CSS variable also updates every
component that references it through `vars`.

Overrides accept any valid CSS color. Rebranding an intent also requires its
hover, active, foreground, and subtle tokens; these are not generated from the
fill. Check contrast in every affected state of both themes.

## License

[MIT](./LICENSE)

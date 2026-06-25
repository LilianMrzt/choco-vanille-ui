# Customization & Theming

The kit's entire color scheme is overridable. Three strategies, ordered from simplest to most powerful.

> **Important:** override helpers (`overrideColors`, `setColorToken`) must be called from `*.css.ts` files — Vanilla Extract captures side-effects at build time; calling them from plain `.ts` files has no effect.

---

## Strategy 1 — Plain CSS

Override any CSS custom property directly. No build tooling required. Every token has a stable, human-readable variable name derived from its path.

```css
/* rebrand to teal */
:root {
    --color-primary:             oklch(0.55 0.2 180);
    --color-primary-hover:       oklch(0.48 0.2 180);
    --color-primary-active:      oklch(0.42 0.2 180);
    --color-primary-foreground:  oklch(1 0 0);
    --color-ring:                oklch(0.55 0.2 180);
}

/* sharper corners everywhere */
:root {
    --radius-sm: 0.125rem;
    --radius-md: 0.25rem;
}
```

Scoped overrides work too — any selector, any element:

```css
.dark-panel {
    --color-background: oklch(0.141 0.005 285);
    --color-foreground: oklch(0.967 0.001 286);
}
```

---

## Strategy 2 — `overrideColors()` (type-safe, build-time)

Call from a `*.css.ts` file in your app. Full TypeScript autocomplete on token names.

```ts
// my-app/theme/brand.css.ts
import { overrideColors } from '@my-org/ui-kit'

overrideColors('[data-brand="acme"]', {
    primary:            'oklch(0.55 0.2 180)',
    primaryHover:       'oklch(0.48 0.2 180)',
    primaryActive:      'oklch(0.42 0.2 180)',
    primaryForeground:  'oklch(1 0 0)',
    ring:               'oklch(0.55 0.2 180)',
})
```

```html
<div data-brand="acme">
    <!-- all kit components inside use the teal brand -->
</div>
```

### Single-token shorthand

```ts
// my-app/theme/overrides.css.ts
import { setColorToken } from '@my-org/ui-kit'

setColorToken('primary', 'oklch(0.55 0.2 180)')
```

---

## Strategy 3 — `createGlobalTheme()` (full white-label)

Replace the entire token set. Use the exported `vars` contract as the type anchor, and `lightTheme` / `darkTheme` as the base to spread from.

```ts
// my-app/theme/acme-light.css.ts
import { createGlobalTheme } from '@vanilla-extract/css'
import { vars, lightTheme } from '@my-org/ui-kit'

createGlobalTheme('[data-brand="acme"]', vars, {
    ...lightTheme,
    color: {
        ...lightTheme.color,
        primary:           'oklch(0.55 0.2 180)',
        primaryForeground: 'oklch(1 0 0)',
        primaryHover:      'oklch(0.48 0.2 180)',
        primaryActive:     'oklch(0.42 0.2 180)',
        ring:              'oklch(0.55 0.2 180)',
    },
})
```

A matching dark override:

```ts
// my-app/theme/acme-dark.css.ts
import { assignVars, globalStyle } from '@vanilla-extract/css'
import { vars, darkTheme } from '@my-org/ui-kit'

globalStyle('[data-brand="acme"][data-theme="dark"]', {
    vars: {
        ...assignVars(vars.color, {
            ...darkTheme.color,
            primary:           'oklch(0.65 0.18 180)',
            primaryForeground: 'oklch(0.1 0 0)',
        }),
    },
})
```

---

## Dark mode toggle

The kit's dark theme follows the OS by default (`prefers-color-scheme`). Force a specific theme by setting `data-theme` on any element:

```html
<html data-theme="dark">   <!-- force dark -->
<html data-theme="light">  <!-- force light -->
<html>                     <!-- auto: follow the OS -->
```

Minimal React toggle hook:

```tsx
const useTheme = () => {
    const toggle = () => {
        const html = document.documentElement
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        html.setAttribute('data-theme', next)
    }
    return { toggle }
}
```

---

## Adding extra tokens

Extra tokens coexist with the kit's variables — no conflicts:

```ts
// my-app/theme/extra.css.ts
import { createGlobalThemeContract, createGlobalTheme } from '@vanilla-extract/css'

export const extraVars = createGlobalThemeContract({
    sidebar: { width: null },
})

createGlobalTheme(':root', extraVars, {
    sidebar: { width: '280px' },
})
```


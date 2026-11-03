import { THEME_DARK_CLASS, THEME_LIGHT_CLASS, THEME_LAYER, RESET_LAYER } from '@theme/constants/index.ts'

# Theme System

The design system is built on a **three-layer token architecture** — the same approach used by Tailwind v4, Radix Colors and shadcn/ui.

> **See also:**
> - [CSS Variables Reference](cssVariables.md) — every `--custom-property` exposed by the theme.
> - **Storybook:** `Overview / Theme / Customization` (how to override) and `Overview / Theme / CSS Variables` (full token list).

```
Layer 3 — Component styles: vars.color.primary.main, vars.space.md …
Layer 2 — Semantic tokens:  primary.main, surface.muted, danger.main …
                            src/theme/tokens/colors/
Layer 1 — Primitive palette: palette.brand[600], palette.red[500] …
                            src/theme/tokens/colors/palette.const.ts
```

---

## File map

```
src/theme/
├── index.ts                 Public API
├── constants/               Shared theme constants
├── hooks/                   Public preference hook
├── providers/              Theme provider and its internal hooks
├── styles/                  CSS variable contract and global reset
├── themes/
│   └── themes.const.ts      Assembles lightTheme / darkTheme objects
└── tokens/
    ├── colors/              Palette and light/dark semantic colors
    ├── elevation/           Light and dark shadows
    ├── layering/            Z-index ladder
    ├── motion/              Durations and easing curves
    ├── radius/              Border-radius scale
    ├── spacing/             4 px base scale
    └── typography/          Font families, sizes, weights, line-heights, letter-spacing
```

---

## Layer 1 — Primitive palette (`tokens/colors/palette.const.ts`)

Raw, theme-agnostic sRGB hex scales. Components reference semantic variables;
the light and dark color objects consume the palette.

Available ramps include `neutral`, `brand` (blue), `secondary` (violet), `blue`,
`green`, `amber`, `red`, `purple`, `pink`, `orange`, `teal`, `cyan` and `indigo`.

```ts
import { palette } from '@choco-vanille/ui'

palette.brand[600]  // light primary
palette.red[500]
```

Custom overrides can still use any valid CSS color, including OKLCH.

---

## Layer 2 — Semantic tokens (`tokens/colors/`)

Maps palette values to *roles* — named slots that describe what a color is *used for*, not what it looks like. This is what allows the whole UI to switch themes by swapping one set of variables.

### Naming convention — one symmetric set per intent

All 13 families (`primary`, `secondary`, `neutral`, `success`, `warning`, `info`,
`danger` and the six `accent*` families) share the readonly `ThemeColorAccent`
contract. Each group contains ten direct color leaves, with no nested treatment
objects:

| Family | Token | Used for |
|---|---|---|
| Solid | `{family}.main` | Resting fill (contained buttons, solid badges) |
| Solid | `{family}.hover` | Fill on `:hover` |
| Solid | `{family}.pressed` | Fill on `:active` / pressed |
| Solid | `{family}.foreground` | Text/icon on the solid fill |
| Solid | `{family}.border` | Standard treatment border |
| Subtle | `{family}.subtle` | Resting tinted surface |
| Subtle | `{family}.subtleHover` | Tinted surface on `:hover` |
| Subtle | `{family}.subtlePressed` | Tinted surface on `:active` / pressed |
| Subtle | `{family}.subtleForeground` | Text/icon on the subtle surface |
| Subtle | `{family}.subtleBorder` | Border that pairs with the subtle surface |

> **Rule of thumb** — reach for the **solid** family for primary actions, and the **subtle** family for low-emphasis controls (ghost/outline buttons), inline alerts, badges and highlighted menu items.

### Color roles reference

#### Surfaces & text

| Role | Light | Dark |
|---|---|---|
| `background` | neutral-50 | neutral-950 |
| `text.primary` | neutral-950 | neutral-100 |
| `text.secondary` | neutral-600 | neutral-300 |
| `text.tertiary` | neutral-550 | neutral-400 |
| `surface.main` / `surface.foreground` | neutral-0 / neutral-950 | neutral-900 / neutral-100 |
| `surface.elevated` / `surface.elevatedForeground` | neutral-0 / neutral-950 | neutral-850 / neutral-100 |
| `surface.muted` / `surface.mutedForeground` | neutral-100 / neutral-550 | neutral-800 / neutral-400 |
| `overlay` | black 50% | black 70% |

#### Interactive intents (solid + subtle)

Component intentions are independent: `Button color="destructive"` maps to
`danger`, `tertiary` maps to `neutral`, and `purple` maps to `accentPurple`.
Built-in foregrounds retain 4.5:1 contrast across matching resting, hover and
pressed states. Custom overrides and disabled opacity need their own assessment.

#### Lines, fields & focus

| Role | Description |
|---|---|
| `border.subtle`, `border.muted` | Decorative, quiet separators; no 3:1 guarantee |
| `border.main`, `border.strong`, `border.stronger` | Increasing border intensities; assess functional indicators on their actual surface |
| `focusRing` | Focus ring |
| `highlight.main` / `highlight.foreground` | `<mark>` element |

### Primitive props and runtime overrides

Box, Typography and Icon accept CSS colors directly, including any external
custom property: `<Typography color={vars.color.primary.main}>Brand</Typography>`
or `<Icon color="var(--app-icon)" />`. They do not resolve token-name strings.
Explicit color props are inline; consumer `style` wins. Omitted colors leave
inheritance and stylesheet states intact.

Independent token-based props use paths, for example
`<Separator color="primary.main" textColor="text.secondary" />`.

ThemeProvider accepts partial direct leaves:
`tokens={{ primary: { main: '#0f766e' }, surface: { elevated: '#fff' } }}`.
Only supplied leaves are declared; siblings inherit without automatic derivation.
Both document and subtree scopes share this conversion. Undefined leaves are
omitted and structurally invalid runtime overrides throw.

---

## Layer 3 — CSS variable contract (`styles/contract/contract.css.ts`)

`createGlobalThemeContract` turns the token shape into typed `var(--…)` references.  
Every leaf maps: `vars.color.primary.hover` → `--color-primary-hover`.

### Theme registration

All token variables live in the low-specificity `@layer ${THEME_LAYER}` so host apps can override them predictably.

The following selectors apply the appropriate tokens:

```
[data-theme="dark"]              explicit dark on any ancestor (legacy)
.${THEME_DARK_CLASS}             explicit dark on any ancestor
[data-theme="light"]             explicit light on any ancestor
.${THEME_LIGHT_CLASS}            explicit light on any ancestor
:root:not([data-theme]):not(.${THEME_DARK_CLASS}):not(.${THEME_LIGHT_CLASS}) +
  @media (prefers-color-scheme)  automatic — follows the OS
:root                            light (default)
```

The `.${THEME_DARK_CLASS}` class is the recommended way to opt a page or a widget into dark mode without forcing a global `data-theme` attribute onto the host document. Because CSS variables inherit, wrapping any subtree in `.${THEME_DARK_CLASS}` is enough to theme the kit components inside it. Use `.${THEME_LIGHT_CLASS}` to force light mode inside a dark-scoped subtree.

Both explicit themes and automatic dark mode assign `color.*`, `editorColors.*`,
`shadow.*` and `dropShadow.*`. A nested light or dark scope therefore restores
all theme-dependent tokens, while spacing, radii, typography, z-index and motion
continue to inherit from `:root`.

---

## Non-color tokens

### Spacing (`tokens/spacing/spacing.const.ts`)

4 px base scale: `none` · `px` · `xxs`(2px) · `xs`(4px) · `sm`(8px) · `md`(12px) · `lg`(16px) · `xl`(24px) · `2xl`(32px) · `3xl`(48px) · `4xl`(64px) · `5xl`(96px)

### Radii (`tokens/radius/radius.const.ts`)

`none` · `xs`(4px) · `sm`(6px) · `md`(8px) · `lg`(10px) · `xl`(14px) · `2xl`(20px) · `full`(9999px)

### Typography (`tokens/typography/typography.const.ts`)

- **Families** — `sans`, `serif`, `mono`
- **Sizes** — `xs` → `7xl`
- **Weights** — `thin` → `black`
- **Line-heights** — `none`(1) · `tight`(1.25) · `snug`(1.375) · `normal`(1.5) · `relaxed`(1.625) · `loose`(1.75)
- **Letter-spacing** — `tighter` · `tight` · `normal` · `wide` · `wider` · `widest`

### Shadows (`tokens/elevation/elevation.const.ts`)

Theme-dependent (dark shadows are deeper): `none` · `xs` · `sm` · `md` · `lg` · `xl` · `2xl` · `inner`

### Z-index (`tokens/layering/zIndex.const.ts`)

`hide`(-1) · `base`(0) · `docked`(10) · `sticky`(100) · `banner`(200) · `dropdown`(1000) · `overlay`(1100) · `modal`(1200) · `popover`(1300) · `toast`(1350) · `tooltip`(1400)

### Motion (`tokens/motion/motion.const.ts`)

**Durations** — `instant`(0ms) · `fast`(100ms) · `normal`(150ms) · `moderate`(200ms) · `slow`(300ms) · `slower`(500ms)

**Easings** — `standard` · `out` (enter) · `in` (exit) · `emphasized` (spring) · `linear`

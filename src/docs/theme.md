# Theme System

The design system is built on a **three-layer token architecture** — the same approach used by Tailwind v4, Radix Colors and shadcn/ui.

```
┌────────────────────────────────────────┐
│  Layer 3 — Component styles            │  vars.color.primary, vars.space.md …
├────────────────────────────────────────┤
│  Layer 2 — Semantic tokens             │  "primary", "muted", "destructive" …
│  src/theme/colors/light.ts · dark.ts   │  one file per theme
├────────────────────────────────────────┤
│  Layer 1 — Primitive palette           │  palette.brand[600], palette.red[500] …
│  src/theme/tokens/palette.ts           │  raw OKLCH values, no meaning attached
└────────────────────────────────────────┘
```

---

## File map

```
src/theme/
├── contract.css.ts          CSS variable contract + light/dark registration
├── globalStyles.css.ts      Reset + themed body defaults
├── index.ts                 Public API
├── override.ts              Typed override helpers
├── colors/
│   ├── light.ts             Light theme semantic colors
│   ├── dark.ts              Dark theme semantic colors
│   └── index.ts
└── tokens/
    ├── palette.ts           Raw OKLCH scales (neutral, brand, blue, green, amber, red)
    ├── spacing.ts           4 px base scale
    ├── radii.ts             Border-radius scale
    ├── typography.ts        Font families, sizes, weights, line-heights, letter-spacing
    ├── shadows.ts           Elevation shadows — light and dark variants
    ├── zIndex.ts            Z-index ladder
    ├── motion.ts            Durations + easing curves
    └── index.ts             Assembles lightTheme / darkTheme objects
```

---

## Layer 1 — Primitive palette (`tokens/palette.ts`)

Raw, theme-agnostic OKLCH color scales. Components **never** reference the palette directly — only `colors/light.ts` and `colors/dark.ts` consume it.

Available ramps: `neutral`, `brand` (violet-indigo), `blue`, `green`, `amber`, `red`.  
Each ramp: steps `50` → `950` (lighter → darker).

```ts
import { palette } from '@my-org/ui-kit'

palette.brand[600]  // 'oklch(0.548 0.237 285)' — light primary
palette.red[500]    // 'oklch(0.637 0.237 25.3)'
```

**Why OKLCH?** It's perceptually uniform — equal numeric deltas look equal visually, which produces better-feeling dark-mode inversions and more accessible contrast ratios than HSL.

---

## Layer 2 — Semantic tokens (`colors/`)

Maps palette values to *roles* — named slots that describe what a color is *used for*, not what it looks like. This is what allows the whole UI to switch themes by swapping one set of variables.

### Color roles reference

#### Surfaces & text

| Role | Light | Dark |
|---|---|---|
| `background` | neutral-0 | neutral-950 |
| `foreground` | neutral-950 | neutral-100 |
| `card` / `cardForeground` | white / neutral-950 | neutral-900 / neutral-100 |
| `popover` / `popoverForeground` | white / neutral-950 | neutral-900 / neutral-100 |

#### Brand / primary

| Role | Light | Dark |
|---|---|---|
| `primary` | brand-600 | brand-500 |
| `primaryForeground` | neutral-0 | neutral-950 |
| `primaryHover` | brand-700 | brand-400 |
| `primaryActive` | brand-800 | brand-300 |

#### Secondary

| Role | Light | Dark |
|---|---|---|
| `secondary` | neutral-100 | neutral-800 |
| `secondaryForeground` | neutral-900 | neutral-100 |
| `secondaryHover` | neutral-200 | neutral-700 |
| `secondaryActive` | neutral-300 | neutral-600 |

#### Muted & accent

| Role | Light | Dark |
|---|---|---|
| `muted` / `mutedForeground` | neutral-100 / neutral-500 | neutral-800 / neutral-400 |
| `accent` / `accentForeground` | neutral-100 / neutral-900 | neutral-800 / neutral-100 |

#### Status — solid + subtle pairs

Each status intent ships in two flavours:  
- **Solid** — for filled badges and buttons  
- **Subtle** — tinted background + darker text, for banners, toasts, inline alerts

| Intent | Roles |
|---|---|
| Success | `success`, `successForeground`, `successSubtle`, `successSubtleForeground` |
| Warning | `warning`, `warningForeground`, `warningSubtle`, `warningSubtleForeground` |
| Info | `info`, `infoForeground`, `infoSubtle`, `infoSubtleForeground` |
| Destructive | `destructive`, `destructiveForeground`, `destructiveHover`, `destructiveActive`, `destructiveSubtle`, `destructiveSubtleForeground` |

#### Lines, fields & focus

| Role | Description |
|---|---|
| `border` | Dividers, card outlines |
| `input` | Input field borders |
| `ring` | Focus ring |
| `highlight` / `highlightForeground` | `<mark>` element |

---

## Layer 3 — CSS variable contract (`contract.css.ts`)

`createGlobalThemeContract` turns the token shape into typed `var(--…)` references.  
Every leaf maps: `vars.color.primaryHover` → `--color-primary-hover`.

### Theme registration

Three rules, in priority order:

```
[data-theme="dark"]              explicit dark (highest priority)
[data-theme="light"]             explicit light
:root:not([data-theme]) +
  @media (prefers-color-scheme)  automatic — follows the OS
:root                            light (default)
```

Only `color.*` and `shadow.*` are reassigned for dark; spacing, radii, typography, z-index and motion tokens are emitted once on `:root`.

---

## Non-color tokens

### Spacing (`tokens/spacing.ts`)

4 px base scale: `none` · `px` · `xxs`(2px) · `xs`(4px) · `sm`(8px) · `md`(12px) · `lg`(16px) · `xl`(24px) · `2xl`(32px) · `3xl`(48px) · `4xl`(64px) · `5xl`(96px)

### Radii (`tokens/radii.ts`)

`none` · `xs`(4px) · `sm`(6px) · `md`(8px) · `lg`(10px) · `xl`(14px) · `2xl`(20px) · `full`(9999px)

### Typography (`tokens/typography.ts`)

- **Families** — `sans`, `serif`, `mono`
- **Sizes** — `xs` → `7xl`
- **Weights** — `thin` → `black`
- **Line-heights** — `none`(1) · `tight`(1.25) · `snug`(1.375) · `normal`(1.5) · `relaxed`(1.625) · `loose`(1.75)
- **Letter-spacing** — `tighter` · `tight` · `normal` · `wide` · `wider` · `widest`

### Shadows (`tokens/shadows.ts`)

Theme-dependent (dark shadows are deeper): `none` · `xs` · `sm` · `md` · `lg` · `xl` · `2xl` · `inner`

### Z-index (`tokens/zIndex.ts`)

`hide`(-1) · `base`(0) · `docked`(10) · `sticky`(100) · `banner`(200) · `dropdown`(1000) · `overlay`(1100) · `modal`(1200) · `popover`(1300) · `toast`(1350) · `tooltip`(1400)

### Motion (`tokens/motion.ts`)

**Durations** — `instant`(0ms) · `fast`(100ms) · `normal`(150ms) · `moderate`(200ms) · `slow`(300ms) · `slower`(500ms)

**Easings** — `standard` · `out` (enter) · `in` (exit) · `emphasized` (spring) · `linear`


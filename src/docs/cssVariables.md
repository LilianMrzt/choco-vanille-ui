# CSS Variables

Importing from `@choco-vanille/ui` loads these variables in compatible bundlers. `@choco-vanille/ui/styles.css` remains available for explicit stylesheet loading. Override any token — from plain CSS, Tailwind, or Vanilla Extract — to re-skin the kit.

> The interactive reference with live, resolved values lives in Storybook:
> **Overview / Theme / CSS Variables**, **/ Colors** and **/ Tokens**.

## Naming rule

```
--{category}-{group}-{leaf}
```

Names join the token path with hyphens, preserving each segment's case:
`vars.color.primary.hover` → `--color-primary-hover`,
`vars.color.primary.subtleForeground` → `--color-primary-subtleForeground`.
Isolated tokens stay flat, for example `--color-focusRing`.

## Categories

| Prefix | Tokens |
|---|---|
| `--color-*` | 156 leaves: 13 accent families with 10 direct leaves each, text hierarchy, surfaces, links, five gray borders, focus, highlight, skeleton and isolated colors. **Theme-dependent.** |
| `--editorColors-*` | Editor palette colors and tones. **Theme-dependent.** |
| `--shadow-*` | `none` `xs` `sm` `md` `lg` `xl` `2xl` `inner`. **Theme-dependent.** |
| `--dropShadow-*` | `none` `sm` `md` `lg` `xl`. **Theme-dependent.** |
| `--space-*` | `none` `px` `xxs` `xs` `xs2` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl` `5xl` |
| `--radius-*` | `none` `xs` `sm` `md` `lg` `xl` `2xl` `full` |
| `--fontFamily-*` | `sans` `serif` `mono` |
| `--fontSize-*` | `xs` … `7xl` |
| `--fontWeight-*` | `thin`(100) … `black`(900) |
| `--lineHeight-*` | `none` `tight` `snug` `normal` `relaxed` `loose` |
| `--letterSpacing-*` | `tighter` `tight` `normal` `wide` `wider` `widest` |
| `--zIndex-*` | `hide` `base` `docked` `sticky` `banner` `dropdown` `overlay` `modal` `popover` `toast` `tooltip` |
| `--duration-*` | `instant` `fast` `normal` `moderate` `slow` `slower` |
| `--easing-*` | `standard` `out` `in` `emphasized` `linear` |

Each interactive family exposes `--color-{family}-` followed by `main`, `hover`,
`pressed`, `foreground`, `subtle`, `subtleHover`, `subtlePressed`,
`subtleForeground`, `border` or `subtleBorder`. Families are `primary`,
`secondary`, `neutral`, `success`, `warning`, `info`, `danger` and the six
`accent*` families. Component intentions remain independent.

> The exact resolved values are derived from `src/theme/tokens/`. They are intentionally **not duplicated here** to avoid drift — read them live in the Storybook stories above.

See [customization.md](./customization.md) to override these variables.

# CSS Variables

Importing from `@choco-vanille/ui` loads these variables in compatible bundlers. `@choco-vanille/ui/styles.css` remains available for explicit stylesheet loading. Override any token — from plain CSS, Tailwind, or Vanilla Extract — to re-skin the kit.

> The interactive reference with live, resolved values lives in Storybook:
> **Overview / Theme / CSS Variables**, **/ Colors** and **/ Tokens**.

## Naming rule

```
--{category}-{token}
```

The token name is kept as-is (camelCase): `vars.color.primaryHover` → `--color-primaryHover`.

## Categories

| Prefix | Tokens |
|---|---|
| `--color-*` | Surfaces, text, 7 intents (`primary`, `secondary`, `tertiary`, `success`, `warning`, `info`, `destructive`) each with 9 variants, borders, ring, highlight. **Theme-dependent.** |
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

Each interactive intent exposes: `--color-{intent}`, `{intent}Hover`, `{intent}Active`, `{intent}Foreground`, `{intent}Subtle`, `{intent}SubtleHover`, `{intent}SubtleActive`, `{intent}SubtleForeground`, `{intent}SubtleBorder`.

> The exact resolved values are derived from `src/theme/tokens/`. They are intentionally **not duplicated here** to avoid drift — read them live in the Storybook stories above.

See [customization.md](./customization.md) to override these variables.

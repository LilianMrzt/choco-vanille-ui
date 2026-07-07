# File naming & folder structure

This document describes the canonical file naming and folder structure conventions used across the UI kit. It is derived from the actual patterns found in `src/`, `tests/`, and the Storybook stories.

---

## Top-level layout

```
ui-kit/
├── src/
│   ├── components/           Public UI components, grouped by category
│   ├── constants/            Kit-wide constants (theme layers, animations)
│   ├── docs/                 Markdown documentation (this folder)
│   ├── hooks/                Shared React hooks
│   ├── stories/              Storybook stories, mirroring component categories
│   ├── theme/                Design tokens, color themes, and Vanilla Extract contract
│   ├── utils/                Tiny shared utilities
│   ├── index.ts              Public library barrel
│   └── vite-env.d.ts         Vite client types
├── tests/                    Vitest unit / component tests
├── .storybook/               Storybook configuration
├── dist/                     Build output (generated)
└── docs/                     Docusaurus / external documentation site (if present)
```

---

## Path aliases

`tsconfig.json` defines the following aliases. Use them instead of relative paths so imports stay stable when files move.

| Alias | Resolves to |
|---|---|
| `@/*` | `./src/*` |
| `@components` | `./src/components/index.ts` |
| `@components/*` | `./src/components/*` |
| `@theme` | `./src/theme/index.ts` |
| `@theme/*` | `./src/theme/*` |
| `@constants` | `./src/constants` |
| `@constants/*` | `./src/constants/*` |
| `@utils/*` | `./src/utils/*` |
| `@hooks` | `./src/hooks/index.ts` |
| `@hooks/*` | `./src/hooks/*` |
| `@stories/*` | `./src/stories/*` |
| `@tests/*` | `./tests/*` |

Example:

```ts
import { Button } from '@components/actions/button'
import { vars } from '@theme'
import { cn } from '@utils/cn.ts'
```

---

## Component categories

Components live under `src/components/` and are grouped by purpose. The category name is always `kebab-case`.

```
src/components/
├── actions/          Buttons and clickable controls
├── data-display/     Tables, lists, badges…
├── feedback/         Alerts, progress, loaders…
├── forms/            Inputs, selects, checkboxes, date pickers…
├── foundation/       Typography, icon, base primitives
├── layout/           Box, flex, grid, card…
└── overlay/          Popovers, tooltips, dropdown menus…
```

Each category exports its members through an `index.ts` barrel, and `src/components/index.ts` re-exports every category.

---

## Component folder structure

Every public component has its own folder under the relevant category. The folder name is `kebab-case`; the files inside use `PascalCase` matching the component name.

```
src/components/actions/button/
├── Button.tsx              # React component
├── index.ts                # Barrel export
├── styles/
│   ├── Button.css.ts       # Vanilla Extract styles / recipe
│   └── variants/           # Optional: per-variant compound styles
├── types/
│   ├── Button.props.ts     # Public prop types
│   └── Button.types.ts     # Variant / size / color string unions
└── constants/
    └── index.ts            # Barrel export for component constants
```

### Required files

| File | Naming rule | Purpose |
|---|---|---|
| Component file | `ComponentName.tsx` | JSX, composition, refs, display name |
| Styles file | `styles/ComponentName.css.ts` | Vanilla Extract `recipe`, `style`, `globalStyle` |
| Barrel | `index.ts` | Public exports for the component |
| Props | `types/ComponentName.props.ts` | Public React prop interface |
| Types | `types/ComponentName.types.ts` | `type Variant = 'a' \| 'b'` unions |

### Optional folders

| Folder | When to use |
|---|---|
| `components/` | Compound components (`Card.Header`, `TextField.Label`…) |
| `hooks/` | Component-specific logic / accessibility hooks |
| `utils/` | Pure helper functions used only by this component |
| `constants/` | Maps, lookup tables, or static config used by the component |
| `styles/` | Vanilla Extract building blocks split out of `ComponentName.css.ts` |

> **Note:** The older `contributing.md` examples reference `ComponentName.styles.css.ts`. The real convention used in the codebase is `styles/ComponentName.css.ts` (no `.styles` segment).

---

## Component styles folder

When a recipe has many compound variants, keep the main `styles/ComponentName.css.ts` focused on the recipe definition and move the per-variant declarations into a `styles/variants/` folder.

```
src/components/data-display/badge/
├── Badge.tsx
├── styles/
│   ├── Badge.css.ts
│   └── variants/
│       ├── solid.ts
│       ├── subtle.ts
│       └── outline.ts
├── types/
│   ├── Badge.props.ts
│   └── Badge.types.ts
└── constants/
    ├── index.ts
    ├── badgeColors.const.ts
    ├── badgeSizes.const.ts
    └── badgeVariants.const.ts
```

Rules for `styles/`:

- The main recipe file lives at `styles/ComponentName.css.ts`.
- One file per visual variant under `styles/variants/` (e.g. `solid.ts`, `subtle.ts`, `outline.ts`).
- Each variant file exports a single named array: `{variantName}CompoundVariants`.
- `styles/ComponentName.css.ts` imports and spreads these arrays into `compoundVariants`.
- Keep shared base styles, size variants, and the recipe itself in `styles/ComponentName.css.ts`.
- Do not move types or constants into `styles/`; keep them in their existing `types/` and `constants/` folders.
- Reference variant and color values through constants (`BADGE_VARIANTS.solid`) instead of hardcoded strings.

---

## Component constants folder

Constants for a component live under `constants/` and are split into focused files by domain. Each file is named `<constantName>.const.ts` and exports both an object enum and a derived array.

```
src/components/data-display/badge/constants/
├── index.ts                # Re-exports all constants
├── badgeColors.const.ts    # BADGE_COLORS object enum + BADGE_COLORS_ARRAY
├── badgeSizes.const.ts     # BADGE_SIZE_TO_FONT_SIZE + BADGE_SIZE_TO_ICON_SIZE
└── badgeVariants.const.ts  # BADGE_VARIANTS object enum + BADGE_VARIANTS_ARRAY
```

Example:

```ts
// badgeColors.const.ts
export const BADGE_COLORS = {
    primary: 'primary',
    secondary: 'secondary',
    destructive: 'destructive',
} as const

export const BADGE_COLORS_ARRAY = Object.values(BADGE_COLORS)
```

Rules for `constants/`:

- One file per constant group (`badgeColors`, `badgeSizes`, `badgeVariants`).
- File name: `<constantName>.const.ts`.
- Export an object enum (`BADGE_COLORS`) for type-safe references and lookups.
- Export a derived array (`BADGE_COLORS_ARRAY`) for iteration and mapping.
- Re-export everything from `constants/index.ts` so consumers import from `@components/.../constants`.

---

## File naming rules

### Folders

- Use `kebab-case` for every directory name.
- Component folders match the public component name converted to kebab-case:
  - `TextField` → `text-field`
  - `IconButton` → `icon-button`
  - `DropdownMenu` → `dropdown-menu`

### Source files

- **React components**: `PascalCase.tsx`
- **Vanilla Extract styles**: `styles/PascalCase.css.ts`
- **Props**: `PascalCase.props.ts`
- **Type unions**: `PascalCase.types.ts`
- **Hooks**: `useComponentName.hook.ts` (or `.tsx` when the hook returns JSX-related logic)
- **Utils**: `descriptiveName.utils.ts`
- **Constants**: `<constantName>.const.ts` inside a `constants/` folder, re-exported by `index.ts`
- **Barrels**: `index.ts`

### Examples

```
button/
├── Button.tsx
├── styles/
│   ├── Button.css.ts
│   └── variants/
│       └── contained.ts
├── types/
│   ├── Button.props.ts
│   └── Button.types.ts
└── constants/
    ├── index.ts
    └── buttonVariants.const.ts

text-field/
├── TextField.tsx
├── styles/
│   └── TextField.css.ts
├── components/
│   ├── text-field-label/
│   │   ├── TextFieldLabel.tsx
│   │   ├── styles/
│   │   │   └── TextFieldLabel.css.ts
│   │   └── types/
│   │       ├── TextFieldLabel.props.ts
│   │       └── TextFieldLabel.types.ts
│   └── ...
├── hooks/
│   └── useTextfield.hook.tsx
├── utils/
│   └── someHelper.utils.ts
├── types/
│   ├── TextField.props.ts
│   └── TextField.types.ts
└── constants/
    ├── index.ts
    └── textFieldSizes.const.ts
```

---

## Compound components

When a component is composed of multiple public sub-components, each sub-component gets its own folder under `components/` inside the parent component folder.

```
src/components/layout/card/
├── Card.tsx
├── Card.css.ts
├── components/
│   ├── card-header/
│   │   ├── CardHeader.tsx
│   │   ├── CardHeader.css.ts
│   │   └── types/
│   │       ├── CardHeader.props.ts
│   │       └── CardHeader.types.ts
│   ├── card-body/
│   │   └── ...
│   ├── card-footer/
│   │   └── ...
│   └── index.ts          # Re-exports all sub-components
├── types/
│   └── Card.props.ts
└── index.ts
```

The parent component attaches sub-components as static properties:

```tsx
Card.displayName = 'Card'
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
```

The parent `index.ts` exports both the root component and the sub-component style objects / types consumers may need.

---

## Component-level hooks and utilities

Keep component-specific logic close to the component that uses it.

### Hooks

```
src/components/forms/date-picker/hooks/
└── useDatePicker.hook.ts
```

- File name: `useComponentName.hook.ts` (or `.tsx` when JSX-related).
- Re-exported from the component barrel only when they are part of the public API.
- Hooks may have their own `types/` folder when the types are shared between multiple hook files.

### Utilities

```
src/components/forms/date-picker/utils/
└── datePicker.utils.ts
```

- File name: `descriptiveName.utils.ts` (camelCase description, `.utils.ts` suffix).
- Keep functions pure and focused on a single responsibility.
- If a utility is used by more than one component, consider moving it to `src/components/<category>/_shared/utils/` or `src/utils/`.

Example:

```ts
// src/components/theme-provider/utils/getSystemTheme.utils.ts
export const getSystemTheme = (): ThemeMode =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
```

Code shared by multiple components in the same category lives in a `src/components/<category>/_shared/` folder.

```
src/components/actions/_shared/
└── buttons/
    ├── constants/          # Shared maps (size → icon size, etc.)
    ├── styles/             # Shared Vanilla Extract recipes / building blocks
    │   ├── buttonShared.css.ts
    │   └── variants/
    │       ├── contained.ts
    │       ├── outlined.ts
    │       └── ghost.ts
    └── types/              # Shared type unions
```

Cross-category shared components (for example `HelperText`) live in the most relevant category's `_shared` folder and are imported by other categories when needed.

```
src/components/forms/_shared/
├── components/
│   └── helper-text/
│       ├── HelperText.tsx
│       ├── HelperText.css.ts
│       └── types/
│           ├── HelperText.props.ts
│           └── HelperText.types.ts
└── styles/
    ├── checkboxVisual.css.ts
    └── radioVisual.css.ts
```

Rules for `_shared`:

- Keep it scoped to one category when possible.
- Use descriptive folder names (`buttons`, `helper-text`) rather than generic names.
- Export shared items from the category `index.ts` only when they are part of the public API.

---

## Theme structure

```
src/theme/
├── contract.css.ts       # createGlobalThemeContract + light/dark registration
├── globalStyles.css.ts   # CSS reset + body defaults
├── index.ts              # Public theme API
├── override.ts           # Typed override helpers
├── colors/
│   ├── light.ts
│   ├── dark.ts
│   └── index.ts
└── tokens/
    ├── index.ts          # Assembles full theme objects
    ├── motion.ts
    ├── palette.ts
    ├── radii.ts
    ├── shadows.ts
    ├── spacing.ts
    ├── typography.ts
    └── zIndex.ts
```

- `tokens/` holds primitive, theme-agnostic values (palette, spacing, radii…).
- `colors/` maps those primitives to semantic roles for each theme.
- `contract.css.ts` exposes typed `vars.*` references used by every component style file.

See `theme.md` for the full token architecture.

---

## Hooks

Shared hooks live in `src/hooks/`. Each hook has its own `kebab-case` folder.

```
src/hooks/
├── index.ts
└── use-viewport-shift/
    ├── constants/
    ├── helpers/
    ├── types/
    └── useViewportShift.hook.ts
```

- File name: `useComponentName.hook.ts` (camelCase hook name, `.hook.ts` suffix).
- Re-exported from `src/hooks/index.ts`.

---

## Constants

Kit-wide constants live in `src/constants/`.

```
src/constants/
├── index.ts
├── theme.ts              # Theme class names, layers, prefix
└── animations/
    ├── index.ts
    ├── fade/
    ├── slide/
    └── spin/
```

- A single flat file (`theme.ts`) is fine for small, tightly related constants.
- Use a folder with an `index.ts` barrel when the domain has multiple files (animations).

---

## Utilities

Utilities are tiny, single-purpose helpers in `src/utils/`.

```
src/utils/
└── cn.ts                 # className merger
```

- One file per utility.
- Named export matching the file name.

---

## Tests

Tests mirror the `src/components/` structure.

```
tests/
├── components/
│   ├── actions/
│   │   └── button/
│   │       └── Button.test.tsx
│   ├── forms/
│   │   └── text-field/
│   │       └── TextField.test.tsx
│   └── ...
├── hooks/
└── utils/
```

- Test file naming: `ComponentName.test.tsx`.
- Group tests in folders matching the component category and component name.
- Shared test helpers live in `tests/_shared/` when needed.

---

## Stories

Storybook stories live in `src/stories/` and mirror the component category structure.

```
src/stories/
├── actions/
│   ├── button/
│   │   └── Button.stories.tsx
│   └── icon-button/
│       └── IconButton.stories.tsx
├── forms/
│   └── text-field/
│       └── TextField.stories.tsx
└── ...
```

- File naming: `ComponentName.stories.tsx`.
- Story `title`: `'Category/ComponentName'` (e.g. `'Actions/Button'`).
- Each public component has exactly one story file with one interactive `Playground` story.

See `story-guidelines.md` for the full story authoring rules.

---

## Barrel exports

Every folder that is imported from outside its own tree contains an `index.ts` barrel.

### Component barrel

```ts
// src/components/actions/button/index.ts
export { default as Button } from '@components/actions/button/Button.tsx'
export { BUTTON_STYLES } from '@components/actions/button/styles/Button.css.ts'
export type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
export type { ButtonVariant, ButtonSize, ButtonColor } from '@components/actions/button/types/Button.types.ts'
```

### Category barrel

```ts
// src/components/actions/index.ts
export * from '@components/actions/button'
export * from '@components/actions/icon-button'
```

### Root barrel

```ts
// src/index.ts
export { vars } from '@theme'
export type { ThemeVars, ThemeColor } from '@theme'
export { cn } from '@utils/cn.ts'
export * from '@constants'
export * from '@hooks'
export * from '@components'
```

Rules:

- Re-export the component as a named export (`export { default as Button }`).
- Re-export public style objects when consumers may need them (`BUTTON_STYLES`).
- Re-export public prop and variant types.
- Do **not** export internal hooks, helpers, or private sub-component files directly from the public barrel.

---

## Naming quick reference

| Concern | Convention | Example |
|---|---|---|
| Folder | `kebab-case` | `text-field`, `icon-button` |
| React component file | `PascalCase.tsx` | `Button.tsx` |
| Styles file | `styles/PascalCase.css.ts` | `styles/Button.css.ts` |
| Props file | `PascalCase.props.ts` | `Button.props.ts` |
| Types file | `PascalCase.types.ts` | `Button.types.ts` |
| Hook file | `useComponentName.hook.ts` | `useViewportShift.hook.ts` |
| Utils file | `descriptiveName.utils.ts` | `datePicker.utils.ts` |
| Constants file | `<constantName>.const.ts` | `badgeColors.const.ts` |
| Test file | `ComponentName.test.tsx` | `Button.test.tsx` |
| Story file | `ComponentName.stories.tsx` | `Button.stories.tsx` |
| Barrel | `index.ts` | `index.ts` |
| Style object | `SCREAMING_SNAKE_CASE` | `BUTTON_STYLES`, `CARD_HEADER_STYLES` |
| Shared folder | `_shared` | `src/components/forms/_shared` |

---

## Checklist for new components

- [ ] Folder created under the correct category: `src/components/<category>/<component-name>/`
- [ ] Component file: `ComponentName.tsx`
- [ ] Styles file: `styles/ComponentName.css.ts`
- [ ] Props file: `types/ComponentName.props.ts`
- [ ] Types file: `types/ComponentName.types.ts`
- [ ] Barrel: `index.ts` exporting component, styles, and public types
- [ ] Hooks folder: `hooks/useComponentName.hook.ts` (when needed)
- [ ] Utils folder: `utils/descriptiveName.utils.ts` (when needed)
- [ ] Constants folder: `constants/<constantName>.const.ts` (when needed)
- [ ] Added to category `index.ts`
- [ ] Added to `src/components/index.ts` if it is a new category
- [ ] Story: `src/stories/<category>/<component-name>/ComponentName.stories.tsx`
- [ ] Tests: `tests/components/<category>/<component-name>/ComponentName.test.tsx`
- [ ] Imports use path aliases (`@components/...`, `@theme`, `@utils/...`)

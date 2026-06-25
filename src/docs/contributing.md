# Contributing

## Repository layout

```
ui-kit/
├── src/
│   ├── components/           UI components
│   │   ├── actions/          Interactive elements (Button…)
│   │   ├── forms/            Form controls
│   │   ├── foundation/       Base elements (Typography…)
│   │   ├── layout/           Layout helpers
│   │   └── overlay/          Popovers, tooltips, modals…
│   ├── theme/                Design system tokens & contract
│   │   ├── colors/           light.ts · dark.ts · index.ts
│   │   ├── tokens/           palette, spacing, radii, typography…
│   │   ├── contract.css.ts   VE contract + theme registration
│   │   ├── globalStyles.css.ts Reset + body defaults
│   │   ├── override.ts       Typed override helpers
│   │   └── index.ts          Public API
│   ├── docs/                 This documentation
│   ├── stories/              Storybook stories
│   └── utils/                Shared utilities
├── tests/                    Vitest unit tests
└── .storybook/               Storybook configuration
```

---

## Adding a component

Every component follows the same file layout:

```
ComponentName/
├── ComponentName.tsx              React component
├── ComponentName.styles.css.ts   Vanilla Extract recipe
├── index.ts                      Barrel export
├── hooks/
│   └── useComponentName.hook.ts  Logic / accessibility
└── types/
    ├── ComponentName.props.ts    React prop types
    └── ComponentName.types.ts    Variant string unions
```

### Separation of concerns

| File | Responsibility |
|---|---|
| `*.tsx` | JSX — renders markup, composes hook + styles |
| `*.styles.css.ts` | All CSS — Vanilla Extract recipe, uses only `vars.*` |
| `useComponent.hook.ts` | Logic, ARIA attributes, no JSX |
| `*.props.ts` | Public prop types |
| `*.types.ts` | `type Variant = …` string unions |

### Step-by-step

**1. Types**
```ts
// types/Alert.types.ts
export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive'
```

**2. Props**
```ts
// types/Alert.props.ts
import type { AlertVariant } from './Alert.types.ts'

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: AlertVariant
}
```

**3. Styles** — only `vars.*`, never raw values
```ts
// Alert.styles.css.ts
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { vars } from '@theme/contract.css.ts'

export const alertRecipe = recipe({
    base: { borderRadius: vars.radius.md, padding: vars.space.lg },
    variants: {
        variant: {
            info:        { backgroundColor: vars.color.infoSubtle,        color: vars.color.infoSubtleForeground },
            success:     { backgroundColor: vars.color.successSubtle,     color: vars.color.successSubtleForeground },
            warning:     { backgroundColor: vars.color.warningSubtle,     color: vars.color.warningSubtleForeground },
            destructive: { backgroundColor: vars.color.destructiveSubtle, color: vars.color.destructiveSubtleForeground },
        },
    },
    defaultVariants: { variant: 'info' },
})

export type AlertRecipeVariants = NonNullable<RecipeVariants<typeof alertRecipe>>
```

**4. Hook**
```ts
// hooks/useAlert.hook.ts
import type { AlertProps } from '../types/Alert.props.ts'

export const useAlert = ({ variant = 'info', ...props }: AlertProps) => ({
    rootProps: { role: 'alert' as const, ...props },
    variant,
})
```

**5. Component**
```tsx
// Alert.tsx
import { alertRecipe } from './Alert.styles.css.ts'
import { useAlert }    from './hooks/useAlert.hook.ts'
import type { AlertProps } from './types/Alert.props.ts'

export const Alert = (props: AlertProps) => {
    const { rootProps, variant } = useAlert(props)
    return <div className={alertRecipe({ variant })} {...rootProps} />
}
```

**6. Barrel**
```ts
// index.ts
export { Alert }             from './Alert.tsx'
export type { AlertProps }   from './types/Alert.props.ts'
export type { AlertVariant } from './types/Alert.types.ts'
```

**7. Add to the category index**
```ts
// src/components/foundation/index.ts
export * from './typography/index.ts'
export * from './alert/index.ts'  // ← add this
```

**8. Tests**
```tsx
// tests/components/foundation/alert/Alert.test.tsx
import { render, screen } from '@testing-library/react'
import { Alert } from '@components/foundation/alert/Alert.tsx'

describe('Alert', () => {
    it('renders with role="alert"', () => {
        render(<Alert variant='info'>Message</Alert>)
        expect(screen.getByRole('alert')).toBeInTheDocument()
    })
})
```

**9. Story**
```tsx
// src/stories/foundation/alert/Alert.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '@components/foundation/alert/Alert.tsx'

const meta: Meta<typeof Alert> = { title: 'Foundation/Alert', component: Alert }
export default meta

export const Default: StoryObj<typeof Alert> = {
    args: { variant: 'info', children: 'This is an informational message.' },
}
```

---

## Key design decisions

| Decision | Rationale |
|---|---|
| **Vanilla Extract** over Tailwind | Zero-runtime, type-safe, tree-shakeable. No class name collisions. |
| **Radix UI** primitives | Handles accessibility, keyboard nav, ARIA — we only style. |
| **OKLCH** color space | Perceptually uniform. Equal steps look equal visually. |
| **`recipe()`** over `cva` | First-class VE primitive — same API, no extra dependency. |
| **Three-layer token architecture** | Palette → semantic roles → CSS vars. Components are theme-agnostic. |

---

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Build the library in watch mode |
| `yarn build` | Type-check + build (ESM, CJS, `.d.ts`, CSS) |
| `yarn typecheck` | TypeScript check only |
| `yarn lint` | ESLint |
| `yarn test` | All tests (unit + Storybook visual) |
| `yarn storybook` | Start Storybook at `localhost:6006` |


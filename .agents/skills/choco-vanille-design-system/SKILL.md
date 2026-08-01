---
name: choco-vanille
description: Creates, modifies, refactors, and extends public components in choco-vanille-ui while preserving its established API, TypeScript, accessibility, composition, Vanilla Extract, Base UI, variants, sizing, state, callback, and export conventions. Use for any component-library change under src/components or src/theme.
---

# Choco Vanille Design System

Maintain `@choco-vanille/ui` as a coherent public component library. Optimize
for consistency with the repository, not for novelty or theoretical
modernization.

The current library is the default reference. Change a convention only when
code evidence shows a consumer-visible inconsistency.

## Utilisation dans Copilot CLI

Copilot charge ce Skill automatiquement lorsque la demande concerne la
création, la modification, le refactoring ou l'extension d'un composant sous
`src/components` ou du thème sous `src/theme`.

Pour le demander explicitement, invoquer la commande `/choco-vanille` :

```text
/choco-vanille Crée un composant Slider.
```

```text
/choco-vanille Ajoute une taille xl à Avatar sans rompre les conventions
publiques.
```

```text
/choco-vanille Refactore les props de Box afin qu'elles ne dépendent plus de
Vanilla Extract.
```

Dans GitHub Copilot CLI, `/skills` permet de voir et gérer les Skills
disponibles. Après l'ajout ou la modification locale d'un Skill, démarrer une
nouvelle session ou utiliser `/skills` si la session courante ne l'a pas encore
chargé.

## Working method

For every public API decision, use this order:

1. **Observations**: cite public types, exports and observable code.
2. **Conclusions**: state the consumer impact.
3. **Decision**: prefer Conserver, then Standardiser, Simplifier, Corriger,
   Fusionner, Supprimer, Réécrire.
4. **Implementation**: make the smallest complete change.

Source confidence order:

1. source code;
2. public types;
3. public exports;
4. tests;
5. stories;
6. documentation;
7. comments.

Mark unsupported claims `NON VÉRIFIÉ DANS LE CODE`.

## Preflight

Read only what the change needs, in this order:

1. the component's public `index.ts`;
2. `types/*Props.ts` and public `*.types.ts`;
3. constants for variants, colors and sizes;
4. the component's `*.css.ts` recipe;
5. the TSX only for observable behavior;
6. related exemplary components;
7. tests and stories only to validate or update an established contract.

For cross-component decisions, consult:

- `docs/project/design-system-consistency-matrix.md`;
- `src/index.ts`;
- `src/components/index.ts`;
- `src/theme/index.ts`.

Do not systematically inspect hooks, helpers, fixtures, stories or tests.

## Architecture

The public stack is:

```text
src/index.ts
├── theme contract and public theme API
├── constants and hooks
└── src/components/index.ts
    ├── actions
    ├── data-display
    ├── feedback
    ├── forms
    ├── foundation
    ├── layout
    ├── navigation
    ├── overlay
    ├── surfaces
    └── theme-provider
```

Implementation layers:

- React 19 public components;
- Base UI for headless interactive primitives;
- native HTML for native controls;
- Vanilla Extract recipes and theme contract;
- semantic theme tokens from `vars`;
- Iconify behind the public `Icon` primitive.

Preserve these boundaries:

- Base UI owns headless interaction and state contracts.
- Native elements retain native DOM contracts.
- Components own public naming, composition, styles and accessibility guards.
- Vanilla Extract details do not dictate unrelated public API.
- Public types are self-sufficient and never depend on Vanilla Extract recipes
  or generated recipe types.
- `src/index.ts` is the package entry point.

## Organisation

A public component uses the smallest subset of this structure that it needs:

```text
component-name/
├── ComponentName.tsx
├── index.ts
├── components/
│   └── component-slot/
│       ├── ComponentSlot.tsx
│       ├── index.ts
│       ├── constants/
│       ├── styles/
│       │   └── ComponentSlot.css.ts
│       └── types/
│           ├── ComponentSlot.props.ts
│           └── ComponentSlot.types.ts
├── constants/
│   ├── componentVariants.const.ts
│   ├── componentSizes.const.ts
│   └── index.ts
├── context/
│   └── Component.context.ts
├── hooks/
│   └── useComponent.hook.ts
├── styles/
│   ├── ComponentName.css.ts
│   └── variants/
│       ├── contained.ts
│       └── outlined.ts
└── types/
    ├── ComponentName.props.ts
    ├── ComponentName.types.ts
    ├── ComponentNameCompound.ts
    └── index.ts
└── utils/
    └── component.utils.ts
```

Do not create empty directories. Add a directory only when the corresponding
object exists.

### Object placement

| Object | Location | Rule |
| --- | --- | --- |
| Public React component | `ComponentName.tsx` | Rendering and observable behavior only |
| Public props | `types/ComponentName.props.ts` | HTML/Base UI bases plus library-owned props |
| Public unions | `types/ComponentName.types.ts` | Variant, size, color, mode, position and public aliases |
| Compound type | `types/ComponentNameCompound.ts` or `types/index.ts` | Root callable type plus public slots |
| Public vocabulary constants | `constants/*.const.ts` | Canonical runtime values for variants, sizes, colors and modes |
| Derived mappings | `constants/*.const.ts` | Size-to-icon, status-to-icon and other immutable lookup tables |
| Vanilla Extract recipe | `styles/ComponentName.css.ts` | Styles, recipes, default variants and internal recipe types |
| Variant style fragments | `styles/variants/*.ts` | Shared compound variants when the main recipe would become dense |
| Public slot | `components/component-slot/` | Give the slot its own TSX, props and styles when it has a contract |
| Context | `context/Component.context.ts` | Internal state shared by compound slots |
| Hook | `hooks/useComponent.hook.ts` | Stateful or interaction logic extracted from rendering |
| Utility | `utils/*.utils.ts` | Pure component-local transformations |
| Barrel | `index.ts` | Public exports only |

### Types and constants

- `ComponentName.props.ts` contains only the public props declaration and its
  type imports.
- `ComponentName.types.ts` contains public unions and aliases, never runtime
  values.
- Canonical runtime vocabularies live in `constants/` and use `as const`.
- Public union types may derive from those constants.
- Recipes import public constants or public unions; public props never import
  a recipe type.
- Keep a mapping in `constants/` when both TSX and styles use it. Keep it next
  to the sole consumer when it is purely local.
- Export a constant only when consumers need the vocabulary or it is already
  an established public contract. Local recipe helpers remain internal.

Canonical vocabulary template:

```ts
// constants/componentVariants.const.ts
export const COMPONENT_VARIANTS = {
  contained: 'contained',
  outlined: 'outlined',
} as const

// types/ComponentName.types.ts
import type { COMPONENT_VARIANTS } from '../constants/componentVariants.const'

export type ComponentVariant =
  (typeof COMPONENT_VARIANTS)[keyof typeof COMPONENT_VARIANTS]

// types/ComponentName.props.ts
import type { ComponentVariant } from './ComponentName.types'

export type ComponentNameProps = {
  variant?: ComponentVariant
}

// styles/ComponentName.css.ts
import { COMPONENT_VARIANTS } from '../constants'

export const COMPONENT_STYLES = recipe({
  variants: {
    variant: {
      [COMPONENT_VARIANTS.contained]: {},
      [COMPONENT_VARIANTS.outlined]: {},
    },
  },
})
```

### Vanilla Extract isolation

The public API must remain usable and understandable without importing
Vanilla Extract types.

- A public `*.props.ts` or `*.types.ts` file MUST NOT import from
  `styles/*.css.ts`.
- A public prop base MUST NOT be `RecipeVariants`, a property selected from
  `RecipeVariants`, or another Vanilla Extract-generated type.
- `Box`, `Flex`, `Grid` and layout token props follow the same rule; define
  their public token unions independently.
- Recipe types may exist inside `*.css.ts` for internal implementation only.
- Public `*_STYLES` values may remain established extension handles, but they
  never define the component's props or public unions.
- When decoupling an existing component, move the vocabulary to
  `constants/`/`types/`, make the recipe consume it, then remove the
  type-level dependency from props to styles.

Dependency direction:

```text
constants ───────► types ───────► props
    │                │
    └──────────────► styles

props + styles + constants + hooks/context/utils ───────► TSX
```

The forbidden direction is `props/types -> *.css.ts`.

### Shared and compound code

- Use a component-local `components/` directory for slots.
- Use a family `_shared/` directory only when several public siblings reuse
  the code, as in the Button family.
- Use category-level `_shared/` for a primitive shared by several components,
  such as form helper text.
- Use `_common/` for internal cross-category primitives.
- Do not export `_shared`, `_common`, hooks, context or utilities unless a
  demonstrated consumer contract already exists.
- A compound root assigns slots in `ComponentName.tsx`; each slot remains
  independently typed.
- `index.ts` exports the root, public styles, props, unions and slot prop types.
  Slot values are discovered through `Component.Slot`.

Do not move code solely to satisfy this complete tree when the existing
smaller structure is already coherent.

## API

### Native wrappers

Start from the actual HTML element:

```ts
export type InputLikeProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  React.RefAttributes<HTMLInputElement> & {
    size?: InputLikeSize
    label?: string
    helperText?: string
    error?: string
  }
```

Keep native event names and payloads. Reserve only keys whose semantics the
component replaces.

### Base UI wrappers

For a transparent root, inherit the primitive:

```ts
export type PopoverProps = BasePopover.Root.Props
```

For a deliberate subset, pick it:

```ts
type ToggleStateProps = Pick<
  Toggle.Props,
  'pressed' | 'defaultPressed' | 'onPressedChange' | 'value' | 'disabled'
>
```

Do not copy a partial approximation of an upstream state contract.

### Convenience wrappers

When a compound primitive also needs a common field API, create a flat,
standalone wrapper:

```text
Select + SelectField
Autocomplete + AutocompleteField
```

The Field wrapper may simplify callback payloads if its public type explicitly
does so. Keep the advanced compound API available.

### Common prop names

Use:

- `className` for a consumer class on the public principal node;
- `label` for visible text;
- `icon` for one icon;
- `startIcon` and `endIcon` for adjacent icons;
- `helperText` and `error` for field messaging;
- `width` when the component's outer wrapper owns width;
- `disabled` from HTML or the primitive;
- `ref` typed to the actual public element.

Never use `[key: string]: unknown`. Extend the correct HTML attributes instead.

## TypeScript

Public names:

```text
ComponentProps
ComponentVariant
ComponentSize
ComponentColor
ComponentCompound
ComponentContextValue
```

Rules:

- No public `any`.
- An upstream `any` required by a Base UI generic root overload may remain in
  an internal adapter when it is not part of the emitted public compound type.
  Do not replace it with `Parameters`, `unknown` unions or copied overloads
  only to satisfy a source scan.
- Preserve generic primitive overloads with `typeof Primitive.Root`.
- Use `Pick` for deliberate upstream subsets.
- Use `Omit` only for redefined keys.
- Prefer type constraints over runtime-only documentation.
- Do not cast away a mismatch between public types and runtime behavior.
- No public props or unions derived from `RecipeVariants`.
- No public type import from a `*.css.ts` module.
- Define public token unions in `types/` or from `constants/`; make recipes
  consume the public vocabulary.

Generic compound root template:

```ts
import type { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

type AutocompleteRoot = typeof BaseAutocomplete.Root

export type AutocompleteCompound = AutocompleteRoot & {
  Input: typeof AutocompleteInput
  Content: typeof AutocompleteContent
  Item: typeof AutocompleteItem
}
```

Base UI roots are generic callable values, not necessarily
`React.FunctionComponent`s. Their type therefore may not declare React's
optional static `displayName` property, even though the property can be
assigned at runtime. When a compound wrapper exposes `displayName`, extend the
root type with that static member rather than creating a second implementation
variable or casting at the assignment:

```ts
type AutocompleteRoot = typeof BaseAutocomplete.Root & {
  displayName?: string
}

export type AutocompleteCompound = AutocompleteRoot & {
  Input: typeof AutocompleteInput
}

const Autocomplete = memo<BaseAutocomplete.Root.Props<Value>>(
  (props) => <BaseAutocomplete.Root {...props} />,
) as unknown as AutocompleteCompound

Autocomplete.displayName = 'Autocomplete'
```

This error occurs because TypeScript checks the static members of the cast
type, not the runtime object. Keep the Base UI callable and generic contract;
only add the static React metadata that the wrapper actually assigns.

When a wrapper adds behavior around a generic Base UI root, keep the public
compound root typed as `typeof BaseAutocomplete.Root`. The implementation may
use the primitive's generic props directly when needed. If Base UI's own
declaration uses `any` in an overload, preserve that upstream contract instead
of reproducing the overloads locally or adding narrowing logic unrelated to
the component's runtime behavior. Audit rules should ignore that specific
upstream adapter case while continuing to reject project-defined public
`any`.

Accessible content union template:

```ts
type AccessibleIconContent =
  | {
      label: string
      'aria-label'?: string
      startIcon?: string
      endIcon?: string
    }
  | (
      {
        label?: never
        'aria-label': string
      } & (
        | { startIcon: string; endIcon?: string }
        | { startIcon?: string; endIcon: string }
      )
    )
```

Use this only when the component intentionally supports both text and
icon-only modes. If a dedicated icon-only component exists, require `label` on
the text component instead.

## Accessibilité

### Accessible names

- Text Button: visible `label` required.
- IconButton: `'aria-label': string` required.
- Text ToggleButton: visible `label` required.
- ToggleIconButton: `'aria-label': string` required.
- A role requiring a name must require one of `label`, `aria-label` or
  `aria-labelledby`.
- Do not add hard-coded English fallback labels unless the component already
  exposes a localizable fallback contract.

### Icons

Always render library icons through `Icon`.

- No `aria-label`: Icon is decorative and hidden from assistive technology.
- With `aria-label`: Icon emits `role="img"`.
- An icon inside a named control stays decorative; the control owns the name.
- Do not manually pass `role` or `aria-hidden` to Icon.

### Forms

For field-style components:

- connect the visible label to the control;
- set `aria-invalid` only for an error;
- connect helper or error text with `aria-describedby`;
- use the shared `HelperText` behavior;
- preserve native required/disabled semantics.

### Roles and states

- Feedback defaults to `status`.
- Use `alert` only for urgent, interruptive feedback.
- Public `role="none"` means no live-region role is emitted.
- A separator synchronizes `orientation` and `aria-orientation`.
- A progressbar requires an accessible name and value attributes.
- Base UI remains responsible for its documented keyboard and ARIA behavior
  unless wrapper code demonstrably overrides it.

Progress name template:

```ts
type ProgressAccessibleName =
  | { label: string }
  | { 'aria-label': string }
  | { 'aria-labelledby': string }
```

Destructure ARIA naming props and apply them to the actual `progressbar`, not a
layout wrapper.

## Design System

Use semantic theme tokens from `vars`. Do not introduce raw palette values in
component recipes when a semantic token exists.

Color tiers:

- actions and interactive controls: semantic intents
  `primary`, `secondary`, `tertiary`, `destructive`, `success`, `warning`,
  `info`;
- decorative display components may also use
  `purple`, `pink`, `orange`, `teal`, `cyan`, `indigo`.

Do not widen action colors merely to match decorative components.

Keep shared family behavior in shared constants and recipes. A Button family
size or variant should not be reimplemented locally in IconButton.

Public `*_STYLES` exports are an established extension contract. Preserve or
add them consistently with sibling components.

## Variants

Use `variant` only for a discrete presentation axis.

Approved vocabularies:

```text
Action fill:   contained | outlined | ghost
Toggle fill:   outlined | ghost
Badge fill:    contained | subtle | outlined | outlinedSubtle
Feedback:      info | success | warning | error
Skeleton:      circular | rectangular | rounded
Tabs.List:     default | pills
```

Rules:

- `contained` means full semantic fill.
- `outlined` means border without full fill; token intensity may vary by
  family.
- `subtle` and `outlinedSubtle` belong to low-emphasis display surfaces.
- Different axes keep different words.
- Use `shape`, `orientation`, `mode` or `position` when those names are more
  precise.
- Do not add a one-value variant.

## Tailles

Approved family scales:

```text
Button / text field:       sm | md | lg          default md
IconButton:                xs | sm | md | lg     default md
Avatar:                    sm | md | lg | xl     default md
Progress:                  xs | sm | md | lg | xl default sm
Drawer:                    sm | md | lg | xl | 2xl | full default md
Icon:                      xs | sm | md | lg | xl | 2xl default md
Typography fontSize:       2xs through 6xl
```

Keep family-specific scales. Do not add keys for superficial union symmetry.
Document each public default.

## Callbacks

Callback policy:

```text
Native element     -> native callback and DOM event
Base UI primitive  -> upstream callback with every argument
Field convenience  -> simplified value callback only when typed that way
Business action    -> semantic callback such as onClose()
```

Pass-through template:

```ts
const handleValueChange = useCallback(
  (...args: Parameters<NonNullable<Props['onValueChange']>>) => {
    onValueChange?.(...args)
  },
  [onValueChange],
)
```

Never synthesize event details. Never declare a second callback argument and
then drop or replace it at runtime.

## Controlled / Uncontrolled

Approved state triplets:

```text
value / defaultValue / onValueChange
checked / defaultChecked / onCheckedChange
pressed / defaultPressed / onPressedChange
open / defaultOpen / onOpenChange
month / defaultMonth / onMonthChange
```

Custom-state template:

```ts
const [internalValue, setInternalValue] = useState(defaultValue)
const isControlled = value !== undefined
const currentValue = isControlled ? value : internalValue

const setValue = (nextValue: Value) => {
  if (!isControlled) {
    setInternalValue(nextValue)
  }
  onValueChange?.(nextValue)
}
```

Rules:

- Initialize from `default*`, never from the controlled prop.
- Controlled props win when not `undefined`.
- Fire the callback in both modes.
- Do not switch between controlled and uncontrolled behavior implicitly.
- If internal state exists and the component is publicly controllable, expose
  the complete triplet.

## Exports

Component barrel template:

```ts
export { default as Component } from './Component'
export { COMPONENT_STYLES } from './styles/Component.css'
export type { ComponentProps } from './types/Component.props'
export type {
  ComponentVariant,
  ComponentSize,
} from './types/Component.types'
export type { ComponentSlotProps } from './components/component-slot/types/ComponentSlot.props'
```

Compound template:

```ts
const Component = Root as ComponentCompound

Component.Trigger = ComponentTrigger
Component.Content = ComponentContent
```

Export rules:

- Root value at package level.
- Slot values under `Component.*`.
- Slot prop types at package level.
- Public style constants at package level.
- No duplicate flat slot values.
- `DropdownMenuPortal` is the existing documented advanced escape exception.
- Re-export the complete public theme barrel from `src/index.ts`.
- Keep helpers and local constants internal unless a consumer contract is
  demonstrated.

## Patterns approuvés

Copy these patterns:

- `Button` and `IconButton` for text/icon-only separation.
- `TextField` and `TextArea` for native wrappers.
- `Select` and `SelectField` for compound plus convenience APIs.
- `Dialog` for a Base UI compound overlay.
- `Icon` for decorative/informative icon semantics.
- `RadioGroup` for callback argument forwarding.
- `Drawer` for a custom controlled/uncontrolled root.
- shared Button and Progress constants/recipes for family reuse.

## Patterns interdits

Do not introduce:

- `[key: string]: unknown` in public props;
- public `any`;
- a public props/type dependency on `*.css.ts`, `RecipeVariants` or another
  Vanilla Extract implementation type;
- fake callback event details;
- `label?: string` on a control with no other accessible-name guarantee;
- controlled state used as an uncontrolled initializer;
- an incomplete controlled/uncontrolled triplet;
- duplicate names for the same variant axis;
- flat exports of compound slot values without a documented escape-hatch
  reason;
- ARIA roles, names or states disconnected from the corresponding visual prop;
- raw token values where semantic `vars` tokens exist;
- a new dependency abstraction when the existing Base UI or native contract
  already provides the behavior;
- a rewrite when a local standardization fixes the public inconsistency.

## Checklists

### Creating a component

- [ ] Find the closest exemplary component in the same family.
- [ ] Choose native HTML, Base UI passthrough or custom state deliberately.
- [ ] Define `ComponentProps` from the actual root element or primitive.
- [ ] Define variants/sizes/colors in `types/` and canonical values in
      `constants/`, never from the recipe.
- [ ] Choose only the variant/color/size axes the component needs.
- [ ] Reuse family constants and recipes.
- [ ] Guarantee accessible naming and semantic state.
- [ ] Implement the complete state triplet if state is exposed.
- [ ] Preserve callback payloads.
- [ ] Export component, styles, props and public unions explicitly.
- [ ] Add compound slots through the namespace.
- [ ] Type-check, lint and run relevant tests.

### Modifying a component

- [ ] Identify the current public contract before reading internals.
- [ ] Compare sibling components in the same family.
- [ ] Preserve unrelated props and behavior.
- [ ] Update types and runtime together.
- [ ] Check controlled and uncontrolled modes.
- [ ] Check callback arguments at runtime.
- [ ] Check accessible name, role, state and relationships.
- [ ] Check the package barrel and generated declaration.
- [ ] Keep the associated story coherent with the public API; when a consumer API (for example, props) changes, update the story. Story completeness can be addressed separately.
- [ ] Update only relevant tests and stories.

### Adding a feature

- [ ] Decide whether it belongs on the root, a slot or a Field wrapper.
- [ ] Reuse an existing public name for an equivalent concept.
- [ ] Avoid widening every family to support one local feature.
- [ ] Add a new variant only for a distinct observable presentation.
- [ ] Add a callback only for a distinct consumer event.
- [ ] Keep Base UI/native names when passing through their API.
- [ ] Document defaults in public types.

### Reviewing accessibility

- [ ] Can every interactive element obtain a name?
- [ ] Are internal icons decorative?
- [ ] Does every role requiring a name have one?
- [ ] Do visual state props update ARIA state?
- [ ] Are errors and help connected to controls?
- [ ] Does keyboard behavior remain owned by native HTML or Base UI?
- [ ] Are sentinel role values rendered consistently?

### Reviewing TypeScript

- [ ] No public `any` or broad string index.
- [ ] No public import from `*.css.ts` and no `RecipeVariants` public base.
- [ ] Root element and ref types match runtime.
- [ ] Generic primitive inference is preserved.
- [ ] Required runtime guarantees are required by types.
- [ ] `Omit` keys are deliberately redefined.
- [ ] Compound slots and prop types are discoverable.
- [ ] No cast hides a callback or state mismatch.

## Guide de refactoring

1. Freeze the public facts: props, values, defaults, callbacks, exports and DOM
   semantics.
2. Identify the nearest established pattern.
3. Separate genuine inconsistency from family-specific behavior.
4. State the consumer impact. If none is demonstrated, conserve.
5. Choose the smallest target API.
6. If props depend on a recipe, extract the public vocabulary into
   `constants/` and `types/` before changing behavior.
7. Change types and behavior in the same patch.
8. Update barrels and generated declarations.
9. Validate controlled/uncontrolled, callbacks and accessibility.
10. Remove old names completely when no compatibility constraint exists.
11. Do not expand the refactor into unrelated internal cleanup.

For a cross-component standardization, migrate the outlier to the dominant
pattern rather than rewriting the exemplary family.

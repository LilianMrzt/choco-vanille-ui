# Styling conventions

Use Vanilla Extract and Recipes for cohesive variant combinations. Base UI
provides interaction behavior; our theme tokens remain the source of visual
values. Sprinkles is not installed: do not assume an atomic API exists or add
one without a concrete requirement and an explicit dependency decision.

## Primitive props first

- Box, Flex, Grid, Typography and Icon are available. Inspect their actual
  contracts; do not assume another project's API.
- Inspect our rendered primitive's supported props before adding CSS. Use its existing styling API rather than redeclaring an equivalent property in a component stylesheet, including when the value is static.
- Use supported Typography props for text styling and supported Box/Flex/Grid
  props for layout. Base UI primitives are unstyled interaction building blocks,
  not substitutes for these visual APIs.
- Keep our theme tokens as prop values where applicable. Reuse existing
  shared styling definitions instead of copying another project's scales.
- When a visual primitive or styling rule does not exist, use semantic HTML
  and local Vanilla Extract styles. Do not create a wrapper or placeholder API
  by anticipation.
- Reserve component CSS for properties or exact values the rendered primitive does not support, native attribute collisions, and selectors, interaction states or responsive rules that props cannot preserve. Do not pass an inline color/background/border prop when it would override a required CSS state.
- Do not invent primitive props, expand a primitive API or add wrappers solely to avoid a legitimate CSS rule. Preserve native semantics, consumer class/style overrides and the layout when changing composition.
- After replacing CSS with props, remove unused declarations, classes, variants and imports. Keep a stylesheet only while it still owns necessary rules. Verify the rendered behavior and cascade, not just the presence of the props.

## Stylesheets and ownership

- Use Vanilla Extract `.css.ts` for styles not covered by primitive props,
  `style` and `styleVariants` for classes/variants, and Recipes when coordinated
  variants or compound variants justify it.
- Do not add runtime CSS generation, CSS modules or a second styling engine.
- Keep selectors scoped to the owning component. The existing global theme
  contract and reset are not permission to add application page styles.
- Group new component classes in a `COMPONENT_NAME_STYLES` export. Not every class requires `styleVariants`; do not rename unrelated legacy class exports.
- When a component uses shared styles, retain its own `ComponentName.css.ts` as the local styling entry point, even if it initially only composes shared classes. Put component-specific styles there and keep genuinely shared rules in `_shared/`; do not move the component's entire styling entry point into the shared folder.
- Import shared style maps in that local stylesheet and compose them into `COMPONENT_NAME_STYLES`; the component's `.tsx` consumes its local map rather than importing shared styles directly.
- New and migrated units colocate the stylesheet as defined in the
  [component anatomy](components.md#structure). Existing `styles/`
  entry points remain valid outside a requested migration.
- Name a shared component-family stylesheet `FamilyNameSharedStyles.css.ts`, with a `FAMILY_NAME_SHARED_STYLES` export.
- For shared styling with a narrower responsibility, name that responsibility
  explicitly in both the filename and export:
  `FamilySharedColors.css.ts` and `FAMILY_SHARED_COLORS_STYLES`.
- Include the visual element in the name when only that element is shared.
- Avoid ambiguous filenames such as `Shared.css.ts`, `Common.css.ts` or `Styles.css.ts`; use `Shared` only to qualify a concrete component family, not as a substitute for its name.
- Declare `style()`, `styleVariants()` and `recipe()` results in local constants first (`root`, `sizes`, `colors`, `variantStyles`, etc.), then group their references in the `COMPONENT_NAME_STYLES` export at the bottom of the file. Do not call these factories directly inside that exported object, even for small components. Preserve existing style-map keys.
- In `.css.ts` files, separate top-level `const` declarations with a blank line.
- In `.css.ts` files, write each object property on its own line, including single-property rules, nested selectors, media queries, variant maps and exported style maps. Do not compress style objects onto one line.

## Animations

- Keep component-specific `keyframes()` beside their owning styles. Extract
  genuinely reused keyframes into `src/constants/animations/`, with one
  `<name>Animation.css.ts` file exporting `<NAME>_ANIMATION`.
- Import extracted animations directly through the configured `@constants`
  alias; do not expose them through the public API solely for internal reuse.
- Keep animation usage in the consuming stylesheet: duration, easing, iteration count, animated elements and reduced-motion rules remain component-specific.
- Reuse existing keyframes when the motion matches.

## Tokens and color contracts

- Use `vars` for theme variables. Internal code imports it directly from
  `@theme/styles/contract/contract.css.ts` to avoid public-entry cycles; consumer examples
  import the public `vars` export.
  Reuse the categories and keys defined in `src/theme/`, including colors,
  spacing, typography, radii, shadows, layering and motion. Do not duplicate
  the palette or import Base UI demo themes.
- Spacing comes from `vars.space` and the internal `SPACE` object in
  `src/theme/tokens/spacing/spacing.const.ts`: keys include `none`, `px`, `xxs`, `xs`, `sm`,
  `md`, `lg` and larger steps. Values are rem-based except zero and 1px.
  There is no numeric `SPACING` contract, `spacing(n)` helper or implicit multiplier.
- Typography tokens include `fontSize`, `fontWeight`, `lineHeight` and
  `letterSpacing`; `fontSize` currently ranges from `2xs` through `7xl`.
  A token's existence does not imply every component accepts its key.
  Free CSS values remain valid where the public contract allows them;
  numbers are not token keys or spacing multipliers unless explicitly documented.
- For semantic controls, public color props express supported intent, not
  private token paths. Map each intent and interaction state to existing tokens.
  The theme uses `neutral`, `danger`, and `accent*` families. Independent
  component intents such as `tertiary`, `destructive`, or `purple` map through
  the internal `COLOR_INTENT_TOKENS` constant; an `error` feedback status maps
  to `danger` without renaming its status axis.
- Foundation/layout primitives use their documented theme color token contracts.
  Check whether `currentColor`, `transparent`, CSS shorthands or free values are
  accepted rather than assuming they are token keys. Use `style` or component
  CSS for values outside a primitive's supported contract.
- Components inheriting a primitive's styling API retain their documented public contract unless a migration is explicitly approved. Do not silently narrow accepted colors for consistency. Distinguish intentional inherited styling from the default API for new semantic controls.
- A component with a single supported palette must not inherit an unsupported color prop.
- Interaction colors must remain coherent with the selected color, not switch unconditionally to another palette. Preserve explicit consumer class/style overrides; document intentional fixed-color behavior or existing exceptions.
- Filled controls pair intent surfaces with their matching `*Foreground` tokens
  (for example `primary` and `primaryForeground`). Subtle treatments use the
  corresponding `*Subtle`, state and `*SubtleForeground` tokens. Outlined, ghost
  and text treatments must use tokens verified against their actual surfaces,
  not a filled foreground blindly reused on a neutral background.
- Do not substitute another project's `contrastText` or nested color structure
  for our flat `vars.color` contract, or translucent ghost states for filled
  hover colors.
- Keep light and dark token shapes coherent. A new token must be available
  wherever its consuming public contract supports a theme.
- Built-in color ramps use in-gamut sRGB hex values. Custom overrides still accept
  valid CSS colors in other formats. `currentColor` and `transparent` are
  explicit token keys in both themes, and are also available through `vars.color`
  and the provider's typed overrides.
- `ThemeColors` and `ThemeEditorColors` describe customizable color values;
  `LightColors` and `EditorColors` describe the literal built-in light values.
  Declare these contracts in `tokens/colors/types/index.ts`, not value modules.
- Verify built-in solid/subtle foregrounds at 4.5:1 in resting, hover, and pressed
  states, and relevant borders and focus rings at 3:1 on supported surfaces.
  A custom override or disabled opacity requires a separate contrast assessment.

## Interaction and cascade

- Preserve hover, pressed, disabled, focus-visible and reduced-motion behavior as applicable. Check both light and dark surfaces; do not remove focus outlines without an accessible replacement.
- Style Base UI state attributes and selectors according to its actual component
  contract. Preserve keyboard, focus and portal behavior when adding visual rules.
- Prefer layout primitives and static classes; use inline styles for genuine dynamic/free values, preserving caller overrides. Static values passed through supported primitive props are expected; do not replace them with ad hoc inline style objects or move other static styles into render for convenience.
- CSS class string order does not determine cascade precedence. Verify extracted
  CSS, specificity and inline overrides. The theme contract already declares a
  global token layer using `THEME_LAYER`; do not assume component layers exist
  or refer to an absent `src/theme/layers.css.ts`. Define any new layer order
  deliberately and check consumer overrides.

## Foundation contracts

- Inspect Box, Flex, Grid, Typography and Icon public types before changing
  dedicated color props. Keep theme-token styling distinct from semantic intent
  props on action components.
- Define and document color, `className` and `style` precedence when implementing
  each primitive. If a color prop produces an inline declaration, do not pass it
  when stylesheet interaction states must control that property.
- Link styling uses the existing `link`, `linkHover` and `linkActive` tokens.
  Do not invent a `link.disabled` token or silently redefine disabled semantics.
- Use `vars.color.focusRing` for shared focus styling and verify its contrast
  on the supported surfaces.

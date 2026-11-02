# Component conventions

Public organization, imports and packaging follow
[architecture conventions](architecture.md). Visual rules follow
[styling conventions](styles.md).

## Structure

Components and public compositions live under
`src/components/<category>/<component-name>/`, using the existing responsibility
categories. The following anatomy also applies to private child components.

Target structure for new components and requested v2 migrations:

```text
<category>/<component-name>/
  ComponentName.tsx
  ComponentName.css.ts
  index.ts
  types/index.ts
  constants/index.ts
  hooks/useComponent.hook.ts
  utils/name.utils.ts
  utils/resolve-name/resolveName.utils.ts
  utils/resolve-name/types/index.ts
  components/<child-name>/
```

Existing components often use `styles/`, `*.props.ts`, `*.types.ts` and
`*.const.ts`. Inspect them when changing an existing unit; migrate its owned
files and imports together when that migration is in scope. Do not reorganize
unrelated components just to match this tree.

### Naming

- Folders use kebab-case.
- Component files use PascalCase.
- Hooks use the `use*` convention.
- Utilities use `*.utils.ts`.

### Shared code

- Keep styles, types and logic close to the component that owns them.
- Shared code for independent components should live under a nearest common
  `_shared/<shared-element>/` folder.
- Organize shared elements by cohesive feature rather than by technical type.
- Use explicit and meaningful names for shared folders.
- Extract shared code only for actual reuse or an explicitly requested shared
  contract. Do not create an empty shared framework for future components.
- Existing `_common/` units remain internal until their migration is requested.

### Public vs internal API

- Do not rename public API symbols merely to match an internal shared folder.
- Shared types should use concise domain names.
- Do not add `Shared` only to reflect folder structure.
- Keep package exports meaningful and scoped.
- Do not duplicate shared definitions.
- Public props and unions must not depend on `*.css.ts`, `RecipeVariants` or
  another generated styling type. Define their vocabulary in `types/index.ts`
  or derive it from canonical `as const` values in `constants/index.ts`;
  styles consume that vocabulary, not the reverse.
- Expose compound parts through their root namespace and export their public
  prop types through barrels. Do not introduce duplicate flat slot exports.
  Review existing escape-hatch exports explicitly when migrating their owner.
- Treat documented public style maps as customization contracts, not merely
  internal implementation details.

### Type, constants and hooks

- Keep types in `types/index.ts`.
- Name component props `<ComponentName>Props` and declare them with `Readonly`.
- Keep configuration/constants in `constants/index.ts`.
- A hook or utility with its own props, types or constants has its own
  kebab-case folder under `hooks/` or `utils/`. Place its owned types and
  constants in that folder's `types/index.ts` and `constants/index.ts`.
  Reuse types owned by the component or another unit instead of duplicating
  them, and create only the files needed by that hook or utility.
- Put complex behavioral logic in dedicated hooks such as `hooks/useComponentName.hook.ts`.
- Extract pure calculations into utilities rather than React hooks.
- Tiny and immediately understandable logic may remain inline.
- Create only files and folders containing necessary code. The structure above
  is an anatomy, not a scaffolding checklist.

## API and composition

- Keep the public API consumer-friendly.
- Consumers should not need to understand internal implementation details.
- Choose composition according to consumer needs.
- Expose compound APIs only when consumers genuinely compose independent sections.
- Prefer namespaced compound parts such as:

```ts
Component.Trigger
Component.Content
```

- For compound APIs, compose subcomponents with `Object.assign(...)`.
- Use Base UI (`@base-ui/react`) for complex accessible interactions, not Radix.
  Keep our public API independent of its private implementation details.
  Inspect the installed version's composition, state attributes, event, ref and
  portal contracts rather than translating Radix patterns mechanically.
- Use Base UI's existing coordination when it covers the behavior; add local
  React context only for state actually owned and shared by our components.
  Report misuse of a compound part outside its required root explicitly.
- Reuse our existing layout, typography, icon, action, field and feedback
  primitives whenever their contracts cover the need, including inside other
  components. Inspect their contracts rather than inventing props.
- Prefer our layout primitives, including Flex and Grid; use semantic HTML
  and local styles when an existing primitive does not cover the semantics.
- Base UI supplies behavior, not our visual theme. Style it with our own tokens.
- Keep native event names and payloads on native wrappers and every documented
  callback argument on Base UI wrappers. Do not fabricate event details.
  A convenience field wrapper may simplify callbacks only through an explicit
  public contract; keep the advanced composition available when needed.

### React component rules

- Use default exports for component implementation files.
- Re-export through the component public API.
- Use `FC<Props>` via `import type` for ordinary public components.
- Components without props do not need the `FC` annotation.
- Give components without `FC` an explicit return type appropriate to their
  rendering contract. Preserve generic inference, polymorphism and ref signatures
  instead of forcing them into `FC`.
- Reuse React native attribute types when relevant; forward documented events,
  ARIA and `data-*` attributes without leaking custom props to the DOM.
- If a ref is public, forward it to the documented target with a technique
  compatible with every supported React version.
- Box and Typography may use dedicated resolution hooks for polymorphic,
  native or styling props when this complexity exists. Such hooks can accept
  complete props and return resolved rendering props; do not generalize this
  specialized pattern to ordinary components.
- For controlled/uncontrolled APIs, expose the complete supported state triplet
  (`value/defaultValue/onValueChange`, `open/defaultOpen/onOpenChange`, etc.).
  Document initial values, callbacks and state ownership. Initialize internal
  state from the default, not the controlled prop; a controlled value wins when
  it is not `undefined`, and callbacks work in both modes. Do not silently
  switch between modes.
- Keep side effects outside rendering and prefer derived values to duplicated
  state. Clean up listeners, subscriptions, timers and observers under StrictMode.
- Prefix local event handlers with `handle` and event props with `on`.
  Preserve consumer handlers and define how `preventDefault` affects internal
  behavior when composing them, including through Base UI.

## Performance and accessibility

- Consider rendering cost, DOM size and bundle impact during design, not only after implementation.
- Avoid redundant state/effects, repeated expensive work and unnecessary wrappers.
- Keep static configuration outside rendering.
- Optimize only measured or clearly identified costs.
- Use `memo`, `useMemo` and `useCallback` only when they provide a concrete benefit, not systematically.
- Preserve correctness, readable APIs and accessibility over speculative gains.
- Prefer native semantic elements and existing accessibility primitives over recreating interactions with ARIA.
- Ensure accessible names, keyboard operation, visible focus and appropriate disabled/loading/expanded states.
- For compound interactions, preserve focus movement/restoration, dismissal and relationships between trigger and content.
- Use stable, instance-safe IDs when needed.
- Do not assume Base UI covers custom behavior added around its primitives.
- Do not communicate meaning through color or icons alone.
- Account for contrast, reduced motion and long/zoomed text without hiding essential content.
- Design mobile-first for touch and constrained containers rather than assuming
  an application page layout. Preserve zoom, text direction and long content.
- Check at least 4.5:1 contrast for normal text and 3:1 for large text and
  applicable functional indicators in each supplied theme and interaction state.
- Receive text, labels and announcements from props or composition; do not
  impose an application language, translation instance or business validation.
- Document the accessible names and descriptions the consumer must provide.
  A placeholder is not a label; informative images need alternatives and
  decorative icons must be hidden from assistive technology.
- Use the library Icon contract: decorative by default, informative when
  given an accessible name. Named controls own their name; their icons remain
  decorative. Do not assume an icon-library integration not present in the code.
- Preserve theme scope in portals rather than assuming they inherit variables
  from the trigger's container. Do not modify the document theme merely to style
  a portal; preserve an explicitly documented document-level provider contract.
- Verify relevant keyboard, focus, ARIA and state behavior in targeted tests.
- Review visual accessibility in Storybook.
- Automated checks alone do not prove accessibility.

## JSDoc

- Document shared elements under `_shared/` with English JSDoc on their exported style maps, constants and types.
- Explain their role, consuming components, shared responsibilities and what remains component-specific.
- Specify units and meaningful constraints for size or layout presets.
- Keep documentation beside declarations rather than adding source-folder READMEs.
- Write complete English JSDoc beside every component, hook and utility, including internal ones, not only public exports.
- Address developers and AI agents using the documented API.
- Explain purpose, usage, defaults, side effects, constraints and edge cases.
- For components, include accessibility requirements and native prop/ref forwarding behavior where applicable.
- Do not include implementation-choice justifications, design-decision history or comparisons with rejected approaches.
- Describe observable behavior and usage requirements rather than internal wiring.
- Mention implementation details only when they impose a concrete usage constraint.
- Keep component JSDoc focused on consumer tasks.
- Do not name internal primitives, hooks, class maps or style-resolution mechanisms unless callers interact with them.
- Avoid documenting absent features or rejected variants merely to contrast another implementation.
- Mark Storybook-only components, hooks and utilities under `src/stories/` with `@internal`.
- Explicitly state that they are not part of the public package API.
- Prefer documenting public compound APIs when available rather than private implementation names.
- Document each parameter with `@param`.
- Document return values with `@returns`.
- Document generic parameters with `@template`.
- Document thrown errors with `@throws` when applicable.
- Include a concise, valid `@example` (TSX for components).
- For destructured component props, name the props object in `@param props` and
  document relevant fields with `@param props.<name>` using their actual API names.
- Keep detailed field documentation on the props type when appropriate.
- Apply tags to actual parameters, generics, return values and propagated errors;
  do not invent defaults, exceptions or usage constraints to fill a template.

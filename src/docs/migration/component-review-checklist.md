# Component Review Checklist

This document tracks the progressive review and cleanup of every exported component in the UI kit.

## Review goals

For each component we should verify the following points:

1. **Component cleanup & optimization**
   - Remove dead code, unused props and unnecessary wrappers.
   - Simplify logic, memoize expensive computations when useful.
   - Ensure types are strict and exported correctly.
   - Add a single-line JSDoc comment on every exported type variable.

2. **Style cleanup**
   - Make style files readable, understandable and easy to modify.
   - Group related tokens, use consistent naming, remove duplication.
   - Ensure recipes/variants follow the same pattern everywhere.
   - Keep **one style file per component** (`ComponentName.css.ts`).
   - Style export names must follow `SCREAMING_SNAKE_CASE` (e.g. `BUTTON_STYLES`, `CARD_HEADER_STYLES`).
   - Avoid `globalStyle` when possible; prefer component-scoped styles.

3. **Compound-component cleanup**
   - Remove compound sub-components that are not useful in this kit.
   - Keep only the sub-components that are actually used by stories or consumers.
   - Prefer a flat, explicit API when a compound pattern adds no value.
   - Reduce over-complex compound APIs (e.g. `Autocomplete` has many more sub-components than `Select`).
   - Ensure sub-component names are explicit and coherent with the rest of the kit.

4. **Storybook coverage**
   - Every story must match the component documentation.
   - Every meaningful prop must be exposed as a Storybook control.
   - For compound components, every useful sub-component must expose its own controls.
   - Include at least a default story and the main variant stories.

5. **Visual consistency**
   - Colors, spacing, borders, shadows, radii and typography must feel like one identity.
   - Cross-check against the design tokens and other components.

6. **File structure compliance**
   - Files and folders must follow `file-structure.md`.
   - Component, styles, props and types files use the correct naming and location.
   - **One style file per component**: `ComponentName.css.ts`.
   - Style export names use `SCREAMING_SNAKE_CASE` (e.g. `BUTTON_STYLES`, `CARD_HEADER_STYLES`).
   - Compound sub-components live under `components/` with their own style and type files.
   - Shared logic is placed in `hooks/`, `utils/` or `_shared/` as appropriate.
   - Imports use path aliases (`@components/...`, `@theme`, `@utils/...`).
   - Public exports are limited to the component barrel (`index.ts`).
   - Do not read files in a loop; batch I/O or use explicit imports. (Guideline for the AI reviewer — avoid re-reading files once they have already been processed.)

7. **Accessibility**
   - Respect color contrast requirements for text and interactive elements.
   - Ensure full keyboard operability (focus order, focus visibility, keyboard shortcuts).
   - Use correct semantic HTML tags and ARIA roles/states/properties where needed.
   - Provide accessible names, descriptions and live regions for screen readers.

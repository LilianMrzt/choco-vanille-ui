# Component Review Checklist

This document tracks the progressive review and cleanup of every exported component in the UI kit.

## Review goals

For each component we should verify the following points:

1. **Component cleanup & optimization**
   - Remove dead code, unused props and unnecessary wrappers.
   - Simplify logic, memoize expensive computations when useful.
   - Ensure types are strict and exported correctly.

2. **Style cleanup**
   - Make style files readable, understandable and easy to modify.
   - Group related tokens, use consistent naming, remove duplication.
   - Ensure recipes/variants follow the same pattern everywhere.
   - Keep **one style file per component** (`ComponentName.css.ts`).
   - Style export names must follow `SCREAMING_SNAKE_CASE` (e.g. `BUTTON_STYLES`, `CARD_HEADER_STYLES`).

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

## Legend

- `[ ]` — Not started
- `[-]` — In progress
- `[x]` — Done

## Actions

| Component  | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :--------- | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| Button     | [x]       | [x]    | N/A      | [x]   | [x]         | [x]       | Made `label` required; removed redundant `RefAttributes`; moved SVG reset into shared base selectors; added variant/size/color/icon stories. |
| IconButton | [x]       | [x]    | N/A      | [x]   | [x]         | [x]       | Removed redundant `RefAttributes`; moved SVG reset into shared base selectors; added variant/size/color stories. |

## Data display

| Component | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :-------- | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| Badge     | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Table     | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       |       |

## Feedback

| Component | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :-------- | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| Skeleton  | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Callout   | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `Callout.Icon`, `Callout.Title`, `Callout.Description` |
| Toast     | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `Toast.Icon`, `Toast.Title`, `Toast.Description`, `Toast.Actions`, `Toast.Close` |

## Foundation

| Component  | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :--------- | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| Icon       | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Typography | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |

## Forms

| Component    | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :----------- | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| Autocomplete | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | Many sub-components + `AutocompleteField` — review complexity vs. `Select` |
| Calendar     | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Checkbox     | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| DatePicker   | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| RadioGroup   | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Select       | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | Many sub-components + `SelectField` |
| Switch       | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| TextArea     | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `TextArea.Label`, `TextArea.StartIcon`, `TextArea.EndAction` |
| TextField    | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `TextField.Label`, `TextField.StartIcon`, `TextField.EndAction` |
| HelperText   | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |

## Layout

| Component | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :-------- | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| Box       | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Flex      | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Grid      | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Separator | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Form      | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Fieldset  | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| Legend    | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |

## Navigation

| Component | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :-------- | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| Tabs      | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `Tabs.List`, `Tabs.Trigger`, `Tabs.Content` |
| Link      | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |

## Overlay

| Component    | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :----------- | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| Tooltip      | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |
| DropdownMenu | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | Many sub-components — review naming coherence with other overlays |
| Popover      | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `Popover.Trigger`, `Popover.Content` |
| HoverCard    | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `HoverCard.Trigger`, `HoverCard.Content` |
| Dialog       | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `Dialog.Trigger`, `Dialog.Content`, `Dialog.Header`, `Dialog.Body`, `Dialog.Footer`, `Dialog.Title`, `Dialog.Description`, `Dialog.Close` |

## Surfaces

| Component   | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :---------- | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| Accordion   | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `Accordion.Item`, `Accordion.Trigger`, `Accordion.Content` |
| Card        | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `Card.Header`, `Card.Body`, `Card.Footer` |
| Collapsible | [ ]       | [ ]    | [ ]      | [ ]   | [ ]         | [ ]       | `Collapsible.Trigger`, `Collapsible.Panel` |

## Theme

| Component     | Component | Styles | Compound | Story | Consistency | Structure | Notes |
| :------------ | :-------: | :----: | :------: | :---: | :---------: | :-------: | :---- |
| ThemeProvider | [ ]       | [ ]    | N/A      | [ ]   | [ ]         | [ ]       |       |

## Quick stats

- **Total exported components:** 35
- **Compound components:** 10
- **Simple components:** 25

## How to use this checklist

1. Pick a component from the list above.
2. Create a dedicated branch or commit for that component.
3. Go through the six review goals and update the checkboxes.
4. Verify file structure against [`file-structure.md`](../file-structure.md) (naming, folders, barrels, path aliases).
5. Add notes in the last column for anything that needs a follow-up.
6. Run the existing checks before moving on:
   - `yarn typecheck`
   - `yarn lint`
   - `yarn test`
   - `yarn storybook` (verify the story renders and controls work)

> **Note:** Automated test runs are intentionally skipped during review passes. The reviewer will run tests manually when needed.

# checkbox

2026-07-06, transformation engine (hand-rolled radix wrapper, no shadcn golden pair). Migrated `Checkbox` to `@base-ui/react/checkbox`; `yarn typecheck` passes.

## Changed

- `src/components/forms/checkbox/Checkbox.tsx`
  - Replaced `@radix-ui/react-checkbox` with `@base-ui/react/checkbox`.
  - `RadixCheckbox.Root` -> `BaseCheckbox.Root`, `RadixCheckbox.Indicator` -> `BaseCheckbox.Indicator`.
  - Wrapped `onCheckedChange` so the public prop keeps its `(checked: boolean) => void` signature while Base UI emits event details.

- `src/components/forms/checkbox/types/Checkbox.props.ts`
  - `React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>` -> `Checkbox.Root.Props`.

- `src/components/forms/checkbox/Checkbox.css.ts`
  - `data-state="checked"` -> `data-checked`.
  - Added `data-indeterminate` standalone and dropdown selectors.
  - Updated dropdown checked parent selectors from `data-state="checked"` to `data-checked`.

- `src/stories/forms/checkbox/Checkbox.stories.tsx`
  - Updated docs description from `@radix-ui/react-checkbox` to `@base-ui/react/checkbox`.
  - Simplified controlled story `onCheckedChange` to `setChecked`.
  - Updated accessibility table: `checked` is now `boolean`, added `indeterminate` row.

Leftover scan (`grep -n "radix-ui\|@radix-ui\|IconPlaceholder"` on `src/components/forms/checkbox`): clean.

## Left alone

- `src/docs/migration/baseui-vs-radix.md` is a migration reference doc, not a runtime consumer.

## Behavior changes

- Base UI splits Radix's `checked: boolean | 'indeterminate'` into two props: `checked: boolean` and `indeterminate: boolean`. This wrapper keeps the public `CheckboxProps` from `Checkbox.Root.Props`, so consumers can pass `indeterminate` directly.
- `onCheckedChange` now receives a Base UI event details object internally, but the wrapper only forwards the boolean `checked` value to consumers.
- Base UI Checkbox Root renders a `<span>` (plus hidden `<input>`) instead of Radix's `<button>`. The wrapper's styles already target `data-*` attributes, so visuals are preserved.

## Verify by hand

1. Click an unchecked checkbox: it should become checked and show the check icon.
2. Click again: it should become unchecked and hide the icon.
3. Set `indeterminate={true}`: the box should use the checked/indeterminate styling.
4. Set `disabled={true}`: the checkbox should be non-interactive and have `data-disabled`.
5. Focus the checkbox: it should show the focus ring.

# Switch

2026-07-06 — transformation engine (manual) — migrated `@radix-ui/react-switch` to `@base-ui/react/switch`.

## Changed

- `src/components/forms/switch/Switch.tsx`
  - Replaced `import * as RadixSwitch from '@radix-ui/react-switch'` with `import { Switch as BaseSwitch } from '@base-ui/react/switch'`.
  - Replaced `<RadixSwitch.Root>` / `<RadixSwitch.Thumb>` with `<BaseSwitch.Root>` / `<BaseSwitch.Thumb>`.
  - Added explicit `onCheckedChange` destructuring and forwarded it with the Base UI event-details signature (`{ reason: 'none' } as never`) to keep the public callback shape unchanged.
  - Updated JSDoc to reference `@base-ui/react/switch`.

- `src/components/forms/switch/types/Switch.props.ts`
  - Replaced `React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>` with `Switch.Root.Props` from `@base-ui/react/switch`.

- `src/components/forms/switch/Switch.css.ts`
  - Renamed `data-state="checked"` selectors to `data-checked` (Base UI Switch uses boolean data attributes, not `data-state`).

- `src/stories/forms/switch/Switch.stories.tsx`
  - Updated docstring to reference `@base-ui/react/switch`.

- `tests/components/forms/switch/Switch.test.tsx`
  - Updated assertions from `data-state="checked"` / `data-state="unchecked"` to `data-checked=""` / `data-unchecked=""`.

Leftover scan:
```
grep -rn "radix-ui\|@radix-ui" src/components/forms/switch src/stories/forms/switch tests/components/forms/switch
```
→ clean (only `.migration/switch.md` and `package.json` still mention the radix package, which is removed only after the last component).

## Left alone

- `package.json`: `@radix-ui/react-switch` is kept until the final dependency sweep after all components are migrated.
- `src/docs/migration/baseui-vs-radix.md`: documentation, not runtime code.

## Behavior changes

- Base UI Switch exposes state via `data-checked` / `data-unchecked` boolean attributes instead of Radix's `data-state="checked"` / `data-state="unchecked"`. Styles and tests were updated accordingly.
- `onCheckedChange` now receives a second `eventDetails` argument; the public prop type still accepts only `(checked: boolean) => void`, so consumers are unaffected.

## Verify by hand

1. Render a Switch with and without a label; confirm the label click toggles the switch.
2. Tab to the switch and press Space to toggle.
3. Pass `disabled` and confirm clicks do not toggle.
4. Inspect the root element and confirm `data-checked` / `data-unchecked` flip on interaction.

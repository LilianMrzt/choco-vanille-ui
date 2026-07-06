# tooltip

2026-07-06, transformation engine (hand-rolled radix wrapper, no shadcn golden pair). Migrated `Tooltip` and `TooltipProvider` to `@base-ui/react/tooltip`; `yarn typecheck` passes.

## Changed

- `src/components/overlay/tooltip/Tooltip.tsx`
  - Replaced `@radix-ui/react-tooltip` with `@base-ui/react/tooltip`.
  - Restructured `Portal > Content` to `Portal > Positioner > Popup`.
  - Moved `side`, `align`, `sideOffset` from `Content` to `Positioner`.
  - Replaced `Trigger asChild` with `Trigger render={children}`.
  - Moved `delayDuration` from `Root` to `Trigger delay` (per-Root default in Base UI).
  - Wrapped `onOpenChange` so the wrapper keeps its `(open: boolean) => void` signature while Base UI emits event details.
  - Local provider fallback now passes `delay` instead of `delayDuration`.
  - Added `className="isolate"` to `Positioner` per Base UI positioning convention.

- `src/components/overlay/tooltip/components/tooltip-provider/TooltipProvider.tsx`
  - Replaced `RadixTooltip.Provider` with `BaseTooltip.Provider`.
  - Mapped `delayDuration` -> `delay`, `skipDelayDuration` -> `timeout`.
  - Removed `disableHoverableContent` (Base UI has no provider-level equivalent; use Root `disableHoverablePopup` if needed).

- `src/components/overlay/tooltip/components/tooltip-provider/types/TooltipProvider.props.ts`
  - Removed `disableHoverableContent` from the public provider props.

- `src/components/overlay/tooltip/types/Tooltip.props.ts`
  - Tightened `children` type from `ReactNode` to `ReactElement` to match the `render` prop contract.

- `src/components/overlay/tooltip/Tooltip.css.ts`
  - `--radix-tooltip-content-transform-origin` -> `--transform-origin`.
  - `data-state="delayed-open"|"instant-open"` -> `data-open`; `data-state="closed"` -> `data-closed`.

- `src/stories/overlay/tooltip/Tooltip.stories.tsx`
  - Updated docs description from `@radix-ui/react-tooltip` to `@base-ui/react/tooltip`.

Leftover scan (`grep -n "radix-ui\|@radix-ui\|IconPlaceholder"` on `src/components/overlay/tooltip`): clean.

## Left alone

- `src/hooks/use-viewport-shift/helpers/guardAccidentalSelection.helper.ts` references Radix tooltip data attributes in a comment only; unrelated to the tooltip component itself and not touched.
- `src/docs/migration/baseui-vs-radix.md` is a migration reference doc, not a runtime consumer.

## Behavior changes

- Base UI `Tooltip.Trigger` default `delay` is `600ms`; this wrapper keeps the previous default of `300ms` by forwarding `delayDuration` to `Trigger delay`.
- `onOpenChange` now receives a Base UI event details object internally, but the wrapper only forwards the boolean `open` value to consumers.
- `disableHoverableContent` is no longer available on `TooltipProvider`. Consumers relying on it must set `disableHoverablePopup` on individual `Tooltip` roots.
- Base UI uses `data-starting-style` / `data-ending-style` for enter/exit transitions. This wrapper keeps keyframe animations hooked to `data-open` / `data-closed`, which Base UI still sets.

## Verify by hand

1. Hover over a tooltip trigger: tooltip should appear after ~300ms.
2. Move the pointer directly from one trigger to an adjacent trigger: the second tooltip should open instantly (shared provider `timeout`).
3. Focus the trigger with keyboard: tooltip should appear.
4. Press `Escape`: tooltip should close.
5. Inspect the popup: it should have `role="tooltip"`, `data-open`/`data-closed`, and the arrow should point to the trigger.

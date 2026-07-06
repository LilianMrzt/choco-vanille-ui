# Dialog

2026-07-06 — transformation engine (manual) — migrated `@radix-ui/react-dialog` to `@base-ui/react/dialog`.

## Changed

- `src/components/overlay/dialog/Dialog.tsx`
  - Replaced `import * as RadixDialog from '@radix-ui/react-dialog'` with `import { Dialog as BaseDialog } from '@base-ui/react/dialog'`.
  - Replaced `<RadixDialog.Root>` with `<BaseDialog.Root>`.
  - Updated JSDoc and example to reference Base UI and the `render` prop.

- `src/components/overlay/dialog/types/Dialog.props.ts`
  - Replaced `React.ComponentPropsWithoutRef<typeof RadixDialog.Root>` with `Dialog.Root.Props` from Base UI.

- `src/components/overlay/dialog/components/dialog-trigger/DialogTrigger.tsx` + `types/DialogTrigger.props.ts`
  - Replaced Radix import with Base UI.
  - Kept the familiar `children` API and forwarded it to Base UI's `render` prop, matching the Popover wrapper pattern.

- `src/components/overlay/dialog/components/dialog-close/DialogClose.tsx` + `types/DialogClose.props.ts`
  - Same treatment as DialogTrigger: Base UI import + `children` forwarded to `render`.

- `src/components/overlay/dialog/components/dialog-content/DialogContent.tsx` + `types/DialogContent.props.ts`
  - Replaced `RadixDialog.Portal` / `RadixDialog.Overlay` / `RadixDialog.Content` with `BaseDialog.Portal` / `BaseDialog.Backdrop` / `BaseDialog.Popup`.
  - Props type now extends `Dialog.Popup.Props`.

- `src/components/overlay/dialog/components/dialog-title/DialogTitle.tsx` + `types/DialogTitle.props.ts`
  - Replaced Radix `asChild` wrapping with Base UI `Dialog.Title` wrapping a `Typography` child.
  - Props type now extends `Dialog.Title.Props`.

- `src/components/overlay/dialog/components/dialog-description/DialogDescription.tsx` + `types/DialogDescription.props.ts`
  - Same treatment as DialogTitle: Base UI `Dialog.Description` wrapping `Typography`.
  - Props type now extends `Dialog.Description.Props`.

- `src/components/overlay/dialog/components/dialog-header/DialogHeader.tsx`
  - Replaced `<DialogClose asChild><IconButton /></DialogClose>` with `<DialogClose render={<IconButton />} />`.

- `src/components/overlay/dialog/Dialog.css.ts`
  - Renamed `data-state="open"` / `data-state="closed"` selectors to `data-open` / `data-closed` (Base UI transition status attributes).

- `src/stories/overlay/dialog/Dialog.stories.tsx`
  - Updated description and all usages from `asChild` to `children`.

- `tests/components/overlay/dialog/Dialog.test.tsx`
  - Updated trigger usage from `asChild` to `children`.

Leftover scan:
```
grep -rn "@radix-ui/react-dialog" src
```
→ clean (only docs remain).

## Left alone

- `package.json` / `yarn.lock`: `@radix-ui/react-dialog` is kept until the final dependency sweep after all components are migrated.
- `src/docs/migration/baseui-vs-radix.md`: documentation, not runtime code.

## Behavior changes

- Base UI Dialog uses `Dialog.Popup` instead of `Dialog.Content` and `Dialog.Backdrop` instead of `Dialog.Overlay`.
- Base UI exposes transition status via `data-open` / `data-closed` boolean attributes instead of Radix's `data-state="open"` / `data-state="closed"`. Styles were updated accordingly.
- `Dialog.Trigger` and `Dialog.Close` keep the familiar `children` API and forward it to Base UI's `render` prop internally, matching the Popover wrapper pattern.
- `onOpenChange` in Base UI receives a second `eventDetails` argument; the public `DialogProps` still matches the Base UI signature.

## Verify by hand

1. Open the dialog via trigger, close via header close button, Escape, and backdrop click.
2. Confirm focus is trapped inside the dialog while open and returned to the trigger on close.
3. Inspect the popup and backdrop elements and confirm `data-open` / `data-closed` flip during transitions.
4. Verify the dialog has an accessible name via `aria-label` or `aria-labelledby`.

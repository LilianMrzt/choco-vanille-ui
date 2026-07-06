# hover-card

2026-07-06, transformation engine (hand-rolled radix wrapper, no shadcn golden pair). Migrated `HoverCard` to `@base-ui/react/preview-card`; `yarn typecheck` passes.

## Changed

- `src/components/overlay/hover-card/HoverCard.tsx`
  - Replaced `@radix-ui/react-hover-card` with `@base-ui/react/preview-card`.
  - `RadixHoverCard.Root` -> `PreviewCard.Root`.

- `src/components/overlay/hover-card/types/HoverCard.props.ts`
  - `React.ComponentPropsWithoutRef<typeof RadixHoverCard.Root>` -> `PreviewCard.Root.Props`.

- `src/components/overlay/hover-card/components/trigger/HoverCardTrigger.tsx`
  - `RadixHoverCard.Trigger` -> `PreviewCard.Trigger`.
  - Replaced `asChild` with `render={children}`.

- `src/components/overlay/hover-card/components/trigger/types/HoverCardTrigger.props.ts`
  - `React.ComponentPropsWithoutRef<typeof RadixHoverCard.Trigger>` -> `Omit<PreviewCard.Trigger.Props, 'render' | 'children'> & { children: ReactElement }`.

- `src/components/overlay/hover-card/components/content/HoverCardContent.tsx`
  - `RadixHoverCard.Portal`/`Content` -> `PreviewCard.Portal`/`Positioner`/`Popup`.
  - Moved `side`, `align`, `sideOffset` from `Content` to `Positioner`.
  - Replaced `avoidCollisions={false}` with `collisionAvoidance={{ side: 'none', align: 'none', fallbackAxisSide: 'none' }}`.
  - Added `className="isolate"` to `Positioner` per Base UI positioning convention.

- `src/components/overlay/hover-card/components/content/types/HoverCardContent.props.ts`
  - `React.ComponentPropsWithoutRef<typeof RadixHoverCard.Content>` -> `PreviewCard.Popup.Props & Pick<PreviewCard.Positioner.Props, 'side' | 'align' | 'sideOffset'>`.

- `src/components/overlay/hover-card/components/trigger/HoverCardTrigger.tsx`
  - Set `delay` default to `0` so hover cards open instantly unless the consumer overrides it.

- `src/stories/overlay/hover-card/HoverCard.stories.tsx`
  - Updated docs description from `@radix-ui/react-hover-card` to `@base-ui/react/preview-card`.
  - Replaced `asChild` usage with direct children.
  - Removed `openDelay`/`closeDelay` argTypes and args (delays now live on `HoverCard.Trigger` in Base UI).

- Test files updated to remove `asChild` and use children directly:
  - `tests/components/overlay/hover-card/HoverCard.test.tsx`
  - `tests/components/overlay/hover-card/components/trigger/hover-card-trigger/HoverCardTrigger.test.tsx`
  - `tests/components/overlay/hover-card/components/content/hover-card-content/HoverCardContent.test.tsx`

Leftover scan (`grep -n "radix-ui\|@radix-ui\|IconPlaceholder"` on `src/components/overlay/hover-card`): clean.

## Left alone

- `src/docs/migration/baseui-vs-radix.md` is a migration reference doc, not a runtime consumer.

## Behavior changes

- `openDelay`/`closeDelay` props moved from `HoverCard` root to `HoverCard.Trigger` (`delay`/`closeDelay`).
- `onOpenChange` now receives a Base UI event details object internally, but the wrapper keeps the public `HoverCardProps` from `PreviewCard.Root.Props`.
- Base UI Preview Card Trigger renders an `<a>` element by default; this wrapper uses the `render` prop to delegate to the consumer's element.

## Verify by hand

1. Hover over the trigger: the hover card panel should appear.
2. Move the cursor from the trigger onto the panel: it should stay open.
3. Move the cursor away: it should close after the close delay.
4. Inspect the popup: it should have `data-open`/`data-closed` and the correct `data-side`/`data-align`.

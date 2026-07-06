# tabs

2026-07-06, transformation engine (hand-rolled radix wrapper, no shadcn golden pair). Migrated `Tabs` to `@base-ui/react/tabs`; `yarn typecheck` passes.

## Changed

- `src/components/navigation/tabs/Tabs.tsx`
  - Replaced `@radix-ui/react-tabs` with `@base-ui/react/tabs`.
  - `RadixTabs.Root` -> `BaseTabs.Root`.

- `src/components/navigation/tabs/types/Tabs.props.ts`
  - `React.ComponentPropsWithRef<typeof RadixTabs.Root>` -> `Tabs.Root.Props`.

- `src/components/navigation/tabs/components/tabs-list/TabsList.tsx`
  - `RadixTabs.List` -> `BaseTabs.List`.
  - Mapped Radix `activationMode` prop to Base UI `activateOnFocus` (`automatic` -> `true`, `manual` -> `false`).

- `src/components/navigation/tabs/components/tabs-list/types/TabsList.props.ts`
  - `React.ComponentPropsWithRef<typeof RadixTabs.List>` -> `Tabs.List.Props`.
  - Added `activationMode?: 'automatic' | 'manual'` to preserve the public API.

- `src/components/navigation/tabs/components/tabs-trigger/TabsTrigger.tsx`
  - `RadixTabs.Trigger` -> `BaseTabs.Tab`.

- `src/components/navigation/tabs/components/tabs-trigger/types/TabsTrigger.props.ts`
  - `React.ComponentPropsWithRef<typeof RadixTabs.Trigger>` -> `Tabs.Tab.Props`.

- `src/components/navigation/tabs/components/tabs-content/TabsContent.tsx`
  - `RadixTabs.Content` -> `BaseTabs.Panel`.

- `src/components/navigation/tabs/components/tabs-content/types/TabsContent.props.ts`
  - `React.ComponentPropsWithRef<typeof RadixTabs.Content>` -> `Tabs.Panel.Props`.

- `src/components/navigation/tabs/components/tabs-trigger/TabsTrigger.css.ts`
  - `data-state="active"` -> `data-active`.

- `src/utils/cn.ts`
  - Extended accepted class types to include Base UI's state-function `className` form (`(state) => string | undefined`). Function values are filtered out so they are not passed to DOM elements.

- `src/stories/navigation/tabs/Tabs.stories.tsx`
  - Updated docs description from `@radix-ui/react-tabs` to `@base-ui/react/tabs`.
  - Updated `data-state` assertions to `data-active`.
  - Added `activationMode` to story args type and default value.

Leftover scan (`grep -n "radix-ui\|@radix-ui\|IconPlaceholder"` on `src/components/navigation/tabs`): clean.

## Left alone

- `src/docs/migration/baseui-vs-radix.md` is a migration reference doc, not a runtime consumer.

## Behavior changes

- Base UI defaults to manual tab activation (`activateOnFocus={false}`). This wrapper preserves the previous Radix default by setting `activateOnFocus={activationMode === 'automatic'}`.
- `onValueChange` now receives a Base UI event details object internally, but the wrapper only forwards the value to consumers (story still uses `setValue`).
- Active state is now exposed via `data-active` on tabs and `data-hidden` on panels (instead of Radix's `data-state="active"` / `data-state="inactive"`).

## Verify by hand

1. Render tabs with `defaultValue`: the matching tab should have `data-active` and its panel should be visible.
2. Click a different tab: it should become active and its panel should show.
3. With `activationMode="manual"`, arrow keys should move focus only; `Enter`/`Space` should activate.
4. With `activationMode="automatic"`, arrow keys should move focus and activate immediately.
5. Disabled tab should have `data-disabled` and not be activatable by click or keyboard.

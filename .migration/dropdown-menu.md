# dropdown-menu

2025-01-28, transformation engine, migrated to `@base-ui/react/menu` and `@base-ui/react/separator`.

## Changed

- `src/components/overlay/dropdown-menu/DropdownMenu.tsx`
  - Replaced `@radix-ui/react-dropdown-menu` `Root` with `BaseMenu.Root` from `@base-ui/react/menu`.
  - Removed `dir` prop forwarding; Base UI `Menu.Root` does not expose it.

- `src/components/overlay/dropdown-menu/index.ts`
  - Re-exported `DropdownMenuPortal` as `BaseMenu.Portal` under `verbatimModuleSyntax`.

- `src/components/overlay/dropdown-menu/components/trigger/DropdownMenuTrigger.tsx`
  - Public API remains `children`; forwarded to Base UI `Menu.Trigger` `render` prop internally, matching Popover/Dialog pattern.

- `src/components/overlay/dropdown-menu/components/content/DropdownMenuContent.tsx`
  - Migrated anatomy to `Menu.Portal` → `Menu.Positioner` → `Menu.Popup`.
  - Replaced `avoidCollisions={false}` with `collisionAvoidance={{ side: 'none', align: 'none' }}`.
  - Updated data attributes from `data-state` to `data-open`/`data-closed`.

- `src/components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.tsx`
  - Same Positioner/Popup migration as main content.

- `src/components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.tsx`
  - Replaced Radix `SubTrigger` with Base UI `Menu.SubmenuTrigger`.

- `src/components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/DropdownMenuSub.tsx`
  - Replaced Radix `Sub` with Base UI `Menu.SubmenuRoot`.

- `src/components/overlay/dropdown-menu/components/items/dropdown-menu-item/DropdownMenuItem.tsx`
  - Replaced Radix `Item` with Base UI `Menu.Item`.

- `src/components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/DropdownMenuCheckboxItem.tsx`
  - Replaced Radix `CheckboxItem` with Base UI `Menu.CheckboxItem`.
  - Replaced `onSelect` + `preventDefault` pattern with `onCheckedChange`.
  - Uses `Menu.CheckboxItemIndicator`.

- `src/components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/DropdownMenuRadioItem.tsx`
  - Replaced Radix `RadioItem` with Base UI `Menu.RadioItem`.
  - Uses `Menu.RadioItemIndicator`.

- `src/components/overlay/dropdown-menu/components/_shared/item.css.ts`
  - Shared styles for `MenuItem`, `CheckboxItem`, `RadioItem`, and `SubTrigger`.
  - Added `display: 'flex'`, `alignItems: 'center'`, and `gap: vars.space.sm` to the root so icons, label, shortcut, and trailing icons line up in a row.

- `src/components/overlay/dropdown-menu/components/groups/dropdown-menu-radio-group/DropdownMenuRadioGroup.tsx`
  - Replaced Radix `RadioGroup` with Base UI `Menu.RadioGroup`.

- `src/components/overlay/dropdown-menu/components/groups/dropdown-menu-group/DropdownMenuGroup.tsx`
  - Replaced Radix `Group` with Base UI `Menu.Group`.

- `src/components/overlay/dropdown-menu/components/label/DropdownMenuLabel.tsx`
  - Replaced Radix `Label` with Base UI `Menu.GroupLabel`.
  - Updated JSDoc to state it must be used inside `DropdownMenu.Group` or `DropdownMenu.RadioGroup`.

- `src/components/overlay/dropdown-menu/components/separator/dropdown-menu-separator/DropdownMenuSeparator.tsx`
  - Replaced Radix `Separator` with `Separator` from `@base-ui/react/separator`.

- `src/components/overlay/dropdown-menu/components/shortcut/dropdown-menu-shortcut/DropdownMenuShortcut.tsx`
  - No radix dependency; left untouched.

- `src/stories/overlay/dropdown-menu/DropdownMenu.stories.tsx`
  - Updated all `DropdownMenu.Trigger asChild` usages to `DropdownMenu.Trigger` with `children`.
  - Wrapped standalone `DropdownMenu.Label` elements inside `DropdownMenu.Group` or `DropdownMenu.RadioGroup` to satisfy Base UI context requirements.
  - Updated the docs markdown example accordingly.

- `tests/components/overlay/dropdown-menu/**/*.test.tsx`
  - Replaced all `<DropdownMenu.Trigger asChild>` with `<DropdownMenu.Trigger>`.
  - Wrapped `DropdownMenu.Label` in `DropdownMenuLabel.test.tsx` inside `DropdownMenu.Group`.

Leftover scan: `grep -n "radix-ui\|@radix-ui"` on `src/components/overlay/dropdown-menu` and `tests/components/overlay/dropdown-menu` returned no matches.

## Left alone

- `src/components/overlay/dropdown-menu/hooks/useViewportShift.ts`
  - Custom hook retained. It assumes Radix's off-screen sentinel (`-200%`) and may need review for Base UI's positioning wrapper, but it is not a radix import.

## Behavior changes

- Base UI `Menu.GroupLabel` must be rendered inside `Menu.Group` or `Menu.RadioGroup`; standalone labels outside a group now throw at runtime. Updated the story and `DropdownMenuLabel` test to wrap labels inside groups.
- Base UI `Menu.Item` does not close the menu on click by default the same way Radix did. Consumers relying on automatic close may need to call `onOpenChange` manually; flagged for manual QA.
- `dir` prop is no longer forwarded on `DropdownMenu` root.

## Verify by hand

1. Open the DropdownMenu story.
2. Use mouse and keyboard (ArrowDown, ArrowUp, Enter, Escape) to navigate items.
3. Check that checkbox items toggle and radio items select.
4. Open a submenu with the right arrow and close with left arrow / Escape.
5. Confirm focus returns to the trigger after closing.

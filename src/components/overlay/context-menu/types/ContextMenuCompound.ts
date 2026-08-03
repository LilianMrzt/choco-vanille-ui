import type { FC } from 'react'

import type ContextMenuContent from '@components/overlay/context-menu/components/content/ContextMenuContent.tsx'
import type ContextMenuTrigger from '@components/overlay/context-menu/components/trigger/ContextMenuTrigger.tsx'
import type { ContextMenuProps } from '@components/overlay/context-menu/types/ContextMenu.props.ts'
import type DropdownMenuCheckboxItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/DropdownMenuCheckboxItem.tsx'
import type DropdownMenuItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-item/DropdownMenuItem.tsx'
import type DropdownMenuRadioItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/DropdownMenuRadioItem.tsx'
import type DropdownMenuGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-group/DropdownMenuGroup.tsx'
import type DropdownMenuRadioGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-radio-group/DropdownMenuRadioGroup.tsx'
import type DropdownMenuLabel from '@components/overlay/dropdown-menu/components/label/DropdownMenuLabel.tsx'
import type DropdownMenuSeparator from '@components/overlay/dropdown-menu/components/separator/DropdownMenuSeparator.tsx'
import type DropdownMenuShortcut from '@components/overlay/dropdown-menu/components/shortcut/DropdownMenuShortcut.tsx'
import type DropdownMenuSub from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/DropdownMenuSub.tsx'
import type DropdownMenuSubContent from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.tsx'
import type DropdownMenuSubTrigger from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.tsx'

export type ContextMenuCompound = FC<ContextMenuProps> & {
    Trigger: typeof ContextMenuTrigger
    Content: typeof ContextMenuContent
    Group: typeof DropdownMenuGroup
    RadioGroup: typeof DropdownMenuRadioGroup
    Item: typeof DropdownMenuItem
    CheckboxItem: typeof DropdownMenuCheckboxItem
    RadioItem: typeof DropdownMenuRadioItem
    Label: typeof DropdownMenuLabel
    Separator: typeof DropdownMenuSeparator
    Shortcut: typeof DropdownMenuShortcut
    Sub: typeof DropdownMenuSub
    SubTrigger: typeof DropdownMenuSubTrigger
    SubContent: typeof DropdownMenuSubContent
}

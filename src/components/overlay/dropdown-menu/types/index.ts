import type { FC } from 'react'

import type DropdownMenuContent from '@components/overlay/dropdown-menu/components/content/DropdownMenuContent.tsx'
import type DropdownMenuGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-group/DropdownMenuGroup.tsx'
import type DropdownMenuRadioGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-radio-group/DropdownMenuRadioGroup.tsx'
import type DropdownMenuCheckboxItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/DropdownMenuCheckboxItem.tsx'
import type DropdownMenuItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-item/DropdownMenuItem.tsx'
import type DropdownMenuRadioItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/DropdownMenuRadioItem.tsx'
import type DropdownMenuLabel from '@components/overlay/dropdown-menu/components/label/DropdownMenuLabel.tsx'
import type DropdownMenuSeparator from '@components/overlay/dropdown-menu/components/separator/DropdownMenuSeparator.tsx'
import type DropdownMenuShortcut from '@components/overlay/dropdown-menu/components/shortcut/DropdownMenuShortcut.tsx'
import type DropdownMenuSubContent from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.tsx'
import type DropdownMenuSub from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/DropdownMenuSub.tsx'
import type DropdownMenuSubTrigger from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.tsx'
import type DropdownMenuTrigger from '@components/overlay/dropdown-menu/components/trigger/DropdownMenuTrigger.tsx'
import type { DropdownMenuProps } from '@components/overlay/dropdown-menu/types/DropdownMenu.props.ts'

export type DropdownMenuCompound = FC<DropdownMenuProps> & {
    Trigger: typeof DropdownMenuTrigger
    Content: typeof DropdownMenuContent
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

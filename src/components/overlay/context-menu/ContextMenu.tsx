import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { memo, useMemo, useState } from 'react'

import DropdownMenuCheckboxItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/DropdownMenuCheckboxItem.tsx'
import DropdownMenuItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-item/DropdownMenuItem.tsx'
import DropdownMenuRadioItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/DropdownMenuRadioItem.tsx'
import DropdownMenuGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-group/DropdownMenuGroup.tsx'
import DropdownMenuRadioGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-radio-group/DropdownMenuRadioGroup.tsx'
import DropdownMenuLabel from '@components/overlay/dropdown-menu/components/label/DropdownMenuLabel.tsx'
import DropdownMenuSeparator from '@components/overlay/dropdown-menu/components/separator/DropdownMenuSeparator.tsx'
import DropdownMenuShortcut from '@components/overlay/dropdown-menu/components/shortcut/DropdownMenuShortcut.tsx'
import DropdownMenuSub from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/DropdownMenuSub.tsx'
import DropdownMenuSubContent from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.tsx'
import DropdownMenuSubTrigger from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.tsx'
import ContextMenuContent from '@components/overlay/context-menu/components/content/ContextMenuContent.tsx'
import ContextMenuTrigger from '@components/overlay/context-menu/components/trigger/ContextMenuTrigger.tsx'
import type { ContextMenuCompound } from '@components/overlay/context-menu/types/ContextMenuCompound.ts'
import type { ContextMenuProps } from '@components/overlay/context-menu/types/ContextMenu.props.ts'
import {
    ContextMenuContext,
    type ContextMenuInputModality,
} from '@components/overlay/context-menu/context/ContextMenu.context.ts'

/**
 * Right-click context-menu compound backed by Base UI ContextMenu. Shares
 * its item and group slot components with `DropdownMenu`.
 *
 * Compound slots: `ContextMenu.Trigger`, `.Content`, `.Group`,
 * `.RadioGroup`, `.Item`, `.CheckboxItem`, `.RadioItem`, `.Label`,
 * `.Separator`, `.Shortcut`, `.Sub`, `.SubTrigger`, `.SubContent`.
 */
const ContextMenu = memo<ContextMenuProps>((props) => {
    const [inputModality, setInputModality] = useState<ContextMenuInputModality>('pointer')
    const contextValue = useMemo(
        () => ({ inputModality, setInputModality }),
        [inputModality],
    )

    return (
        <ContextMenuContext.Provider value={contextValue}>
            <BaseContextMenu.Root {...props} />
        </ContextMenuContext.Provider>
    )
}) as unknown as ContextMenuCompound

ContextMenu.displayName = 'ContextMenu'
ContextMenu.Trigger = ContextMenuTrigger
ContextMenu.Content = ContextMenuContent
ContextMenu.Group = DropdownMenuGroup
ContextMenu.RadioGroup = DropdownMenuRadioGroup
ContextMenu.Item = DropdownMenuItem
ContextMenu.CheckboxItem = DropdownMenuCheckboxItem
ContextMenu.RadioItem = DropdownMenuRadioItem
ContextMenu.Label = DropdownMenuLabel
ContextMenu.Separator = DropdownMenuSeparator
ContextMenu.Shortcut = DropdownMenuShortcut
ContextMenu.Sub = DropdownMenuSub
ContextMenu.SubTrigger = DropdownMenuSubTrigger
ContextMenu.SubContent = DropdownMenuSubContent

export default ContextMenu

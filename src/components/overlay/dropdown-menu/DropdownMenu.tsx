import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo } from 'react'

import DropdownMenuContent from '@components/overlay/dropdown-menu/components/content/DropdownMenuContent.tsx'
import DropdownMenuGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-group/DropdownMenuGroup.tsx'
import DropdownMenuRadioGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-radio-group/DropdownMenuRadioGroup.tsx'
import DropdownMenuCheckboxItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/DropdownMenuCheckboxItem.tsx'
import DropdownMenuItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-item/DropdownMenuItem.tsx'
import DropdownMenuRadioItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/DropdownMenuRadioItem.tsx'
import DropdownMenuLabel from '@components/overlay/dropdown-menu/components/label/DropdownMenuLabel.tsx'
import DropdownMenuSeparator from '@components/overlay/dropdown-menu/components/separator/DropdownMenuSeparator.tsx'
import DropdownMenuShortcut from '@components/overlay/dropdown-menu/components/shortcut/DropdownMenuShortcut.tsx'
import DropdownMenuSubContent from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.tsx'
import DropdownMenuSub from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/DropdownMenuSub.tsx'
import DropdownMenuSubTrigger from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.tsx'
import DropdownMenuTrigger from '@components/overlay/dropdown-menu/components/trigger/DropdownMenuTrigger.tsx'
import type { DropdownMenuCompound } from '@components/overlay/dropdown-menu/types'
import type { DropdownMenuProps } from '@components/overlay/dropdown-menu/types/DropdownMenu.props.ts'

/**
 * The root wrapper that manages open/close state.
 * Accepts `open`, `onOpenChange`, `defaultOpen` and `modal` from Base UI Menu.
 */
const DropdownMenu = memo<DropdownMenuProps>((props) => (
    <BaseMenu.Root {...props} />
)) as unknown as DropdownMenuCompound

DropdownMenu.displayName = 'DropdownMenu'
DropdownMenu.Trigger = DropdownMenuTrigger
DropdownMenu.Content = DropdownMenuContent
DropdownMenu.Group = DropdownMenuGroup
DropdownMenu.RadioGroup = DropdownMenuRadioGroup
DropdownMenu.Item = DropdownMenuItem
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem
DropdownMenu.RadioItem = DropdownMenuRadioItem
DropdownMenu.Label = DropdownMenuLabel
DropdownMenu.Separator = DropdownMenuSeparator
DropdownMenu.Shortcut = DropdownMenuShortcut
DropdownMenu.Sub = DropdownMenuSub
DropdownMenu.SubTrigger = DropdownMenuSubTrigger
DropdownMenu.SubContent = DropdownMenuSubContent

export default DropdownMenu

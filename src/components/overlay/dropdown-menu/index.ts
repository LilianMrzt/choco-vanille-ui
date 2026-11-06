export { default as DropdownMenu } from '@components/overlay/dropdown-menu/DropdownMenu.tsx'

/** Re-export Base UI Portal for advanced use-cases. */
import { Menu as BaseMenu } from '@base-ui/react/menu'

export const DropdownMenuPortal = BaseMenu.Portal

export type { DropdownMenuProps, DropdownMenuAlign, DropdownMenuSide } from '@components/overlay/dropdown-menu/types'
export type { DropdownMenuTriggerProps } from '@components/overlay/dropdown-menu/components/trigger/types'
export type { DropdownMenuContentProps } from '@components/overlay/dropdown-menu/components/content/types'
export type { DropdownMenuGroupProps } from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-group/types'
export type { DropdownMenuRadioGroupProps } from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-radio-group/types'
export type { DropdownMenuItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-item/types'
export type { DropdownMenuCheckboxItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/types'
export type { DropdownMenuRadioItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/types'
export type { DropdownMenuLabelProps } from '@components/overlay/dropdown-menu/components/label/types'
export type { DropdownMenuSeparatorProps } from '@components/overlay/dropdown-menu/components/separator/types'
export type { DropdownMenuShortcutProps } from '@components/overlay/dropdown-menu/components/shortcut/types'
export type { DropdownMenuSubProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/types'
export type { DropdownMenuSubTriggerProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/types'
export type { DropdownMenuSubContentProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/types'

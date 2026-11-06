import type { DropdownMenuProps, DropdownMenuAlign, DropdownMenuSide } from '@components/overlay/dropdown-menu'

export type DropdownMenuStoryArgs = DropdownMenuProps & {
    triggerLabel: string
    itemLabel: string
    destructive: boolean
    showCheckbox: boolean
    side: DropdownMenuSide
    align: DropdownMenuAlign
}

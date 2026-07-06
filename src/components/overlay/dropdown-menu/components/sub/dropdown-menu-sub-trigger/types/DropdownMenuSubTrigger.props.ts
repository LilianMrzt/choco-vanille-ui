import type { Menu } from '@base-ui/react/menu'

export type DropdownMenuSubTriggerProps = Omit<Menu.SubmenuTrigger.Props, 'children'> & {
    /** Text label of the trigger. */
    label: string
    /** Iconify icon identifier rendered on the left side. */
    startIcon?: string
}

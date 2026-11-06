import type { Menu } from '@base-ui/react/menu'
import type { IconComponent } from '@components/foundation/icon'

export type DropdownMenuSubTriggerProps = Omit<Menu.SubmenuTrigger.Props, 'children'> & {
    /** Text label of the trigger. */
    label: string
    /** Iconify icon identifier rendered on the left side. */
    startIcon?: IconComponent
}

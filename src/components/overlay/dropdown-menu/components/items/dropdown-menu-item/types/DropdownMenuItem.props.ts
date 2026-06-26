import type * as React from 'react'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

export type DropdownMenuItemProps = Omit<React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>, 'children'> & {
    /** Text label of the item. */
    label: string
    /** Renders the item with a destructive (danger) visual style. */
    destructive?: boolean
    /** Iconify icon identifier rendered on the left side of the item. */
    startIcon?: string
    /** Iconify icon identifier rendered on the right side of the item. */
    endIcon?: string
    /** Keyboard shortcut hint rendered on the right. */
    shortcut?: string
}

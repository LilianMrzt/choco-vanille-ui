import type * as React from 'react'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item> & {
    /** Renders the item with a destructive (danger) visual style. */
    destructive?: boolean
    /** Icon rendered on the left side of the item. */
    startIcon?: React.ReactNode
    /** Icon rendered on the right side of the item. */
    endIcon?: React.ReactNode
    /** Keyboard shortcut hint rendered on the right. */
    shortcut?: string
}

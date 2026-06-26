import type * as React from 'react'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

export type DropdownMenuSubTriggerProps = Omit<React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger>, 'children'> & {
    /** Text label of the trigger. */
    label: string
    /** Iconify icon identifier rendered on the left side. */
    startIcon?: string
}

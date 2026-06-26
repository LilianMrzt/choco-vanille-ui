import type * as React from 'react'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger> & {
    /** Icon rendered on the left side. */
    startIcon?: React.ReactNode
}

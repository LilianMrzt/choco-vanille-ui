import type * as React from 'react'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import type { DropdownMenuAlign, DropdownMenuSide } from '@components/overlay/dropdown-menu/types/DropdownMenu.types.ts'

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content> & {
    /** Side of the trigger to render the content. @default 'bottom' */
    side?: DropdownMenuSide
    /** Alignment along the trigger axis. @default 'start' */
    align?: DropdownMenuAlign
    /** Offset in pixels from the trigger. @default 6 */
    sideOffset?: number
}

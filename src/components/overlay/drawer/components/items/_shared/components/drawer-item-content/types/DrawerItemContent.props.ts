import type { ReactNode } from 'react'

import type { IconSize } from '@components/foundation/icon'

/** Props for `DrawerItemContent`. */
export type DrawerItemContentProps = {
    /** Visible text label. */
    label: string
    /** Icon rendered before the label. */
    startIcon: string
    /** Optional icon rendered at the end of the row. */
    endChevronIcon?: boolean
    /** Whether the drawer item is expanded. */
    expanded?: boolean
    /** Size of the start/end icons. Defaults to the row size mapping. */
    iconSize?: IconSize
    /** Optional content rendered before the end icon (e.g. a badge). */
    trailing?: ReactNode
}

import type { ReactNode } from 'react'

import type { IconifyIcon, IconSize } from '@components/foundation/icon'

/** Props for `DrawerItemContent`. */
export type DrawerItemContentProps = {
    /** Visible text label. */
    label: string
    /** Icon rendered before the label. */
    startIcon: IconifyIcon
    /** Icon rendered after the label and trailing content. */
    endIcon?: IconifyIcon
    /** Optional icon rendered at the end of the row. */
    endChevronIcon?: boolean
    /** Whether the drawer item is expanded. */
    expanded?: boolean
    /** Font-size token for the start/end icons. Defaults to 16. */
    iconSize?: IconSize
    /** Optional content rendered before the end icon (e.g. a badge). */
    trailing?: ReactNode
}

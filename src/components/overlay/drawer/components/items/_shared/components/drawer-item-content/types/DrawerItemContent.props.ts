import type { ReactNode } from 'react'

import type { IconSize } from '@components/foundation/icon'
import type { DrawerItemSize } from '@components/overlay/drawer/components/items/_shared'

/** Props for `DrawerItemContent`. */
export type DrawerItemContentProps = {
    /** Visible text label. */
    label: string
    /** Icon rendered before the label. */
    startIcon: string
    /** Optional icon rendered after the label. */
    endIcon?: string
    /** Size preset for the row. @default 'md' */
    size?: DrawerItemSize
    /** Size of the start/end icons. Defaults to the row size mapping. */
    iconSize?: IconSize
    /** Optional content rendered after the label, overrides `endIcon`. */
    trailing?: ReactNode
}

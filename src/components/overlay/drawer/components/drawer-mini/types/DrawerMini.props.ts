import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import type { DrawerPosition, DrawerSize } from '@components/overlay/drawer/types'

/** Props for the mini drawer renderer. */
export type DrawerMiniProps = HTMLAttributes<HTMLDivElement> & {
    /** Current open state. */
    open: boolean
    /** Side the drawer attaches to. */
    position: DrawerPosition
    /** Width preset. */
    size: DrawerSize
    /** Width of the drawer when collapsed. */
    collapsedSize: CSSProperties['width']
    /** Maps a size preset to a CSS width value. */
    sizeWidthMap: Record<DrawerSize, string>
    /** Accessible name used when no visible title is present. */
    accessibleName: string | undefined
    /** Accessible labelled-by id. */
    ariaLabelledBy: string | undefined
    /** Drawer content. */
    children?: ReactNode
    /** Optional inline styles. */
    style?: CSSProperties
}

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import type { DrawerPosition, DrawerSize } from '@components/overlay/drawer/types'

/** Props for the inline drawer renderer. */
export type DrawerInlineProps = HTMLAttributes<HTMLDivElement> & {
    /** Current open state. */
    open: boolean
    /** Side the drawer attaches to. */
    position: DrawerPosition
    /** Width preset. */
    size: DrawerSize
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

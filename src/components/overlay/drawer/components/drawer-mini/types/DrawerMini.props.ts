import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import type { DrawerRecipeVariants } from '@components/overlay/drawer/styles/Drawer.css.ts'
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
    /** Theme color token applied to the drawer panel background. */
    backgroundColor?: DrawerRecipeVariants['backgroundColor']
    /** Accessible name used when no visible title is present. */
    accessibleName: string | undefined
    /** Accessible labelled-by id. */
    ariaLabelledBy: string | undefined
    /** Drawer content. */
    children?: ReactNode
    /** Optional inline styles. */
    style?: CSSProperties
}

import type { Menu } from '@base-ui/react/menu'

import type { DropdownMenuAlign, DropdownMenuSide } from '@components/overlay/dropdown-menu/types/DropdownMenu.types.ts'
import type { CSSProperties } from 'react'

export type DropdownMenuContentProps = Menu.Positioner.Props & {
    /** Side of the trigger to render the content. @default 'bottom' */
    side?: DropdownMenuSide
    /** Alignment along the trigger axis. @default 'start' */
    align?: DropdownMenuAlign
    /** Offset in pixels from the trigger. @default 6 */
    sideOffset?: number
    /**
     * Distance in pixels from the viewport edges used for collision detection.
     * The menu shifts inward by exactly the overflowing amount to always stay
     * fully visible — without flipping to the opposite side.
     * Accepts a uniform number or per-side object.
     * @default 8
     */
    collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number }
    /** Fixed width of the dropdown panel. @default '14rem' */
    width?: CSSProperties['width']
}

import type { Menu } from '@base-ui/react/menu'
import type { CSSProperties } from 'react'

export type ContextMenuContentProps = Readonly<Menu.Positioner.Props & {
    /** Offset in pixels from the pointer. @default 4 */
    sideOffset?: number
    /**
     * Distance in pixels from the viewport edges used for collision detection.
     * @default 8
     */
    collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number }
    /** Fixed width of the context menu panel. @default '14rem' */
    width?: CSSProperties['width']
}>

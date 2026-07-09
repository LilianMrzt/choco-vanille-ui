import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type { AriaRole } from 'react'

/** Props for `Drawer.Body`. */
export type DrawerBodyProps = Omit<BoxProps, 'as'> & {
    /** The HTML element to render. @default 'div' */
    as?: 'div' | 'section' | 'nav'
    /**
     * Accessible role for the body.
     * When `as="nav"` and no role is provided, it defaults to `navigation`.
     */
    role?: AriaRole
}

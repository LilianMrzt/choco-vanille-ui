import type * as React from 'react'
import type { Select as BaseSelect } from '@base-ui/react/select'

/** Props for the styled content (listbox popup). */
export type SelectContentProps = Pick<
    BaseSelect.Positioner.Props,
    'side' | 'align' | 'sideOffset' | 'collisionAvoidance'
> & {
    className?: string
    children?: React.ReactNode
    /** Collision margin in px passed to `useViewportShift`. */
    collisionPadding?: number
    /** Accessible name for the select listbox popup. */
    listboxAriaLabel?: string
}

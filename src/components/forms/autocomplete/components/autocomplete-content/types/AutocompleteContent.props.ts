import type * as React from 'react'
import type { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

/** Props for the styled autocomplete popup content. */
export type AutocompleteContentProps = Pick<
    BaseAutocomplete.Positioner.Props,
    'side' | 'align' | 'sideOffset'
> & {
    className?: string
    children?: React.ReactNode
    /** Collision margin in px passed to `useViewportShift`. */
    collisionPadding?: number
    /** Accessible name for the autocomplete listbox popup. */
    listboxAriaLabel?: string
}

import { type MouseEvent } from 'react'
import type { DrawerNavItemProps } from '@components'

export type UseDrawerNavItemParams = Pick<
    DrawerNavItemProps,
    'active' | 'disabled' | 'iconSize' | 'onClick'
>

export type UseDrawerNavItemReturn = {
    /** Whether the parent drawer is currently open. */
    open: boolean
    /** Attributes to spread on the anchor element. */
    linkAttributes: {
        'data-state': 'open' | 'closed'
        'data-mode': string
        'data-position': string
        'data-active': 'true' | undefined
        'aria-disabled': true | undefined
        'aria-current': 'page' | undefined
    }
    /** Click handler that supports the optional `onClick` callback. */
    handleClick: (event: MouseEvent<HTMLAnchorElement>) => void
}

import { useMemo, type MouseEvent } from 'react'

import type { DrawerNavItemProps } from '@components/overlay/drawer/components/items/drawer-nav-item/types/DrawerNavItem.props.ts'
import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared'

type UseDrawerNavItemParams = Pick<
    DrawerNavItemProps,
    'active' | 'disabled' | 'size' | 'iconSize' | 'onClick'
>

type UseDrawerNavItemReturn = {
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

/**
 * Encapsulates the state and accessibility logic for a `Drawer.NavItem`.
 */
export const useDrawerNavItem = ({
    active,
    disabled,
    size = 'md',
    iconSize,
    onClick,
}: UseDrawerNavItemParams): UseDrawerNavItemReturn => {
    const { itemAttributes } = useDrawerItemAttributes(size, iconSize)

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            event.preventDefault()
            onClick(event)
        }
    }

    const linkAttributes = useMemo(
        () => ({
            ...itemAttributes,
            'data-active': active ? ('true' as const) : undefined,
            'aria-disabled': disabled || undefined,
            'aria-current': active ? ('page' as const) : undefined,
        }),
        [itemAttributes, active, disabled],
    )

    return {
        linkAttributes,
        handleClick,
    }
}

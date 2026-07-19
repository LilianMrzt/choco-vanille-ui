import { useCallback, useMemo, type MouseEvent } from 'react'

import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared'
import type {
    UseDrawerNavItemParams,
    UseDrawerNavItemReturn
} from '@components/overlay/drawer/components/items/drawer-nav-item/hooks/use-drawer-nav-item/types'

/**
 * Encapsulates the state and accessibility logic for a `Drawer.NavItem`.
 */
export const useDrawerNavItem = ({
    active,
    disabled,
    iconSize,
    onClick,
}: UseDrawerNavItemParams): UseDrawerNavItemReturn => {
    const { open, itemAttributes } = useDrawerItemAttributes(iconSize)

    const handleClick = useCallback(
        (event: MouseEvent<HTMLAnchorElement>) => {
            if (disabled) {
                event.preventDefault()
                return
            }

            if (onClick) {
                event.preventDefault()
                onClick(event)
            }
        },
        [disabled, onClick],
    )

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
        open,
        linkAttributes,
        handleClick,
    }
}

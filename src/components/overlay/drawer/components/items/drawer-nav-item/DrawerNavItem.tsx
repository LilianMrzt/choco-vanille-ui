import { useMemo, type FC, type MouseEvent } from 'react'

import { DRAWER_NAV_ITEM_STYLES } from '@components/overlay/drawer/components/items/drawer-nav-item/DrawerNavItem.css.ts'
import type { DrawerNavItemProps } from '@components/overlay/drawer/components/items/drawer-nav-item/types/DrawerNavItem.props.ts'
import {
    DrawerItemContent,
    useDrawerItemAttributes,
} from '@components/overlay/drawer/components/items/_shared'
import { cn } from '@utils/cn.ts'

/**
 * A navigation row rendered inside a `Drawer`.
 *
 * Behaves like a link, supports icons, an active state and graceful close
 * animation when the drawer is dismissed.
 */
const DrawerNavItem: FC<DrawerNavItemProps> = ({
    label,
    href = '#',
    startIcon,
    endIcon,
    active,
    disabled,
    size = 'md',
    iconSize,
    className,
    style,
    onClick,
    ref,
    ...props
}) => {
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
            'data-active': active ? 'true' : undefined,
            'aria-disabled': disabled || undefined,
            'aria-current': active ? ('page' as const) : undefined,
        }),
        [itemAttributes, active, disabled],
    )

    return (
        <a
            ref={ref}
            href={href}
            className={cn(DRAWER_NAV_ITEM_STYLES.recipe({ size }), className)}
            style={style}
            onClick={handleClick}
            {...linkAttributes}
            {...props}
        >
            <DrawerItemContent
                label={label}
                startIcon={startIcon}
                endIcon={endIcon}
                size={size}
                iconSize={iconSize}
            />
        </a>
    )
}

DrawerNavItem.displayName = 'Drawer.NavItem'

export default DrawerNavItem

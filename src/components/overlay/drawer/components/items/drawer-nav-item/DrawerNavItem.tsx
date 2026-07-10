import { memo, type FC } from 'react'

import { useDrawerNavItem } from '@components/overlay/drawer/components/items/drawer-nav-item/hooks/use-drawer-nav-item/useDrawerNavItem.hook.ts'
import type { DrawerNavItemProps } from '@components/overlay/drawer/components/items/drawer-nav-item/types/DrawerNavItem.props.ts'
import { DRAWER_ITEM_STYLES, DrawerItemContent } from '@components/overlay/drawer/components/items/_shared'
import { cn } from '@utils/cn.ts'

/**
 * A navigation row rendered inside a `Drawer`.
 *
 * Behaves like a link, supports icons, an active state and graceful close
 * animation when the drawer is dismissed.
 */
const DrawerNavItem: FC<DrawerNavItemProps> = memo(({
    label,
    href = '#',
    startIcon,
    trailing,
    active,
    disabled,
    size = 'md',
    variant = 'default',
    color = 'primary',
    iconSize,
    className,
    style,
    onClick,
    ref,
    ...props
}) => {
    const { linkAttributes, handleClick } = useDrawerNavItem({
        active,
        disabled,
        size,
        iconSize,
        onClick,
    })

    return (
        <a
            ref={ref}
            href={href}
            className={cn(
                DRAWER_ITEM_STYLES.recipe({ size, variant, color }),
                className,
            )}
            style={style}
            onClick={handleClick}
            {...linkAttributes}
            {...props}
        >
            <DrawerItemContent
                label={label}
                startIcon={startIcon}
                trailing={trailing}
                size={size}
                iconSize={iconSize}
            />
        </a>
    )
})

DrawerNavItem.displayName = 'Drawer.NavItem'

export default DrawerNavItem

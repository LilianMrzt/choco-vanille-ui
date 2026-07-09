import { useMemo, type FC, type MouseEvent } from 'react'

import { Icon } from '@components/foundation/icon'
import {
    DRAWER_ITEM_SIZE_TO_ICON_SIZE,
    DRAWER_ITEM_STYLES,
    DrawerItemTooltip,
    useDrawerItemState,
} from '@components/overlay/drawer/components/items/drawer-item'
import type { DrawerNavItemProps } from '@components/overlay/drawer/components/items/drawer-nav-item/types/DrawerNavItem.props.ts'
import { DRAWER_MODES } from '@components/overlay/drawer/constants'
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
    const { open, mode, position } = useDrawerItemState()
    const resolvedIconSize = iconSize ?? DRAWER_ITEM_SIZE_TO_ICON_SIZE[size]
    const state = open ? 'open' : 'closed'
    const isMiniCollapsed = mode === DRAWER_MODES.mini && !open

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            event.preventDefault()
            onClick(event)
        }
    }

    const itemAttributes = useMemo(
        () => ({
            'data-state': state,
            'data-mode': mode,
            'data-position': position,
            'data-active': active ? 'true' : undefined,
            'aria-disabled': disabled || undefined,
            'aria-current': active ? ('page' as const) : undefined,
        }),
        [state, mode, position, active, disabled],
    )

    const item = (
        <a
            ref={ref}
            href={href}
            className={cn(DRAWER_ITEM_STYLES.recipe({ size }), className)}
            style={style}
            onClick={handleClick}
            {...itemAttributes}
            {...props}
            aria-label={isMiniCollapsed ? (props['aria-label'] ?? label) : props['aria-label']}
        >
            <Icon
                icon={startIcon}
                size={resolvedIconSize}
                className={DRAWER_ITEM_STYLES.icon}
            />
            {!isMiniCollapsed && (
                <span
                    className={DRAWER_ITEM_STYLES.label}
                    data-state={state}
                    data-mode={mode}
                >
                    {label}
                </span>
            )}
            {endIcon && !isMiniCollapsed && (
                <Icon
                    icon={endIcon}
                    size={resolvedIconSize}
                    className={DRAWER_ITEM_STYLES.endIcon}
                    data-state={state}
                    data-mode={mode}
                />
            )}
        </a>
    )

    return (
        <DrawerItemTooltip content={label}>
            {item}
        </DrawerItemTooltip>
    )
}

DrawerNavItem.displayName = 'Drawer.NavItem'

export default DrawerNavItem

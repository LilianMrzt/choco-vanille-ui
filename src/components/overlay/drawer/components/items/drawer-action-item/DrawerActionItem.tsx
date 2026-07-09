import { useMemo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import {
    DRAWER_ITEM_SIZE_TO_ICON_SIZE,
    DRAWER_ITEM_STYLES,
    DrawerItemTooltip,
    useDrawerItemState,
} from '@components/overlay/drawer/components/items/drawer-item'
import type { DrawerActionItemProps } from '@components/overlay/drawer/components/items/drawer-action-item/types/DrawerActionItem.props.ts'
import { DRAWER_MODES } from '@components/overlay/drawer/constants'
import { cn } from '@utils/cn.ts'

/**
 * A button-like action row rendered inside a `Drawer`.
 *
 * Useful for actions that do not navigate, such as "Sign out" or "Toggle theme".
 */
const DrawerActionItem: FC<DrawerActionItemProps> = ({
    label,
    startIcon,
    endIcon,
    size = 'md',
    iconSize,
    disabled,
    className,
    style,
    ref,
    ...props
}) => {
    const { open, mode, position } = useDrawerItemState()
    const resolvedIconSize = iconSize ?? DRAWER_ITEM_SIZE_TO_ICON_SIZE[size]
    const state = open ? 'open' : 'closed'
    const isMiniCollapsed = mode === DRAWER_MODES.mini && !open

    const itemAttributes = useMemo(
        () => ({
            'data-state': state,
            'data-mode': mode,
            'data-position': position,
        }),
        [state, mode, position],
    )

    const item = (
        <button
            ref={ref}
            type={'button'}
            disabled={disabled}
            className={cn(DRAWER_ITEM_STYLES.recipe({ size }), className)}
            style={style}
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
        </button>
    )

    return (
        <DrawerItemTooltip content={label}>
            {item}
        </DrawerItemTooltip>
    )
}

DrawerActionItem.displayName = 'Drawer.ActionItem'

export default DrawerActionItem

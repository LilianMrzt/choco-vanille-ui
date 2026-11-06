import { memo, type FC } from 'react'

import type { DrawerActionItemProps } from '@components/overlay/drawer/components/items/drawer-action-item/types'
import {
    DRAWER_ITEM_STYLES,
    DrawerItemContent,
    useDrawerItemAttributes,
} from '@components/overlay/drawer/components/items/_shared'
import { cn } from '@utils/cn.ts'
import { Tooltip } from '@components'

/**
 * A button-like action row rendered inside a `Drawer`.
 *
 * Useful for actions that do not navigate, such as "Sign out" or "Toggle theme".
 */
const DrawerActionItem: FC<DrawerActionItemProps> = memo(({
    label,
    startIcon,
    endIcon,
    trailing,
    hideTooltip = false,
    variant = 'default',
    color = 'primary',
    iconSize,
    disabled,
    className,
    style,
    ref,
    ...props
}) => {
    const { open, itemAttributes } = useDrawerItemAttributes(iconSize)

    return (
        <Tooltip
            position={'right'}
            content={label}
            disabled={open || hideTooltip}
        >
            <button
                ref={ref}
                type={'button'}
                disabled={disabled}
                aria-label={open ? undefined : label}
                className={cn(
                    DRAWER_ITEM_STYLES.recipe({ variant, color }),
                    className,
                )}
                style={style}
                {...itemAttributes}
                {...props}
            >
                <DrawerItemContent
                    label={label}
                    startIcon={startIcon}
                    endIcon={endIcon}
                    trailing={trailing}
                    iconSize={iconSize}
                />
            </button>
        </Tooltip>

    )
})

DrawerActionItem.displayName = 'Drawer.ActionItem'

export default DrawerActionItem

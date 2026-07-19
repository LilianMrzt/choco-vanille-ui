import { memo, type FC } from 'react'

import type { DrawerActionItemProps } from '@components/overlay/drawer/components/items/drawer-action-item/types/DrawerActionItem.props.ts'
import {
    DRAWER_ITEM_STYLES,
    DrawerItemContent,
    useDrawerItemAttributes,
} from '@components/overlay/drawer/components/items/_shared'
import { cn } from '@utils/cn.ts'
import { useTransitionRender } from '@hooks/use-transition-render/useTransitionRender.hook.ts'
import { vars } from '@theme/contract.css.ts'

/**
 * A button-like action row rendered inside a `Drawer`.
 *
 * Useful for actions that do not navigate, such as "Sign out" or "Toggle theme".
 */
const DrawerActionItem: FC<DrawerActionItemProps> = memo(({
    label,
    startIcon,
    trailing,
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
    const { shouldRenderContent } = useTransitionRender(open, vars.duration.normal)

    return (
        <button
            ref={ref}
            type={'button'}
            disabled={disabled}
            aria-label={shouldRenderContent ? undefined : label}
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
                trailing={trailing}
                iconSize={iconSize}
                renderContent={shouldRenderContent}
            />
        </button>
    )
})

DrawerActionItem.displayName = 'Drawer.ActionItem'

export default DrawerActionItem

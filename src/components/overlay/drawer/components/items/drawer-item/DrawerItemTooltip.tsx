import { type FC, type ReactElement } from 'react'

import { Tooltip } from '@components/overlay/tooltip'

import { useDrawerItemState } from '@components/overlay/drawer/components/items/drawer-item/useDrawerItemState.hook.ts'
import { DRAWER_MODES } from '@components/overlay/drawer/constants'

type DrawerItemTooltipProps = {
    /** The item element that triggers the tooltip. */
    children: ReactElement
    /** Tooltip content — typically the item label. */
    content: string
}

/**
 * Wraps a drawer item with a tooltip only when the drawer is in mini mode
 * and collapsed. In all other states the child is returned unchanged.
 */
const DrawerItemTooltip: FC<DrawerItemTooltipProps> = ({
    children,
    content,
}) => {
    const { mode, open } = useDrawerItemState()
    const isMiniCollapsed = mode === DRAWER_MODES.mini && !open

    if (!isMiniCollapsed) {
        return children
    }

    return (
        <Tooltip
            content={content}
            side={'right'}
            align={'center'}
        >
            {children}
        </Tooltip>
    )
}

DrawerItemTooltip.displayName = 'DrawerItemTooltip'

export default DrawerItemTooltip

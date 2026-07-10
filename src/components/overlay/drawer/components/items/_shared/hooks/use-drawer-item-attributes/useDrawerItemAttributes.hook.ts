import { useMemo } from 'react'

import type { IconSize } from '@components/foundation/icon'
import { DRAWER_ITEM_SIZE_TO_ICON_SIZE } from '@components/overlay/drawer/components/items/_shared/constants/DrawerItem.constants.ts'
import type { DrawerItemSize } from '@components/overlay/drawer/components/items/_shared/types/DrawerItem.types.ts'
import { useDrawerItemState } from '@components/overlay/drawer/components/items/_shared/hooks/useDrawerItemState.hook.ts'
import type {
    DrawerItemAttributes
} from '@components/overlay/drawer/components/items/_shared/hooks/use-drawer-item-attributes/types'

/**
 * Returns the common state, resolved icon size and data attributes used by
 * every drawer item row.
 */
export const useDrawerItemAttributes = (
    size: DrawerItemSize,
    iconSize?: IconSize,
): DrawerItemAttributes => {
    const { open, mode, position } = useDrawerItemState()
    const resolvedIconSize = iconSize ?? DRAWER_ITEM_SIZE_TO_ICON_SIZE[size]
    const state: 'open' | 'closed' = open ? 'open' : 'closed'

    const itemAttributes = useMemo(
        () => ({
            'data-state': state,
            'data-mode': mode,
            'data-position': position,
        }),
        [state, mode, position],
    )

    return {
        state,
        resolvedIconSize,
        itemAttributes,
    }
}

import { useContext } from 'react'

import {
    DrawerContext,
    type DrawerContextValue,
} from '@components/overlay/drawer/context/Drawer.context.ts'
import { DRAWER_MODES } from '@components/overlay/drawer/constants'

/**
 * Returns the current drawer state for items rendered inside a `Drawer`.
 *
 * Falls back to a sensible default when used outside a drawer so the items
 * remain usable and testable in isolation.
 */
export const useDrawerItemState = (): DrawerContextValue => {
    const context = useContext(DrawerContext)

    return (
        context ?? {
            open: true,
            onOpenChange: () => {},
            mode: DRAWER_MODES.portal,
            position: 'left',
            size: 'md',
        }
    )
}

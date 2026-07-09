import { useContext } from 'react'

import { DrawerContext, type DrawerContextValue } from '@components/overlay/drawer/context/Drawer.context.ts'

/**
 * Returns the current drawer state and helpers.
 * Throws if used outside of a `Drawer`.
 */
export const useDrawerContext = (): DrawerContextValue => {
    const context = useContext(DrawerContext)

    if (!context) {
        throw new Error('useDrawerContext must be used within a <Drawer>.')
    }

    return context
}

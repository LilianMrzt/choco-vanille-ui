import { useContext } from 'react'

import { DrawerContext, type DrawerContextValue } from '@components/overlay/drawer/context/Drawer.context.ts'

/**
 * Returns the current drawer state and helpers.
 * Returns `null` when used outside of a `Drawer` so sub-components can be
 * rendered independently (e.g. inside `DrawerMini`).
 */
export const useDrawerContext = (): DrawerContextValue | null => {
    return useContext(DrawerContext)
}

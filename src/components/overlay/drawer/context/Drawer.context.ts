import { createContext } from 'react'

import type { DrawerMode, DrawerPosition, DrawerSize } from '@components/overlay/drawer/types/Drawer.types.ts'

export type DrawerContextValue = {
    /** Current open state. */
    open: boolean
    /** Toggles the drawer open state. */
    onOpenChange: (open: boolean) => void
    /** Current render mode. */
    mode: DrawerMode
    /** Side the drawer is attached to. */
    position: DrawerPosition
    /** Current width preset. */
    size: DrawerSize
    /** Id of the header title used for the drawer aria-labelledby. */
    titleId?: string
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

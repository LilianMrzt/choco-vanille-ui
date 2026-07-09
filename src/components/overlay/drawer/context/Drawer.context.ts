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
    /** Width when the drawer is collapsed in `mini` mode. */
    collapsedSize: string | number
    /** Whether the portal drawer renders a backdrop. */
    withBackdrop: boolean
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

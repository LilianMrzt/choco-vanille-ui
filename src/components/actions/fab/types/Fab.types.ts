import type { ButtonColorShared, ButtonSizeShared } from '@components/actions/_shared/buttons/types'
import type { FAB_POSITIONS } from '@components/actions/fab/constants'

/** Color variants for the Fab component, mapped to theme colors. */
export type FabColor = ButtonColorShared;

/** Size variants for the Fab component. */
export type FabSize = ButtonSizeShared;

/** Viewport corner (or center) the Fab is pinned to. */
export type FabPosition = (typeof FAB_POSITIONS)[keyof typeof FAB_POSITIONS];

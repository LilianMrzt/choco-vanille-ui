import { DRAWER_MODES, DRAWER_POSITIONS, DRAWER_SIZES } from '@components/overlay/drawer/constants'

/** Render mode for the drawer. */
export type DrawerMode = (typeof DRAWER_MODES)[keyof typeof DRAWER_MODES]

/** Side the drawer attaches to. */
export type DrawerPosition = (typeof DRAWER_POSITIONS)[keyof typeof DRAWER_POSITIONS]

/** Predefined width for the drawer. */
export type DrawerSize = (typeof DRAWER_SIZES)[keyof typeof DRAWER_SIZES]

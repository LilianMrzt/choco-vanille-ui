import { DRAWER_ITEM_SIZES } from '@components/overlay/drawer/components/drawer-item/DrawerItem.constants.ts'

/** Available size presets for drawer item rows. */
export type DrawerItemSize = (typeof DRAWER_ITEM_SIZES)[keyof typeof DRAWER_ITEM_SIZES]

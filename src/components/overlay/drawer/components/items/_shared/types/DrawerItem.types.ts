import {
    DRAWER_ITEM_SIZES,
    DRAWER_ITEM_VARIANTS,
} from '@components/overlay/drawer/components/items/_shared/constants/DrawerItem.constants.ts'

/** Available size presets for drawer item rows. */
export type DrawerItemSize =
  (typeof DRAWER_ITEM_SIZES)[keyof typeof DRAWER_ITEM_SIZES];

/** Available visual variants for drawer item rows. */
export type DrawerItemVariant =
  (typeof DRAWER_ITEM_VARIANTS)[keyof typeof DRAWER_ITEM_VARIANTS];

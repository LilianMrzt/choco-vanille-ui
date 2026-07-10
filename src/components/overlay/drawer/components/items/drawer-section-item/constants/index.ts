import type { BoxRecipeVariants } from '@components/layout/box'
import type { DrawerItemSize } from '@components/overlay/drawer/components/items/_shared'

type PaddingVariant = NonNullable<BoxRecipeVariants['paddingLeft']>

/**
 * Maps a drawer section item size to the left padding of its collapsible
 * content area. Adjust the values as needed.
 */
export const DRAWER_SECTION_ITEM_SEPARATOR_PADDING_LEFT: Record<
    DrawerItemSize,
    PaddingVariant
> = {
    sm: 'md2',
    md: 'lg2',
}
/**
 * Maps a drawer section item size to the right padding of its collapsible
 * content area. Adjust the values as needed.
 */
export const DRAWER_SECTION_ITEM_SEPARATOR_PADDING_RIGHT: Record<
    DrawerItemSize,
    PaddingVariant
> = {
    sm: 'md',
    md: 'sm',
}

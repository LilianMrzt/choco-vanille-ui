/**
 * Size presets for drawer item rows.
 */
export const DRAWER_ITEM_SIZES = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
} as const

/**
 * Visual variants for drawer item rows.
 */
export const DRAWER_ITEM_VARIANTS = {
    default: 'default',
    outlined: 'outlined',
} as const

/**
 * Color intents for drawer item rows.
 */
export const DRAWER_ITEM_COLORS = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    destructive: 'destructive',
    success: 'success',
    warning: 'warning',
    info: 'info',
} as const

/**
 * Array of available color intents for drawer item rows.
 */
export const DRAWER_ITEM_COLORS_ARRAY = Object.values(DRAWER_ITEM_COLORS)

/**
 * Maps a drawer item size to the icon size rendered inside the row.
 */
export const DRAWER_ITEM_SIZE_TO_ICON_SIZE = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
} as const

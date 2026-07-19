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
 * Default icon size rendered inside a drawer item row.
 */
export const DRAWER_ITEM_DEFAULT_ICON_SIZE = 'md' as const

/** Supported semantic intents for avatar fallback surfaces. */
export const AVATAR_COLORS = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    destructive: 'destructive',
    success: 'success',
    warning: 'warning',
    info: 'info',
    purple: 'purple',
    pink: 'pink',
    orange: 'orange',
    teal: 'teal',
    cyan: 'cyan',
    indigo: 'indigo',
} as const

/** Ordered avatar fallback intents. */
export const AVATAR_COLORS_ARRAY = Object.values(AVATAR_COLORS)

/** Supported avatar outlines. */
export const AVATAR_SHAPES = {
    circle: 'circle',
    square: 'square',
} as const

/** Ordered avatar shapes. */
export const AVATAR_SHAPES_ARRAY = Object.values(AVATAR_SHAPES)

/** Avatar presets measuring 24, 32, 40 and 48 CSS pixels at a 16px root. */
export const AVATAR_SIZES = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
} as const

/** Ordered avatar size presets. */
export const AVATAR_SIZES_ARRAY = Object.values(AVATAR_SIZES)

/** Supported presence indicators. */
export const AVATAR_STATUS = {
    online: 'online',
    offline: 'offline',
    busy: 'busy',
    away: 'away',
} as const

/** Ordered presence indicators. */
export const AVATAR_STATUS_ARRAY = Object.values(AVATAR_STATUS)

/** Supported avatar surface and border treatments, matching Badge. */
export const AVATAR_VARIANTS = {
    contained: 'contained',
    subtle: 'subtle',
    outlined: 'outlined',
    outlinedSubtle: 'outlinedSubtle',
} as const

/** Ordered avatar treatments. */
export const AVATAR_VARIANTS_ARRAY = Object.values(AVATAR_VARIANTS)

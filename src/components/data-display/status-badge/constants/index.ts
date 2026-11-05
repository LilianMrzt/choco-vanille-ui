/** Physical corners for the indicator, independent of text direction. */
export const STATUS_BADGE_POSITIONS = {
    topLeft: 'top-left',
    topRight: 'top-right',
    bottomLeft: 'bottom-left',
    bottomRight: 'bottom-right',
} as const

export const STATUS_BADGE_POSITIONS_ARRAY = Object.values(STATUS_BADGE_POSITIONS)

/** Indicator size presets; numbers use larger surfaces than decorative dots. */
export const STATUS_BADGE_SIZES = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
} as const

export const STATUS_BADGE_SIZES_ARRAY = Object.values(STATUS_BADGE_SIZES)

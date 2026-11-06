/** Supported drawer render modes. */
export const DRAWER_MODES = {
    portal: 'portal',
    inline: 'inline',
    mini: 'mini',
} as const

export const DRAWER_MODES_ARRAY = Object.values(DRAWER_MODES)

/** Supported attachment sides. */
export const DRAWER_POSITIONS = {
    left: 'left',
    right: 'right',
} as const

export const DRAWER_POSITIONS_ARRAY = Object.values(DRAWER_POSITIONS)

/** Supported drawer widths. */
export const DRAWER_SIZES = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    '2xl': '2xl',
    full: 'full',
} as const

export const DRAWER_SIZES_ARRAY = Object.values(DRAWER_SIZES)

/** Width of each drawer size in CSS units. */
export const DRAWER_SIZE_WIDTH = {
    sm: '16rem',
    md: '20rem',
    lg: '24rem',
    xl: '28rem',
    '2xl': '32rem',
    full: '100%',
} as const

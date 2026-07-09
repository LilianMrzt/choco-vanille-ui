/**
 * Predefined width sizes for the `Drawer` component.
 * `DRAWER_SIZE_WIDTH` maps each size to a CSS width value.
 */
export const DRAWER_SIZES = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    '2xl': '2xl',
    full: 'full',
} as const

export const DRAWER_SIZES_ARRAY = Object.values(DRAWER_SIZES)

export const DRAWER_SIZE_WIDTH = {
    sm: '16rem',
    md: '20rem',
    lg: '24rem',
    xl: '28rem',
    '2xl': '32rem',
    full: '100%',
} as const

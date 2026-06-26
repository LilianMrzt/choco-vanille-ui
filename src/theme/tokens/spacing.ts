/*
 * Spacing scale — a consistent 4px-based rhythm used for padding, margin and
 * gap throughout the kit. Theme-agnostic (identical in light & dark).
 */
export const space = {
    none: '0',
    px: '1px',
    xxs: '0.125rem', // 2px
    xs: '0.25rem', // 4px
    xs2: '0.375rem', // 6px
    sm: '0.5rem', // 8px
    md: '0.75rem', // 12px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    '2xl': '2rem', // 32px
    '3xl': '3rem', // 48px
    '4xl': '4rem', // 64px
    '5xl': '6rem', // 96px
} as const

export type Space = typeof space

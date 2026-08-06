import { vars } from '@theme/contract.css.ts'

export const RICH_TEXT_FONT_SIZES = {
    '2xs': vars.fontSize['2xs'],
    xs: vars.fontSize.xs,
    sm: vars.fontSize.sm,
    md: vars.fontSize.md,
    lg: vars.fontSize.lg,
    xl: vars.fontSize.xl,
    '2xl': vars.fontSize['2xl'],
    '3xl': vars.fontSize['3xl'],
    '4xl': vars.fontSize['4xl'],
    '5xl': vars.fontSize['5xl'],
    '6xl': vars.fontSize['6xl'],
} as const

export const RICH_TEXT_FONT_SIZE_LABELS = {
    '2xs': '10px',
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
} as const

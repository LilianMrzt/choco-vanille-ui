import type { BadgeSize } from '@components/data-display/badge/types'
import type { IconSize } from '@components/foundation/icon'
import type { TypographySize } from '@components/foundation/typography'
import type { BoxSpace } from '@components/layout/box'

/** Semantic intentions used by Badge and StatusBadge. */
export const BADGE_COLORS = {
    primary: 'primary',
    secondary: 'secondary',
    neutral: 'neutral',
    danger: 'danger',
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

export const BADGE_COLORS_ARRAY = Object.values(BADGE_COLORS)

/** Noninteractive label treatments. */
export const BADGE_VARIANTS = {
    contained: 'contained',
    subtle: 'subtle',
    outlined: 'outlined',
    outlinedSubtle: 'outlinedSubtle',
} as const

export const BADGE_VARIANTS_ARRAY = Object.values(BADGE_VARIANTS)

/** Size names, independent of primitive token keys. */
export const BADGE_SIZES = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
} as const

export const BADGE_SIZES_ARRAY = Object.values(BADGE_SIZES)

/** Text size tokens, in pixels at a 16px root. */
export const BADGE_SIZE_TO_FONT_SIZE: Readonly<Record<BadgeSize, TypographySize>> = {
    sm: 10,
    md: 12,
    lg: 14,
}

/** Decorative icon presets matched to each label size. */
export const BADGE_SIZE_TO_ICON_SIZE: Readonly<Record<BadgeSize, IconSize>> = {
    sm: 'xs',
    md: 'sm',
    lg: 'sm',
}

/** Layout presets; numeric spacing tokens are pixels at a 16px root. */
export const BADGE_SIZE_LAYOUT = {
    sm: { minWidth: '1.25rem', minHeight: '1.25rem', paddingX: 4, paddingY: 2, gap: 2 },
    md: { minWidth: '1.5rem', minHeight: '1.5rem', paddingX: 8, paddingY: 2, gap: 4 },
    lg: { minWidth: '1.75rem', minHeight: '1.75rem', paddingX: 12, paddingY: 4, gap: 4 },
} as const satisfies Readonly<Record<BadgeSize, Readonly<{
    minWidth: string
    minHeight: string
    paddingX: BoxSpace
    paddingY: BoxSpace
    gap: BoxSpace
}>>>

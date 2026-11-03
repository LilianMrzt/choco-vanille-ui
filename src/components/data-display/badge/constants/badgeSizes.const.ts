import type { BadgeProps } from '@components'
import type { IconSize } from '@components/foundation/icon'
import type { TypographySize } from '@components/foundation/typography'

export const BADGE_SIZE_TO_FONT_SIZE: Record<NonNullable<BadgeProps['size']>, TypographySize> = {
    sm: 10,
    md: 12,
    lg: 14,
}

export const BADGE_SIZE_TO_ICON_SIZE: Record<NonNullable<BadgeProps['size']>, IconSize> = {
    sm: 'xs',
    md: 'sm',
    lg: 'sm',
}

import type { ButtonSize, IconSize, TypographySize } from '@components'

export const buttonSizeToIconSize: Record<NonNullable<ButtonSize>, IconSize> = {
    sm: 'sm',
    default: 'md',
    lg: 'lg',
    icon: 'md',
}

export const buttonSizeToFontSize: Record<NonNullable<ButtonSize>, TypographySize> = {
    sm: 'sm',
    default: 'base',
    lg: 'lg',
    icon: 'base',
}

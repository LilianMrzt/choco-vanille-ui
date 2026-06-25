import type { ButtonSize, TypographySize } from '@components'
import { buttonSizeToIconSize } from '@components/actions/_shared/buttonShared.constants.ts'

export { buttonSizeToIconSize }

export const buttonSizeToFontSize: Record<NonNullable<ButtonSize>, TypographySize> = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
}

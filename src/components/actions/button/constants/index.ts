import type { ButtonSize, TypographySize } from '@components'
import { buttonSizeToIconSize } from '@components/actions/_shared/buttons/constants'

export { buttonSizeToIconSize }

export const buttonSizeToFontSize: Record<NonNullable<ButtonSize>, TypographySize> = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
}

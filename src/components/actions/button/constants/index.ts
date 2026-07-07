import type { ButtonSize } from '@components/actions/button/types/Button.types.ts'
import type { TypographySize } from '@components/foundation/typography'
import { buttonSizeToIconSize } from '@components/actions/_shared/buttons/constants'

export { buttonSizeToIconSize }

export const buttonSizeToFontSize: Record<NonNullable<ButtonSize>, TypographySize> = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
}

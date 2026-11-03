import type { ButtonSize } from '@components/actions/button/types/Button.types.ts'
import type { TypographySize } from '@components/foundation/typography'
import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'

export const BUTTON_SIZE_TO_FONT_SIZE: Record<NonNullable<ButtonSize>, TypographySize> = {
    [BUTTON_SIZES.sm]: 14,
    [BUTTON_SIZES.md]: 16,
    [BUTTON_SIZES.lg]: 18,
}

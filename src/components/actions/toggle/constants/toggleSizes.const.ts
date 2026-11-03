import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'
import type { TypographySize } from '@components/foundation/typography'

export const TOGGLE_SIZE_TO_FONT_SIZE: Record<keyof typeof BUTTON_SIZES, TypographySize> = {
    [BUTTON_SIZES.sm]: 14,
    [BUTTON_SIZES.md]: 16,
    [BUTTON_SIZES.lg]: 18,
}

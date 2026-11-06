import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'
import type { ButtonSize } from '@components/actions/button/types'
import type { TypographySize } from '@components/foundation/typography'

export { buttonSizeToIconSize } from '@components/actions/_shared/buttons/constants'

/** Font size associated with each Button size. */
export const BUTTON_SIZE_TO_FONT_SIZE: Record<ButtonSize, TypographySize> = {
    [BUTTON_SIZES.sm]: 14,
    [BUTTON_SIZES.md]: 16,
    [BUTTON_SIZES.lg]: 18,
}

import type { ToggleButtonSize } from '@components/actions/toggle-button/types/ToggleButton.types.ts'
import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'
import type { TypographySize } from '@components/foundation/typography'

export const TOGGLE_BUTTON_SIZE_TO_FONT_SIZE: Record<NonNullable<ToggleButtonSize>, TypographySize> = {
    [BUTTON_SIZES.sm]: 'sm',
    [BUTTON_SIZES.md]: 'md',
    [BUTTON_SIZES.lg]: 'lg',
}

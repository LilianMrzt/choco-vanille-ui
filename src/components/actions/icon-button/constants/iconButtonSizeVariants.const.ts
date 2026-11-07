import { ICON_BUTTON_SIZES } from '@components/actions/icon-button/constants/iconButtonSizes.const.ts'
import { BUTTON_SIZE_TO_HEIGHT } from '@components/actions/_shared/buttons/constants'

/** Square button dimensions: xs 24px, sm 28px, md 36px and lg 44px at a 16px root. */
export const ICON_BUTTON_SIZE_VARIANTS = {
    [ICON_BUTTON_SIZES.xs]: {
        height: '1.5rem',
        width: '1.5rem',
    },
    [ICON_BUTTON_SIZES.sm]: {
        height: BUTTON_SIZE_TO_HEIGHT.sm,
        width: BUTTON_SIZE_TO_HEIGHT.sm,
    },
    [ICON_BUTTON_SIZES.md]: {
        height: BUTTON_SIZE_TO_HEIGHT.md,
        width: BUTTON_SIZE_TO_HEIGHT.md,
    },
    [ICON_BUTTON_SIZES.lg]: {
        height: BUTTON_SIZE_TO_HEIGHT.lg,
        width: BUTTON_SIZE_TO_HEIGHT.lg,
    },
} as const

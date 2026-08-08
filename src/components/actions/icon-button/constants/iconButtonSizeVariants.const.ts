import { ICON_BUTTON_SIZES } from '@components/actions/icon-button/constants/iconButtonSizes.const.ts'

export const ICON_BUTTON_SIZE_VARIANTS = {
    [ICON_BUTTON_SIZES.xs]: {
        height: '1.5rem',
        width: '1.5rem',
    },
    [ICON_BUTTON_SIZES.sm]: {
        height: '2.25rem',
        width: '2.25rem',
    },
    [ICON_BUTTON_SIZES.md]: {
        height: '2.5rem',
        width: '2.5rem',
    },
    [ICON_BUTTON_SIZES.lg]: {
        height: '2.75rem',
        width: '2.75rem',
    },
} as const

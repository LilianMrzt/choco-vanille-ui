import type { ButtonSizeShared } from '@components/actions/_shared/buttons/types'
import type { IconSize } from '@components/foundation/icon'
import type { TypographySize } from '@components/foundation/typography'

export { BUTTON_COLORS, BUTTON_COLORS_ARRAY } from '@components/actions/_shared/buttons/constants/buttonColors.const.ts'
export { BUTTON_SIZES, BUTTON_SIZES_ARRAY } from '@components/actions/_shared/buttons/constants/buttonSizes.const.ts'
export { BUTTON_VARIANTS, BUTTON_VARIANTS_ARRAY } from '@components/actions/_shared/buttons/constants/buttonVariants.const.ts'

/** Rem heights shared by Button, IconButton and Toggle: 28, 36 and 44px at a 16px root. */
export const BUTTON_SIZE_TO_HEIGHT: Readonly<Record<ButtonSizeShared, string>> = {
    sm: '1.75rem',
    md: '2.25rem',
    lg: '2.75rem',
}

/** Label font tokens shared by Button and Toggle. */
export const BUTTON_SIZE_TO_FONT_SIZE: Readonly<Record<ButtonSizeShared, TypographySize>> = {
    sm: 14,
    md: 14,
    lg: 16,
}

/** SVG sizes shared by Button, IconButton and Toggle: 14, 16 and 20px at a 16px root. */
export const buttonSizeToIconSize: Record<NonNullable<ButtonSizeShared>, IconSize> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
}

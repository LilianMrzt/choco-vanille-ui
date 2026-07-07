import type { ButtonSizeShared } from '@components/actions/_shared/buttons/types'
import type { IconSize } from '@components/foundation/icon'

export { BUTTON_COLORS, BUTTON_COLORS_ARRAY } from '@components/actions/_shared/buttons/constants/buttonColors.const.ts'
export { BUTTON_SIZES, BUTTON_SIZES_ARRAY } from '@components/actions/_shared/buttons/constants/buttonSizes.const.ts'
export { BUTTON_VARIANTS, BUTTON_VARIANTS_ARRAY } from '@components/actions/_shared/buttons/constants/buttonVariants.const.ts'

/** Size-to-icon-size mapping shared by Button and IconButton. */
export const buttonSizeToIconSize: Record<NonNullable<ButtonSizeShared>, IconSize> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
}

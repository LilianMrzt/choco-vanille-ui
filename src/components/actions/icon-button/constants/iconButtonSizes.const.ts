import type { IconButtonSize } from '@components/actions/icon-button/types/IconButton.types.ts'
import type { IconSize } from '@components/foundation/icon'
import { BUTTON_SIZES, buttonSizeToIconSize } from '@components/actions/_shared/buttons/constants'

export const ICON_BUTTON_SIZES = {
    xs: 'xs',
    sm: BUTTON_SIZES.sm,
    md: BUTTON_SIZES.md,
    lg: BUTTON_SIZES.lg,
} as const

export const ICON_BUTTON_SIZES_ARRAY = Object.values(ICON_BUTTON_SIZES)

/** Proportional SVG sizes: xs 12px, sm 14px, md 16px and lg 20px at a 16px root. */
export const ICON_BUTTON_SIZE_TO_ICON_SIZE: Record<NonNullable<IconButtonSize>, IconSize> = {
    xs: 12,
    ...buttonSizeToIconSize,
}

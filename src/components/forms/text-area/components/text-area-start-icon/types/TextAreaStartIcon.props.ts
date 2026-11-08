import type { TextAreaSize } from '@components'
import type { IconSize } from '@components/foundation/icon'

/** Maps field size to the Icon size rendered in the start slot. */
export const fieldSizeToIconSize: Record<NonNullable<TextAreaSize>, IconSize> = {
    sm: 16,
    md: 16,
    lg: 16,
}

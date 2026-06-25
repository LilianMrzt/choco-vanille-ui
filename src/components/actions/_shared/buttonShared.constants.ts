import type { ButtonSizeShared } from '@components/actions/_shared/buttonShared.types.ts'
import type { IconSize } from '@components/foundation/icon'

/** Size-to-icon-size mapping shared by Button and IconButton. */
export const buttonSizeToIconSize: Record<NonNullable<ButtonSizeShared>, IconSize> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
}

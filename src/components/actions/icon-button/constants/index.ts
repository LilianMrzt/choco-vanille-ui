import type { IconButtonSize } from '@components/actions/icon-button/types/IconButton.types.ts'
import type { IconSize } from '@components/foundation/icon'

/** Size-to-icon-size mapping for IconButton. Extends the shared Button mapping with `xs`. */
export const iconButtonSizeToIconSize: Record<NonNullable<IconButtonSize>, IconSize> = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
}

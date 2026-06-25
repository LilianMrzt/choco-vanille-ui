import type { IconButtonSize } from '@components/actions/icon-button/types/IconButton.types.ts'
import type { IconSize } from '@components/foundation/icon'

export const iconButtonSizeToIconSize: Record<NonNullable<IconButtonSize>, IconSize> = {
    sm: 'sm',
    default: 'md',
    lg: 'lg',
}

import type { ToggleIconButtonSize } from '@components/actions/toggle-icon-button/types/ToggleIconButton.types.ts'
import type { IconSize } from '@components/foundation/icon'
import { ICON_BUTTON_SIZES } from '@components/actions/icon-button/constants'

export const TOGGLE_ICON_BUTTON_SIZE_TO_ICON_SIZE: Record<
  NonNullable<ToggleIconButtonSize>,
  IconSize
> = {
    [ICON_BUTTON_SIZES.xs]: 'xs',
    [ICON_BUTTON_SIZES.sm]: 'sm',
    [ICON_BUTTON_SIZES.md]: 'md',
    [ICON_BUTTON_SIZES.lg]: 'lg',
}

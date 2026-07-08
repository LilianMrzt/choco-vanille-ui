import type { ButtonColorShared, ButtonSizeShared } from '@components/actions/_shared/buttons/types'
import type { Radius } from '@theme/tokens/radii.ts'

/** Color variants for the ToggleButton component, mapped to theme colors. */
export type ToggleButtonColor = ButtonColorShared

/** Size variants for the ToggleButton component. */
export type ToggleButtonSize = ButtonSizeShared

/** Border radius variants for the ToggleButton component. */
export type ToggleButtonRadius = keyof Radius

/** Visual style variants for the ToggleButton component. */
export type ToggleButtonVariant = 'ghost' | 'outlined'

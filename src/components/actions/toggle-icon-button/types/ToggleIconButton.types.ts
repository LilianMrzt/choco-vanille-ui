import type { ButtonColorShared } from '@components/actions/_shared/buttons/types'
import type { IconButtonSize } from '@components/actions/icon-button'
import type { Radius } from '@theme/tokens/radii.ts'

/** Color variants for the ToggleIconButton component, mapped to theme colors. */
export type ToggleIconButtonColor = ButtonColorShared;

/** Size variants for the ToggleIconButton component. */
export type ToggleIconButtonSize = IconButtonSize;

/** Border radius variants for the ToggleIconButton component. */
export type ToggleIconButtonRadius = keyof Radius;

/** Visual style variants for the ToggleIconButton component. */
export type ToggleIconButtonVariant = 'ghost' | 'outlined';

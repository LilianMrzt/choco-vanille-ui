import type { ButtonVariantShared, ButtonColorShared } from '@components/actions/_shared/buttons/types'
import type { ICON_BUTTON_SIZES } from '@components/actions/icon-button/constants'

/** Visual style variants for the IconButton component. */
export type IconButtonVariant = ButtonVariantShared;

/** Color variants for the IconButton component, mapped to theme colors. */
export type IconButtonColor = ButtonColorShared;

/** Size variants for the IconButton component. Adds `xs` on top of the sizes shared with Button. */
export type IconButtonSize = (typeof ICON_BUTTON_SIZES)[keyof typeof ICON_BUTTON_SIZES];

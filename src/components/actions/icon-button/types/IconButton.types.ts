import type { ButtonVariantShared, ButtonColorShared, ButtonSizeShared } from '@components/actions/_shared/buttons/types'

/** Visual style variants for the IconButton component. */
export type IconButtonVariant = ButtonVariantShared;

/** Color variants for the IconButton component, mapped to theme colors. */
export type IconButtonColor = ButtonColorShared;

/** Size variants for the IconButton component. Adds `xs` on top of the sizes shared with Button. */
export type IconButtonSize = 'xs' | ButtonSizeShared;

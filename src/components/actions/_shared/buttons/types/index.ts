import type { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '@components/actions/_shared/buttons/constants'

/** Visual style variants shared by Button and IconButton. */
export type ButtonVariantShared = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS]

/** Color variants shared by Button and IconButton, mapped to theme colors. */
export type ButtonColorShared = (typeof BUTTON_COLORS)[keyof typeof BUTTON_COLORS]

/** Size variants shared by Button and IconButton. */
export type ButtonSizeShared = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES]

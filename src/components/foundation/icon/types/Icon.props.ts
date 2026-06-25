import type { IconProps as IconifyProps } from '@iconify/react'

import type { IconRecipeVariants } from '@components/foundation/icon/Icon.css.ts'
import type { ThemeColor } from '@theme'

export type IconProps = Omit<IconifyProps, 'aria-hidden' | 'role'> &
  IconRecipeVariants & {
    /** Optional theme color token applied to the icon's `color` CSS property. */
    color?: ThemeColor
  }

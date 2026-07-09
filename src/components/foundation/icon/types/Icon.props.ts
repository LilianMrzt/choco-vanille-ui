import type { IconProps as IconifyProps } from '@iconify/react'
import type { CSSProperties } from 'react'

import type { IconRecipeVariants } from '@components/foundation/icon/styles/Icon.css.ts'
import type { ThemeColor } from '@theme'

export type IconProps = Omit<IconifyProps, 'aria-hidden' | 'role'> &
  IconRecipeVariants & {
    /** Optional theme color token applied to the icon's `color` CSS property. */
    color?: ThemeColor
    /** The CSS `border-width` value of the icon. */
    borderWidth?: CSSProperties['borderWidth']
    /** The CSS `border-style` value of the icon. */
    borderStyle?: CSSProperties['borderStyle']
  }

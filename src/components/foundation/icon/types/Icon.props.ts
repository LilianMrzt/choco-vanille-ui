import type { IconProps as IconifyProps } from '@iconify/react'
import type { CSSProperties } from 'react'

import type { IconRecipeVariants } from '@components/foundation/icon/styles/Icon.css.ts'
import type { BoxRecipeVariants } from '@components/layout/box'
import type { ThemeColor } from '@theme'

export type IconProps = Omit<IconifyProps, 'aria-hidden' | 'role'> &
  IconRecipeVariants & {
    /** Optional theme color token applied to the icon's `color` CSS property. */
    color?: ThemeColor
    /** Padding token applied to the wrapper around the icon. */
    padding?: BoxRecipeVariants['padding']
    /** Theme color token applied to the wrapper's border color. */
    borderColor?: BoxRecipeVariants['borderColor']
    /** Theme color token applied to the wrapper's background color. */
    backgroundColor?: BoxRecipeVariants['backgroundColor']
    /** The CSS `border-width` value of the wrapper. */
    borderWidth?: CSSProperties['borderWidth']
    /** The CSS `border-style` value of the wrapper. */
    borderStyle?: CSSProperties['borderStyle']
    /** Border radius token applied to the wrapper. */
    borderRadius?: BoxRecipeVariants['borderRadius']
  }

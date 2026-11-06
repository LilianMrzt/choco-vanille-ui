import type { ThemeColor, ThemeColorValue } from '@theme/tokens/colors/types/index.ts'
import type { SEPARATOR_ORIENTATIONS } from '@components/layout/separator/constants'
import type { BoxProps } from '@components/layout/box/types'

/** Orientation values for the Separator component. */
export type SeparatorOrientation =
    (typeof SEPARATOR_ORIENTATIONS)[keyof typeof SEPARATOR_ORIENTATIONS]

/** Theme colors supported by the Separator component. */
export type SeparatorColor = ThemeColorValue

/** Theme color token applied to the separator label. */
export type SeparatorTextColor = ThemeColor

export type SeparatorProps = Readonly<Omit<BoxProps, 'children' | 'aria-orientation'> & {
      /** The orientation of the separator. Defaults to `horizontal`. */
      orientation?: SeparatorOrientation
      /** The theme color token applied to the separator's background color. */
      color?: SeparatorColor
      /** The theme color leaf path applied to the separator label. Defaults to `text.tertiary`. */
      textColor?: SeparatorTextColor
      /** Optional text displayed between the separator lines. */
      label?: string
    }>

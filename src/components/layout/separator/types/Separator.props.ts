import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type {
    SeparatorColor,
    SeparatorOrientation,
    SeparatorTextColor,
} from '@components/layout/separator/types/Separator.types.ts'

export type SeparatorProps = Omit<BoxProps, 'children' | 'aria-orientation'> & {
  /** The orientation of the separator. Defaults to `horizontal`. */
  orientation?: SeparatorOrientation
  /** The theme color token applied to the separator's background color. */
  color?: SeparatorColor
  /** The theme color token applied to the separator label. Defaults to `textTertiary`. */
  textColor?: SeparatorTextColor
  /** Optional text displayed between the separator lines. */
  label?: string
}

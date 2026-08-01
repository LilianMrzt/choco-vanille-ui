import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type {
    SeparatorColor,
    SeparatorOrientation,
} from '@components/layout/separator/types/Separator.types.ts'

export type SeparatorProps = Omit<BoxProps, 'children' | 'aria-orientation'> & {
  /** The orientation of the separator. Defaults to `horizontal`. */
  orientation?: SeparatorOrientation
  /** The theme color token applied to the separator's background color. */
  color?: SeparatorColor
}

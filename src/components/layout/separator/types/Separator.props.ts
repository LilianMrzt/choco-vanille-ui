import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type { SeparatorRecipeVariants } from '@components/layout/separator/styles/Separator.css.ts'

export type SeparatorProps = Omit<BoxProps, 'children'> & {
  /** The orientation of the separator. Defaults to `horizontal`. */
  orientation?: SeparatorRecipeVariants['orientation'];
  /** The theme color token applied to the separator's background color. */
  color?: SeparatorRecipeVariants['color'];
};

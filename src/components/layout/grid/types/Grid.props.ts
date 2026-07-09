import type { GridRecipeVariants } from '@components/layout/grid/styles/Grid.css.ts'
import type { BoxProps } from '@components/layout/box/types/Box.props.ts'

export type GridProps = Omit<
  BoxProps,
  | 'display'
  | 'alignItems'
  | 'alignContent'
  | 'justifyContent'
> & {
  /** The number of equal-width columns in the grid. */
  columns?: GridRecipeVariants['columns'];
  /** The track size for implicitly created grid rows. */
  gridAutoRows?: GridRecipeVariants['gridAutoRows'];
  /** The explicit row track sizing for the grid. */
  gridTemplateRows?: GridRecipeVariants['gridTemplateRows'];
  /** The auto-placement algorithm for grid items. */
  gridAutoFlow?: GridRecipeVariants['gridAutoFlow'];
  /** The default alignment of grid items along the block axis. */
  alignItems?: GridRecipeVariants['alignItems'];
  /** The default alignment of grid items along the inline axis. */
  justifyItems?: GridRecipeVariants['justifyItems'];
  /** The alignment of the grid tracks along the block axis. */
  alignContent?: GridRecipeVariants['alignContent'];
  /** The alignment of the grid tracks along the inline axis. */
  justifyContent?: GridRecipeVariants['justifyContent'];
};

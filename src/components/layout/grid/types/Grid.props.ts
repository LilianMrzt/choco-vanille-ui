import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type {
    GridAlign,
    GridAlignContent,
    GridAutoRows,
    GridColumns,
    GridFlow,
    GridJustifyContent,
    GridJustifyItems,
    GridTemplateRows,
} from '@components/layout/grid/types/Grid.types.ts'

export type GridProps = Omit<
  BoxProps,
  'display' | 'alignItems' | 'alignContent' | 'justifyContent'
> & {
  /** The number of equal-width columns in the grid. */
  columns?: GridColumns;
  /** The track size for implicitly created grid rows. */
  gridAutoRows?: GridAutoRows;
  /** The explicit row track sizing for the grid. */
  gridTemplateRows?: GridTemplateRows;
  /** The auto-placement algorithm for grid items. */
  gridAutoFlow?: GridFlow;
  /** The default alignment of grid items along the block axis. */
  alignItems?: GridAlign;
  /** The default alignment of grid items along the inline axis. */
  justifyItems?: GridJustifyItems;
  /** The alignment of the grid tracks along the block axis. */
  alignContent?: GridAlignContent;
  /** The alignment of the grid tracks along the inline axis. */
  justifyContent?: GridJustifyContent;
};
